import { api } from "@/convex/_generated/api";
import PurchaseNotificationEmail from "@/emails/purchase-notification";
import { config } from "@/lib/config";
import { formatEmptyEntity, formatErrorEntity } from "@/lib/formatEntity";
import { logger } from "@/lib/logger";
import { resend } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import * as Sentry from "@sentry/nextjs";
import { fetchMutation } from "convex/nextjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const context = {};

  try {
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        formatErrorEntity({
          error: "No signature provided",
        }),
        {
          status: 400,
        }
      );
    }

    const body = await request.text();

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string
    );

    logger.info({ ...context, eventType: event.type }, "Webhook received");

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.created"
    ) {
      await fetchMutation(api.users.updateUserMinutes, {
        stripeCustomerId: event.data.object.customer as string,
        operation: "set",
      });
    } else if (event.type === "customer.subscription.deleted") {
      // Handle subscription deletion if needed
    } else if (event.type === "checkout.session.completed") {
      const checkoutSessionId = event.data.object
        .id as Stripe.Checkout.Session["id"];

      const session = await stripe.checkout.sessions.retrieve(
        checkoutSessionId,
        {
          expand: ["line_items"],
        }
      );

      const customerId = session.customer as string;
      const customerName = session.customer_details?.name;

      if (!customerId) {
        throw new Error("No customer ID found in session");
      }

      const minutes = session.metadata?.minutes
        ? parseInt(session.metadata.minutes)
        : 0;

      const amountPaid = session.amount_total ? session.amount_total / 100 : 0; // Convert from cents to dollars

      const user = await fetchMutation(api.users.updateUserMinutes, {
        stripeCustomerId: customerId,
        operation: "add",
      });

      logger.info({ ...context, minutes, user }, "Minutes added");

      try {
        await resend.emails.send({
          from: `${config.projectName} Team <notifications@${config.domain}>`,
          to: config.supportEmail,
          subject: `New Purchase - ${customerName} bought ${minutes} minutes`,
          react: PurchaseNotificationEmail({
            customerName: customerName ?? "Customer",
            minutesPurchased: minutes,
            amountPaid,
            currency: session.currency?.toUpperCase() ?? "USD",
            purchaseDate: new Date().toLocaleString(),
          }),
        });
        logger.info("Purchase notification email sent successfully");
      } catch (emailError) {
        logger.error(
          { error: emailError },
          "Failed to send purchase notification email"
        );
        // Don't fail the webhook if email sending fails
      }

      return NextResponse.json(formatEmptyEntity());
    }

    return NextResponse.json(formatEmptyEntity());
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setExtra("context", "POST /api/webhooks/stripe");
      scope.setExtra("error", error);
      Sentry.captureException(error);
    });
    logger.error(
      {
        message: error instanceof Error ? error.message : "Unknown error",
        error,
      },
      "Error on webhook received"
    );
    return NextResponse.json(formatErrorEntity("Internal server error"), {
      status: 500,
    });
  }
}
