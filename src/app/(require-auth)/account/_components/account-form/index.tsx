"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc/client";
import { UpdateAccountFormSchema } from "@/schemas/account";

type AccountFormValues = z.infer<typeof UpdateAccountFormSchema>;
type AccountFormProps = { data: AccountFormValues };

const AccountForm = ({ data }: AccountFormProps) => {
  const t = useTranslations("accountSettings.account");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AccountFormValues>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: data,
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const mutation = trpc.users.updateAccount.useMutation();
  const onSubmit = async (formData: AccountFormValues) => {
    try {
      await mutation.mutateAsync(formData);
      toast({
        title: "Success",
        description: "Your password was changed successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: t("errorMessage"),
        variant: "destructive",
      });
    }
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/auth/sign-in",
    });
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="mb-10 border-b border-gray-200">
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="firstName">{t("firstNameField.label")}</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">{t("emailField.label")}</Label>
              <Input
                id="email"
                placeholder="john.doe@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="lastName">{t("lastNameField.label")}</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <CardFooter className="flex justify-start pl-0 pt-3 mt-5">
            <Button type="submit">{t("button")}</Button>
            <Button className="ml-5" type="button" onClick={handleSignOut}>
              {t("signOut")}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountForm;
