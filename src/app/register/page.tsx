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
import { useRouter } from "next/navigation";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { ButtonLoading } from "@/components/ui/button-loading";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Sign up complete.', response.data);
      router.push("/");
    } catch (error: any) {
      console.log('Failed to create an account. Please try again.', error.message);
      setErrorMessage("An account under this email already exists. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col justify-center items-center size-full">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <Card className="mx-auto max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid-gap-2">
                <Label>First name</Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="John"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  required />
              </div>
              <div className="grid-gap-2">
                <Label>Last name</Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Smith"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  required />
              </div>
            </div>
            <div className="grid-gap-2">
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
            <div className="grid-gap-2">
              <Label>Password</Label>
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
            <Button type="submit" onClick={handleRegister} disabled={loading}>
              {loading ? <ButtonLoading /> : "Create an account"}
            </Button>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-5 flex-shrink text-sm text-gray-500">
                OR
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Button variant="outline">
              <Globe className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
          </form>
          <div className="mt-5 text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
