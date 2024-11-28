"use client";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ForgotPasswordFormSchema } from "@/schemas/forgot-password";
import { trpc } from "@/lib/trpc/client";

const ForgotPasswordPage = () => {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: { email: "" },
  });
  const { mutate, isPending } = trpc.auth.sendOtp.useMutation<
    z.infer<typeof ForgotPasswordFormSchema>
  >({ onSuccess: () => router.push("/auth/verify-otp") });
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof ForgotPasswordFormSchema>> = (
    data
  ) => {
    mutate({ email: data.email });
  };

  return (
    <section className="w-full h-screen  flex-xy-center">
      <Card className="w-11/12 md:w-96">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form id="forgot-password-form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={formState.errors.email?.message}
                  id="email"
                  placeholder="Enter your email"
                />
              )}
            />
          </form>
        </CardContent>

        <CardFooter>
          <Button
            disabled={isPending}
            className="w-full"
            type="submit"
            form="forgot-password-form"
          >
            Send OTP
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ForgotPasswordPage;
