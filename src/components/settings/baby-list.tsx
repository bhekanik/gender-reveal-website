"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface BabyListProps {
  settingsId: Id<"settings">;
}

export function BabyList() {
  const params = useParams();
  const siteId = params.siteId as Id<"sites">;
  const babies = useQuery(api.settings.getBabies, { siteId }) ?? [];
  console.log("babies:", babies);
  const setBabies = useMutation(api.settings.setBabies);
  const [isAdding, setIsAdding] = useState(false);
  const [newBabyGender, setNewBabyGender] = useState<"boy" | "girl">("boy");

  const handleAddBaby = async () => {
    await setBabies({
      siteId,
      babies: [...babies, { name: "", gender: newBabyGender }],
    });
    setIsAdding(false);
    setNewBabyGender("boy");
  };

  const handleRemoveBaby = async (index: number) => {
    const newBabies = babies.filter((_, i) => i !== index);
    await setBabies({ siteId, babies: newBabies });
  };

  const handleUpdateGender = async (index: number, gender: "boy" | "girl") => {
    const newBabies = babies.map((baby, i) =>
      i === index ? { ...baby, gender } : baby
    );
    await setBabies({ siteId, babies: newBabies });
  };

  return (
    <div className="space-y-4">
      {babies.map((baby, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 rounded-lg border border-neutral-200"
        >
          <RadioGroup
            value={baby.gender}
            onValueChange={(value: "boy" | "girl") =>
              handleUpdateGender(index, value)
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boy" id={`boy-${index}`} />
              <Label htmlFor={`boy-${index}`}>Boy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="girl" id={`girl-${index}`} />
              <Label htmlFor={`girl-${index}`}>Girl</Label>
            </div>
          </RadioGroup>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveBaby(index)}
            className="ml-auto"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {isAdding ? (
        <div className="flex items-center gap-4 p-4 rounded-lg border border-neutral-200">
          <RadioGroup
            value={newBabyGender}
            onValueChange={(value: "boy" | "girl") => setNewBabyGender(value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boy" id="new-boy" />
              <Label htmlFor="new-boy">Boy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="girl" id="new-girl" />
              <Label htmlFor="new-girl">Girl</Label>
            </div>
          </RadioGroup>
          <div className="flex gap-2 ml-auto">
            <Button variant="ghost" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBaby}>Save</Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="w-full"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Baby
        </Button>
      )}
    </div>
  );
}
