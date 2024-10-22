"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { ButtonLoadingDashboard } from "@/components/ui/button-loading";
import { useRouter } from "next/navigation";
import axios from 'axios';
import React, { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // const handleLogin = async () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     // Redirect to /dashboard after 3 seconds
  //     window.location.href = "/dashboard";
  //   }, 1000);
  // };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('api/users/login', user);
      console.log('Login successful', response.data);
      router.push('/dashboard');
    } catch (error: any) {
      console.log('Login failed', error.message);
      setErrorMessage("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center size-full">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {/* <div className="mb-10">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div> */}

      <Card className="mx-auto max-w-lg">
        <CardHeader className="mb-4">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label>Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required />
            </div>
            {/* Error message display */}
            {errorMessage && (
              <div className="text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}
            <Button type="submit" onClick={handleLogin} disabled={loading}>
              {loading ? <ButtonLoadingDashboard /> : "Login"}
            </Button>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-5 flex-shrink text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Button variant="outline">
              <Globe className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
          </form>
          <div className="mt-5 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
