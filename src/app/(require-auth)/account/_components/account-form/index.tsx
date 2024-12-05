"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpdateAccountFormSchema } from "@/schemas/account";
import { trpc } from "@/lib/trpc/client"; // Assuming you're using trpc for API requests

type AccountFormValues = z.infer<typeof UpdateAccountFormSchema>;
type AccountFormProps = { data: AccountFormValues };

const AccountForm = ({ data }: AccountFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AccountFormValues>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: data,
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const mutation = trpc.users.updateAccount.useMutation();
  const onSubmit = async (formData: AccountFormValues) => {
    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="mb-10 border-b border-gray-200">
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Your first name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Your last name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <CardFooter className="flex justify-start pl-0 pt-3 mt-5">
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountForm;
