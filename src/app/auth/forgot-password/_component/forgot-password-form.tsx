"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { trpc } from "@/lib/trpc/client";
import { ForgotPasswordFormSchema } from "@/schemas/forgot-password";
import { useTranslations } from "next-intl";

const ForgotPasswordForm = () => {
  const t = useTranslations("forgotPassword.sendOtp");
  const form = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: { email: "" },
  });
  const { mutate, isPending } = trpc.auth.sendOtp.useMutation<
    z.infer<typeof ForgotPasswordFormSchema>
  >({
    onSuccess: (data) => {
      router.push(`/auth/forgot-password/verify?token=${data?.token}`);
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof ForgotPasswordFormSchema>> = (
    data
  ) => {
    mutate({ email: data.email });
  };

  return (
    <Card className="w-11/12 md:w-80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            id="forgot-password-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("emailField.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name@email.com" />
                  </FormControl>
                  <FormMessage className="error-message" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="gap-x-2">
        <Button disabled={isPending} type="submit" form="forgot-password-form">
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

export default ForgotPasswordForm;
