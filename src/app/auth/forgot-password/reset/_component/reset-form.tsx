"use client";

import { useState, type ChangeEvent } from "react";

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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetPasswordFormSchema } from "@/schemas/forgot-password";
import { trpc } from "@/lib/trpc/client";
import { decryptData, estimatePasswordStrength } from "@/lib/utils";
import { EstimatePasswordStrength } from "@/lib/enums/estimate-password-strength.enum";

const ResetForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const decryptedToken = JSON.parse(decryptData(params.get("token") || ""));
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
  const [passwordStrength, setPasswordStrength] = useState({
    strengthInWord: EstimatePasswordStrength.VeryWeak,
    strengthInNumber: 0,
  });
  const [isPasswordMasked, setIsPasswordMasked] = useState(true);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const strength = estimatePasswordStrength(event.target.value);

    switch (strength) {
      case EstimatePasswordStrength.VeryWeak:
        setPasswordStrength({
          strengthInWord: EstimatePasswordStrength.VeryWeak,
          strengthInNumber: 25,
        });
        break;
      case EstimatePasswordStrength.Weak:
        setPasswordStrength({
          strengthInWord: EstimatePasswordStrength.Weak,
          strengthInNumber: 50,
        });
        break;
      case EstimatePasswordStrength.Medium:
        setPasswordStrength({
          strengthInWord: EstimatePasswordStrength.Medium,
          strengthInNumber: 75,
        });
        break;
      case EstimatePasswordStrength.Strong:
        setPasswordStrength({
          strengthInWord: EstimatePasswordStrength.Strong,
          strengthInNumber: 100,
        });
        break;
      default:
        break;
    }
  };

  const handlePasswordMask = () =>
    setIsPasswordMasked((prevState) => !prevState);

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
        <CardTitle className="text-xl">Reset Password</CardTitle>
        <CardDescription>Please enter new password</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form id="reset-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={isPasswordMasked ? "password" : "text"}
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                        onChange={(event) => {
                          field.onChange(event);
                          handlePasswordChange(event);
                        }}
                      />
                      <Button
                        className="w-fit h-fit hover:bg-transparent  absolute top-2.5 right-3"
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handlePasswordMask}
                      >
                        {isPasswordMasked ? <EyeOpenIcon /> : <EyeNoneIcon />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-destructive text-xs" />
                </FormItem>
              )}
            />
            <Label>
              Password strength is: {passwordStrength.strengthInWord}
            </Label>
            <Progress
              className="h-3 my-2"
              value={passwordStrength.strengthInNumber}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
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
        <Button disabled={isPending} type="submit" form="reset-form">
          Reset
        </Button>

        <Button variant="link" type="button">
          <Link href="/auth/sign-in">Return to Sign in</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResetForm;
