"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { trpc } from "@/lib/trpc/client";
import { decryptData } from "@/lib/utils";
import { OtpFormSchema } from "@/schemas/forgot-password";
import { useTranslations } from "next-intl";

const VerifyOtpForm = () => {
  const t = useTranslations("forgotPassword.verifyOtp");
  const [isErrorWhileSubmitting, setIsErrorWhileSubmitting] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const decryptedToken = params.get("token")
    ? JSON.parse(decryptData(params.get("token") ?? ""))
    : "";
  const persistedEmail = decryptedToken.email;
  const form = useForm({
    resolver: zodResolver(OtpFormSchema),
    defaultValues: { otp: "" },
  });
  const { mutate, isPending } = trpc.auth.verifyOtp.useMutation<
    z.infer<typeof OtpFormSchema>
  >({
    onSuccess: (data) => {
      router.push(`/auth/forgot-password/reset?token=${data?.token}`);
    },
    onError: () => setIsErrorWhileSubmitting(true),
  });

  const onSubmit: SubmitHandler<z.infer<typeof OtpFormSchema>> = (data) => {
    mutate({ email: persistedEmail, otp: data.otp });
  };

  const handleFocus = () => setIsErrorWhileSubmitting(false);

  return (
    <Card className="w-11/12 md:w-80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>

      <CardContent>
        {isErrorWhileSubmitting && (
          <Alert variant="destructive" className="mb-2">
            <AlertDescription>{t("errorMessage")}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("otpField.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="123456"
                      onFocus={handleFocus}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive text-xs" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="gap-x-2">
        <Button disabled={isPending} type="submit" form="otp-form">
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

export default VerifyOtpForm;
