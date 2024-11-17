"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { BabyList } from "./baby-list";
import { DangerZone } from "./danger-zone";

interface SettingsFormProps {
  settings: Doc<"settings">;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const updateSettings = useMutation(api.settings.update);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    accountName: settings.accountName,
    announcementDate: new Date(settings.announcementDate)
      .toISOString()
      .slice(0, 16),
    welcomeHeroText: settings.welcomeHeroText,
    revealText: settings.revealText,
    features: settings.features,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateSettings({
        ...formData,
        announcementDate: new Date(formData.announcementDate).getTime(),
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to update settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Account Name */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <div className="space-y-2">
          <Label htmlFor="accountName">Account Name</Label>
          <Input
            id="accountName"
            value={formData.accountName}
            onChange={(e) =>
              setFormData({ ...formData, accountName: e.target.value })
            }
            pattern="[a-z0-9-]+"
            title="Only lowercase letters, numbers, and hyphens are allowed"
            required
          />
          <p className="text-sm text-neutral-500">
            This will be used in your site&apos;s URL: https://example.com/
            {formData.accountName}
          </p>
        </div>
      </div>

      {/* Announcement Date */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Announcement Settings</h2>
        <div className="space-y-2">
          <Label htmlFor="announcementDate">Reveal Date & Time</Label>
          <Input
            id="announcementDate"
            type="datetime-local"
            value={formData.announcementDate}
            onChange={(e) =>
              setFormData({ ...formData, announcementDate: e.target.value })
            }
            required
          />
        </div>
      </div>

      {/* Babies */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Baby Settings</h2>
        <BabyList settingsId={settings._id} />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Feature Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="showCountdown">Show Countdown Timer</Label>
            <Switch
              id="showCountdown"
              checked={formData.features.showCountdown}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  features: { ...formData.features, showCountdown: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showGenderPoll">Show Gender Poll</Label>
            <Switch
              id="showGenderPoll"
              checked={formData.features.showGenderPoll}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  features: { ...formData.features, showGenderPoll: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showGenderQuiz">Show Gender Quiz</Label>
            <Switch
              id="showGenderQuiz"
              checked={formData.features.showGenderQuiz}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  features: { ...formData.features, showGenderQuiz: checked },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* CMS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Content Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="welcomeHeroText">Welcome Message</Label>
            <Textarea
              id="welcomeHeroText"
              value={formData.welcomeHeroText}
              onChange={(e) =>
                setFormData({ ...formData, welcomeHeroText: e.target.value })
              }
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="revealText">Reveal Message</Label>
            <Textarea
              id="revealText"
              value={formData.revealText}
              onChange={(e) =>
                setFormData({ ...formData, revealText: e.target.value })
              }
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Danger Zone */}
      <DangerZone settingsId={settings._id} />
    </form>
  );
}
