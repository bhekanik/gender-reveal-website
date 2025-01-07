"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({
  accountName: z.string().min(3).max(50),
  siteName: z.string().min(3).max(50),
  subdomain: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Subdomain can only contain lowercase letters, numbers, and hyphens",
    }),
});

interface SettingsFormProps {
  settings: Doc<"settings">;
  site: Doc<"sites">;
}

export function SettingsForm({ settings, site }: SettingsFormProps) {
  const updateSettings = useMutation(api.settings.update);
  const updateSite = useMutation(api.sites.updateSite);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: settings.accountName,
      siteName: site.siteName,
      subdomain: site.subdomain,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateSettings({
        siteId: settings.siteId,
        accountName: values.accountName,
        announcementDate: settings.announcementDate,
        welcomeHeroText: settings.welcomeHeroText,
        revealText: settings.revealText,
        features: settings.features,
      });
      await updateSite({
        siteId: settings.siteId,
        siteName: values.siteName,
        subdomain: values.subdomain,
      });
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed in your dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subdomain</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Input {...field} />
                  <span className="text-muted-foreground">
                    .pinkandblue.live
                  </span>
                </div>
              </FormControl>
              <FormDescription>
                This is your site&apos;s custom subdomain. It can only contain
                lowercase letters, numbers, and hyphens.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This will be used in your site&apos;s URL: pinkandblue.live/
                {field.value}
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
