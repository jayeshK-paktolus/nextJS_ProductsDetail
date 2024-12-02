"use client";

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
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { OtpFormSchema } from "@/schemas/forgot-password";
import { trpc } from "@/lib/trpc/client";

const VerifyOtpForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const persistedEmail = params.get("email");
  const form = useForm({
    resolver: zodResolver(OtpFormSchema),
    defaultValues: { email: persistedEmail || "", otp: "" },
  });
  const { email, otp } = form.getValues();
  const { mutate, isPending } = trpc.auth.verifyOtp.useMutation<
    z.infer<typeof OtpFormSchema>
  >({
    onSuccess: () =>
      router.push(`/auth/reset-password?email=${email}&otp=${otp}`),
  });

  const onSubmit: SubmitHandler<z.infer<typeof OtpFormSchema>> = (data) => {
    mutate({ email: data.email, otp: data.otp });
  };

  return (
    <section className="w-full h-screen  flex-xy-center">
      <Card className="w-11/12 md:w-80">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Verify OTP</CardTitle>
          <CardDescription>
            Please enter OTP we sent to your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="123456" />
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
    </section>
  );
};

export default VerifyOtpForm;
