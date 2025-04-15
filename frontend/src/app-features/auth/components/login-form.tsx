"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../types";
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
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "../api/use-login";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLogin();

  const onFormSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(data, {
      onSuccess: () => {
        router.refresh();
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Please login to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(onFormSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Email" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button disabled={isPending}>Login</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          You don&apos;t have an account?{" "}
          <Link className="font-semibold text-blue-500" href="/register">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
