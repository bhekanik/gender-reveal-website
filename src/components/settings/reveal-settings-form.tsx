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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  welcomeHeroText: z.string().min(1, "Welcome text is required"),
  revealText: z.string().min(1, "Reveal text is required"),
  features: z.object({
    showCountdown: z.boolean(),
    showGenderPoll: z.boolean(),
    showGenderQuiz: z.boolean(),
  }),
});

interface RevealSettingsFormProps {
  settings: Doc<"settings">;
}

export function RevealSettingsForm({ settings }: RevealSettingsFormProps) {
  const updateSettings = useMutation(api.settings.update);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      welcomeHeroText: settings.welcomeHeroText,
      revealText: settings.revealText,
      features: settings.features,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateSettings({
        siteId: settings.siteId,
        announcementDate: settings.announcementDate,
        welcomeHeroText: values.welcomeHeroText,
        revealText: values.revealText,
        features: values.features,
      });
      toast.success("Reveal settings updated successfully");
    } catch (error) {
      toast.error("Failed to update reveal settings");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="welcomeHeroText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Welcome Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Welcome to our gender reveal..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The message visitors will see when they first visit your site
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="revealText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reveal Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="The moment we've all been waiting for..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The message that will be shown during the reveal
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Features</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="features.showCountdown"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Countdown Timer</FormLabel>
                    <FormDescription>
                      Show a countdown to the reveal moment
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="features.showGenderPoll"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Gender Poll</FormLabel>
                    <FormDescription>
                      Let visitors vote on their prediction
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="features.showGenderQuiz"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Gender Quiz</FormLabel>
                    <FormDescription>
                      Include a fun quiz about your pregnancy journey
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
