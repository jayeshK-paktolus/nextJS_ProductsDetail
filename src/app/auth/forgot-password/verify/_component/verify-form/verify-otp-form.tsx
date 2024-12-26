"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { OtpFormSchema } from "@/schemas/forgot-password";
import { trpc } from "@/lib/trpc/client";
import { decryptData } from "@/lib/utils";

const VerifyOtpForm = () => {
  const [isErrorWhileSubmitting, setIsErrorWhileSubmitting] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const decryptedToken = JSON.parse(decryptData(params.get("token") || ""));
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
        <CardTitle className="text-xl">Verify OTP</CardTitle>
        <CardDescription>
          Please enter OTP we sent to your email
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isErrorWhileSubmitting && (
          <Alert variant="destructive" className="mb-2">
            <AlertDescription>Invalid code.</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One Time Password</FormLabel>
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

      <CardFooter>
        <Button disabled={isPending} type="submit" form="otp-form">
          Verify
        </Button>

        <Button variant="link" type="button">
          <Link href="/auth/sign-in">Return to Sign in</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyOtpForm;
