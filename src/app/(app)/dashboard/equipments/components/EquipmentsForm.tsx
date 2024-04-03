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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useValidatedForm } from "@/hooks/useValidatedForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { useBackPath } from "../../../../../modules/shared/BackButton";
import { DialogClose } from "@/components/ui/dialog";
import { EquipmentsData, Equipmentsform, formData } from "@/schema/equipments";

const EquipmentsForm = () => {
  const { errors, hasErrors, handleChange, setErrors } =
    useValidatedForm<EquipmentsData>(formData);
  const form = useForm<Equipmentsform>({
    resolver: zodResolver(formData),
    defaultValues: {
      name: "",
      roomId: "",
    },
  });
  const editing = !form.formState.isValid;
  const handleSubmit = async (data: Equipmentsform) => {
    try {
      const payload = {
        name: data.name,
        roomId: Number(data.roomId),
      };

      console.log(payload);
    } catch (e) {
      console.log(editing);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipment Name</FormLabel>
                <FormControl>
                  <Input placeholder="Equipment Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roomId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {/* Hard coded */}
                    <SelectTrigger>
                      <SelectValue placeholder="Select Room hard coded" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Room 1</SelectItem>
                      <SelectItem value="2">Room 2</SelectItem>
                      <SelectItem value="3">Room 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <SaveButton editing={editing} errors={hasErrors} />
        </form>
      </Form>
    </div>
  );
};

export default EquipmentsForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing?: boolean;
  errors?: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;

  return (
    <div className="mt-4">
      {editing ? (
        <div>
          <Button
            type="submit"
            className="w-64"
            disabled={isCreating || isUpdating || errors}
            aria-disabled={isCreating || isUpdating || errors}
          >
            {editing
              ? `Sav${isUpdating ? "ing..." : "e"}`
              : `Creat${isCreating ? "ing..." : "e"} `}
          </Button>
        </div>
      ) : (
        <div>
          <DialogClose asChild>
            <div>
              <Button
                type="submit"
                className="w-64"
                disabled={isCreating || isUpdating || errors}
                aria-disabled={isCreating || isUpdating || errors}
              >
                {editing
                  ? `Sav${isUpdating ? "ing..." : "e"}`
                  : `Creat${isCreating ? "ing..." : "e"} `}
              </Button>{" "}
            </div>
          </DialogClose>
        </div>
      )}
    </div>
  );
};
