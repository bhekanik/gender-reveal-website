"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const babySchema = z.object({
  babies: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      gender: z.enum(["boy", "girl"], {
        required_error: "Please select a gender",
      }),
    })
  ),
});

type FormData = z.infer<typeof babySchema>;

interface BabyDetailsFormProps {
  siteId: Id<"sites">;
}

export function BabyDetailsForm({ siteId }: BabyDetailsFormProps) {
  const babies = useQuery(api.settings.getBabies, { siteId }) ?? [];
  const setBabies = useMutation(api.settings.setBabies);

  const form = useForm<FormData>({
    resolver: zodResolver(babySchema),
    defaultValues: {
      babies: babies.map((baby) => ({
        name: baby.name,
        gender: baby.gender,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "babies",
    control: form.control,
  });

  async function onSubmit(data: FormData) {
    try {
      await setBabies({
        siteId,
        babies: data.babies,
      });
      toast.success("Baby details updated successfully");
    } catch (error) {
      toast.error("Failed to update baby details");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border bg-card p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Baby {index + 1}</h3>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <FormField
                control={form.control}
                name={`babies.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Baby's name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`babies.${index}.gender`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="boy" id={`boy-${index}`} />
                          <FormLabel htmlFor={`boy-${index}`}>Boy</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="girl" id={`girl-${index}`} />
                          <FormLabel htmlFor={`girl-${index}`}>Girl</FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "", gender: "boy" })}
          >
            Add Another Baby
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
