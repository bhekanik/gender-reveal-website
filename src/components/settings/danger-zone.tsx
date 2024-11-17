"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DangerZoneProps {
  settingsId: Id<"settings">;
}

export function DangerZone({ settingsId }: DangerZoneProps) {
  const deleteAccount = useMutation(api.settings.deleteAccount);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const handleDelete = async () => {
    if (confirmation === "DELETE") {
      await deleteAccount({ settingsId });
      window.location.href = "/";
    }
  };

  return (
    <div className="space-y-4 pt-8 mt-8 border-t border-red-200">
      <div className="flex items-center gap-2 text-red-600">
        <AlertTriangle className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Danger Zone</h2>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all associated data.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="confirmation">
              Type <span className="font-mono font-bold">DELETE</span> to
              confirm
            </Label>
            <Input
              id="confirmation"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="font-mono"
            />
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={confirmation !== "DELETE"}
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
