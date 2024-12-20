"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { usePersistedLocalStorageState } from "@/hooks/use-persisted-local-storage-state";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ForgotPasswordFormSchema } from "@/schemas/forgot-password";
import { trpc } from "@/lib/trpc/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: { email: "" },
  });
  const { email } = form.getValues();
  const { mutate, isPending } = trpc.auth.sendOtp.useMutation<
    z.infer<typeof ForgotPasswordFormSchema>
  >({
    onSuccess: () => {
      setPersistedEmail(email);
      router.push(`/auth/forgot-password/verify`);
    },
  });
  const router = useRouter();
  const { setValue: setPersistedEmail } = usePersistedLocalStorageState(
    "email",
    ""
  );

  const onSubmit: SubmitHandler<z.infer<typeof ForgotPasswordFormSchema>> = (
    data
  ) => {
    mutate({ email: data.email });
  };

  return (
    <section className="w-full h-screen  flex-xy-center">
      <Card className="w-11/12 md:w-80">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            If your email is registered, you will recieve an OTP shortly.
          </CardDescription>
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
                    <FormLabel>Your Email</FormLabel>
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

        <CardFooter>
          <Button
            disabled={isPending}
            type="submit"
            form="forgot-password-form"
          >
            Send OTP
          </Button>

          <Button disabled={isPending} variant="link" type="button">
            <Link href="/auth/sign-in">Return to Sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ForgotPasswordForm;
