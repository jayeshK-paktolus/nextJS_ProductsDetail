'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const SignUpFormSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email().min(1),
  password: z.string().min(6),
});

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" className="mt-4 w-full h-14 text-lg" disabled={isLoading}>
      {isLoading ? "Registering..." : "Register"}
    </Button>
  );
}

export default function SignUpPage() {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { fullname:"" ,email: "", password: "" },
  });

  const submit = async (data: z.infer<typeof SignUpFormSchema>) => {
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if(result.error){
        throw new Error(result.error);
        toast({
          title: "Signup Failed",
          description: result.error,
          duration: 3000,
        });
      }else{
        toast({
        title: "User Registered Successfully 🎊",
        description: `${result.fullname} has been registered successfully.`,
        duration: 3000,
      });
      window.location.href = "/auth/sign-in";
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 overflow-hidden relative">
      <Card className="pt-2 pb-2 border border-gray-200 min-w-[300px] max-w-[500px] mx-auto sm:min-w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl pt-0 mb-2 font-normal justify-center flex">
            <h1>Sign Up</h1>
          </CardTitle>
          <Separator className="bg-gray-400" />
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form 
             onSubmit={form.handleSubmit(submit)}
            >

                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="mt-2 mb-5">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your full name" autoFocus disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-2 mb-5">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" autoFocus disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-2 mb-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton isLoading={isLoading} />
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-center mt-4">
        <p>
          Already have an account?&nbsp;
          <Link href="/auth/sign-in" className="underline text-blue-600">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}
