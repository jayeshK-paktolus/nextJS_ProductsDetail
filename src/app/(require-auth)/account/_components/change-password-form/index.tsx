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
import { trpc } from "@/lib/trpc/client";
import { signOut } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

type ChangePasswordFormValues = z.infer<typeof ChangeAccountPasswordFromSchema>;

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangeAccountPasswordFromSchema),
  });

  const mutation = trpc.users.changePassword.useMutation();

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await mutation.mutateAsync(data);

      toast({
        title: "Success",
        description: "Your password was changed successfully.",
        variant: "success",
        duration: 2000,
        onClose: () => {
          signOut({ callbackUrl: "/auth/sign-in" });
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const isLoading = mutation.isPending;

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
                disabled={isLoading}
                {...register("oldPassword")}
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-xs">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">New Password</Label>
              <PasswordInput
                id="password"
                placeholder="Enter new password"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm password"
                disabled={isLoading}
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
            <Button
              type="submit"
              disabled={isLoading}
              className={`btn ${isLoading ? "btn-disabled" : "btn-primary"}`}
            >
              {isLoading ? "Updating..." : "Change Password"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
