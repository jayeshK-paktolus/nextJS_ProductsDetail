"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SingInFormSchema } from "@/schemas/sign-in";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button
      type="submit"
      className="mt-4 w-full h-14 text-lg"
      disabled={isLoading}
    >
      {isLoading ? "Signing In..." : "Sign In"}
    </Button>
  );
}

export default function SignInPage() {
  const form = useForm<z.infer<typeof SingInFormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(SingInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (data: z.infer<typeof SingInFormSchema>) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {}
  };

  const isLoading = form.formState.isSubmitting || form.formState.isLoading;

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100 overflow-hidden relative">
      <Card className="pt-2 pb-2 border border-gray-200  min-w-[300px] max-w-[500px] mx-auto sm:min-w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl pt-0 mb-2 font-normal justify-center flex">
            Login
          </CardTitle>
          <Separator className="bg-gray-400" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-2 mb-5">
                    <FormLabel className="font-light">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insert your email"
                        autoFocus
                        disabled={isLoading}
                        className="bg-gray-300 text-gray-900 border-none"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-2 mb-4">
                    <FormLabel className="font-light">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Insert your password"
                        {...field}
                        disabled={isLoading}
                        className="bg-gray-300 text-gray-900 border-none"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <SubmitButton isLoading={isLoading} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
