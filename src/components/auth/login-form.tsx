"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { platziLogin } from "@/lib/platzi-auth";


const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." }),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
   async function onSubmit(values: LoginValues) {
    setIsLoading(true);
    setApiError(null);
    setLoginSuccess(false);

    try {
      const data = await platziLogin(values);
      if (typeof window !== "undefined") {
        localStorage.setItem("platzi_access_token", data.access_token);
        localStorage.setItem("platzi_refresh_token", data.refresh_token);
      }
      setLoginSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError("Invalid email or password.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pt-4">
            {/* Global API Error Alert */}
            {apiError && (
              <div className="p-3 text-xs rounded-lg bg-red-50 text-red-600 font-medium">
                {apiError}
              </div>
            )}

            {/* Success Alert */}
            {loginSuccess && (
              <div className="p-3 text-xs rounded-lg bg-emerald-50 text-emerald-600 font-medium">
                Success! Authenticated via Platzi API. JWT saved to localStorage.
              </div>
            )}

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                      <Input
                        placeholder="john@mail.com"
                        className="pl-10"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="#"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className="relative w-full text-center text-xs text-zinc-500 my-2">
              <Separator className="my-2" />
              <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500 absolute left-1/2 -translate-x-1/2 -top-2.5">
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <Button variant="outline" type="button" className="w-full" disabled={isLoading}>
                Google
              </Button>
              <Button variant="outline" type="button" className="w-full" disabled={isLoading}>
                GitHub
              </Button>
            </div>

            <p className="text-xs text-center text-zinc-500 pt-2">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
