import { api } from "@/convex/_generated/api";
import AccountDeletedEmail from "@/emails/account-deleted";
import AdminNotificationEmail from "@/emails/admin-notification";
import WelcomeEmail from "@/emails/welcome";
import { config } from "@/lib/config";
import { sendDiscordDM } from "@/lib/discord";
import { formatErrorEntity } from "@/lib/formatEntity";
import { logger } from "@/lib/logger";
import { resend } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import * as Sentry from "@sentry/nextjs";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  const context = {};

  logger.info({ ...context, event: data }, "Webhook received");

  if (data.type === "user.created") {
    logger.info({}, "Creating Stripe customer");
    const customer = await stripe.customers.create({
      email: data.data.email_addresses[0].email_address,
    });

    logger.info({ ...context, customer }, "Stripe customer created");

    try {
      logger.info(
        {
          email: data.data.email_addresses[0].email_address,
          username:
            data.data.username ?? data.data.email_addresses[0].email_address,
          firstname: data.data.first_name ?? "",
          lastname: data.data.last_name ?? "",
          clerkUserId: data.data.id ?? "",
          stripeCustomerId: customer.id ?? "",
          role: "user",
        },
        "Creating new user"
      );

      const user = await fetchMutation(api.users.createUser, {
        email: data.data.email_addresses[0].email_address,
        username:
          data.data.username ?? data.data.email_addresses[0].email_address,
        firstname: data.data.first_name ?? "",
        lastname: data.data.last_name ?? "",
        clerkUserId: data.data.id ?? "",
        stripeCustomerId: customer.id ?? "",
        role: "user",
      });

      logger.info({ ...context, user }, "User created");

      logger.info({}, "Sending welcome email");
      const emailResponse = await resend.emails.send({
        from: `${config.projectName} Team <welcome@${config.domain}>`,
        to: user.email,
        subject: `Welcome to ${config.projectName}`,
        react: WelcomeEmail({ firstName: data.data.first_name }),
      });
      logger.info({ ...context, emailResponse }, "Welcome email sent");

      // Send admin notification
      await resend.emails.send({
        from: `${config.projectName} Notifications <notifications@${config.domain}>`,
        to: config.supportEmail,
        subject: `New User Signup - ${user.email}`,
        react: AdminNotificationEmail({
          eventType: "signup",
          userData: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      // Send Discord notification
      await sendDiscordDM(
        `🎉 New user signup!\n\nEmail: ${user.email}\nName: ${user.firstName} ${user.lastName}\nTimestamp: ${new Date().toISOString()}`
      );

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setExtra("context", "POST /api/webhooks/auth");
        scope.setExtra("error", error);
        Sentry.captureException(error);
      });
      logger.error(
        {
          message: error instanceof Error ? error.message : "Unknown error",
          error,
        },
        "Failed to create new user"
      );
      return NextResponse.json(formatErrorEntity("Internal server error"), {
        status: 500,
      });
    }
  }

  if (data.type === "user.updated") {
    try {
      const user = await fetchQuery(api.users.getUserByClerkId, {
        clerkUserId: data.data.id,
      });

      if (!user?.id) {
        throw new Error("User not found");
      }

      await fetchMutation(api.users.updateUser, {
        userId: user.id,
        firstname: data.data.first_name,
        lastname: data.data.last_name,
      });

      logger.info({ ...context, data: data.data }, "User updated");

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setExtra("context", "POST /api/webhooks/auth");
        scope.setExtra("error", error);
        Sentry.captureException(error);
      });
      logger.error(
        {
          message: error instanceof Error ? error.message : "Unknown error",
          error,
        },
        "Failed to update user"
      );
      return NextResponse.json(formatErrorEntity("Internal server error"), {
        status: 500,
      });
    }
  }

  if (data.type === "user.deleted") {
    try {
      const user = await fetchQuery(api.users.getUserByClerkId, {
        clerkUserId: data.data.id,
      });

      if (!user?.id) {
        logger.error(
          { ...context, clerkUserId: data.data.id },
          "User not found in database but was deleted in Clerk"
        );
        throw new Error("User not found");
      }

      await fetchMutation(api.users.deleteUser, {
        userId: user.id,
        hardDelete: true,
      });

      logger.info({}, "Sending account deleted email");
      if (user.email) {
        const emailResponse = await resend.emails.send({
          from: `${config.projectName} Team <support@${config.domain}>`,
          to: user.email,
          replyTo: "cvoptimiser@bhekani.com",
          subject: `${config.projectName} | Account deleted`,
          react: AccountDeletedEmail({ firstName: user.firstName }),
        });

        logger.info(
          { ...context, emailResponse },
          "Account deleted email sent"
        );
      }

      // Send admin notification
      await resend.emails.send({
        from: `${config.projectName} Notifications <notifications@${config.domain}>`,
        to: config.supportEmail,
        subject: `User Account Deleted - ${user.email}`,
        react: AdminNotificationEmail({
          eventType: "deletion",
          userData: {
            email: user.email || "Unknown",
            firstName: user.firstName,
            lastName: user.lastName,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      // Send Discord notification
      await sendDiscordDM(
        `👋 User account deleted\n\nEmail: ${user.email}\nName: ${user.firstName} ${user.lastName}\nTimestamp: ${new Date().toISOString()}`
      );

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setExtra("context", "POST /api/webhooks/auth");
        scope.setExtra("error", error);
        Sentry.captureException(error);
      });
      logger.error(
        {
          message: error instanceof Error ? error.message : "Unknown error",
          error,
        },
        "Failed to delete user and related data"
      );
      return NextResponse.json(formatErrorEntity("Internal server error"), {
        status: 500,
      });
    }
  }

  return NextResponse.json(
    {
      webhookType: data.type,
      message: "Unhandled webhook type",
    },
    { status: 200 }
  );
}
