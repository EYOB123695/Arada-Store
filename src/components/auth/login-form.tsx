"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={(e) => e.preventDefault()}>
        <CardContent className="space-y-4 pt-4">
          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="login-email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password">Password</Label>
              <Link
                href="#"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2">
            Sign In <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="relative w-full text-center text-xs text-zinc-500 dark:text-zinc-400 my-2">
            <Separator className="my-2" />
            <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500 absolute left-1/2 -translate-x-1/2 -top-2.5">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <Button variant="outline" type="button" className="w-full">
              Google
            </Button>
            <Button variant="outline" type="button" className="w-full">
              GitHub
            </Button>
          </div>

          <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 pt-2">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
