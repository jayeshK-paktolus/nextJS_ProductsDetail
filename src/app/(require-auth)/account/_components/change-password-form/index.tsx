"use client";
import React from "react";
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
import { Button } from "@/components/ui/button";
import { ChangeAccountPasswordFromSchema } from "@/schemas/account";
import { PasswordInput } from "@/components/ui/password-input";

type ChangePasswordFormValues = z.infer<typeof ChangeAccountPasswordFromSchema>;

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangeAccountPasswordFromSchema),
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    // Todo add functionality
    console.log("Password Change Data:", data); // Remove this after implementing functionality
  };

  return (
    <Card className="w-full">
      <CardHeader className="mb-6 border-b border-gray-200">
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="oldPassword">Old Password</Label>
              <PasswordInput
                id="oldPassword"
                placeholder="Enter old password"
                {...register("oldPassword")}
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-xs">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newPassword">New Password</Label>
              <PasswordInput
                id="newPassword"
                placeholder="Enter new password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <CardFooter className="flex justify-start pl-0 pt-3 mt-5">
            <Button type="submit">Change Password</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
