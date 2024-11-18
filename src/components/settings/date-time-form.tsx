"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  announcementDate: z.string(),
  announcementTime: z.string(),
});

interface DateTimeFormProps {
  settings: Doc<"settings">;
}

export function DateTimeForm({ settings }: DateTimeFormProps) {
  const updateSettings = useMutation(api.settings.update);

  // Convert timestamp to date and time strings for form
  const date = new Date(settings.announcementDate);
  const defaultDate = date.toISOString().split("T")[0];
  const defaultTime = date.toTimeString().split(" ")[0].slice(0, 5);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      announcementDate: defaultDate,
      announcementTime: defaultTime,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const dateTime = new Date(
        `${values.announcementDate}T${values.announcementTime}`
      );

      await updateSettings({
        siteId: settings.siteId,
        accountName: settings.accountName,
        announcementDate: dateTime.getTime(),
        welcomeHeroText: settings.welcomeHeroText,
        revealText: settings.revealText,
        features: settings.features,
      });

      toast.success("Date and time updated successfully");
    } catch (error) {
      toast.error("Failed to update date and time");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="announcementDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Announcement Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                The date when you want to reveal your baby&apos;s gender
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="announcementTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Announcement Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormDescription>
                The time of day for the reveal (in your local timezone)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
