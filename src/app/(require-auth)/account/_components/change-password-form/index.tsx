"use client";

import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { trpc } from "@/lib/trpc/client";
import { ChangeAccountPasswordFromSchema } from "@/schemas/account";

type ChangePasswordFormValues = z.infer<typeof ChangeAccountPasswordFromSchema>;

const ChangePasswordForm = () => {
  const t = useTranslations("accountSettings.security");
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
        description: t("successMessage"),
        variant: "success",
        duration: 2000,
        onClose: () => {
          signOut({ callbackUrl: "/auth/sign-in" });
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : t("errorMessage"),
        variant: "destructive",
      });
    }
  };

  const isLoading = mutation.isPending;

  return (
    <Card className="w-full">
      <CardHeader className="mb-6 border-b border-gray-200">
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="oldPassword">{t("oldPasswordField.label")}</Label>
              <PasswordInput
                id="oldPassword"
                placeholder={t("oldPasswordField.placeholder")}
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
              <Label htmlFor="password">{t("passwordField.label")}</Label>
              <PasswordInput
                id="password"
                placeholder={t("passwordField.placeholder")}
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
              <Label htmlFor="confirmPassword">
                {t("confirmPasswordFiled.label")}
              </Label>
              <PasswordInput
                id="confirmPassword"
                placeholder={t("confirmPasswordFiled.placeholder")}
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
              {isLoading ? t("button.loading") : t("button.label")}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
