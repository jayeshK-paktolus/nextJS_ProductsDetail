"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { PasswordInput } from "@/components/ui/password-input";
import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter";
import { trpc } from "@/lib/trpc/client";
import { decryptData } from "@/lib/utils";
import { ResetPasswordFormSchema } from "@/schemas/forgot-password";
import { useTranslations } from "next-intl";

const ResetForm = () => {
  const t = useTranslations("forgotPassword.resetPassword");
  const router = useRouter();
  const params = useSearchParams();
  const decryptedToken = params.get("token")
    ? JSON.parse(decryptData(params.get("token") ?? ""))
    : "";
  const persistedFormData = { ...decryptedToken };
  const form = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate, isPending } = trpc.auth.resetPassword.useMutation<
    z.infer<typeof ResetPasswordFormSchema>
  >({
    onSuccess: () => {
      router.push("/auth/sign-in");
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof ResetPasswordFormSchema>> = (
    data
  ) => {
    mutate({
      email: persistedFormData.email,
      otp: persistedFormData.otp,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <Card className="w-11/12 md:w-80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form id="reset-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>{t("passwordField.label")}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive text-xs" />
                </FormItem>
              )}
            />
            <PasswordStrengthMeter control={form.control} name="password" />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmPasswordField.label")}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive text-xs" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="gap-x-2">
        <Button disabled={isPending} type="submit" form="reset-form">
          {isPending && <Loader2 className="animate-spin" />} {t("button")}
        </Button>

        <Link
          href="/auth/sign-in"
          className="text-sm font-medium hover:underline"
        >
          {t("returnToSignIn")}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ResetForm;
