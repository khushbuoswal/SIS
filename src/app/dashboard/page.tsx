"use client";

import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Settings,
  PenTool,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ButtonLoadingQuiz } from "@/components/ui/button-loading";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Dashboard() {
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<string | null>(null);

  const fetchQuizQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
      });

      const data = await response.json();
      setQuizQuestions(data.message);

      // Save to local storage
      localStorage.setItem("quizQuestions", JSON.stringify(data.message));
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      setQuizQuestions("An error occurred while fetching quiz questions.");
    }
    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name); // Set the file name
      setFileSelected(true);
    } else {
      setFileName(null);
      setFileSelected(false);
    }
  };

  const handleGenerateQuiz = async () => {
    await fetchQuizQuestions();
    window.location.href = "/quiz";
  };

  return (
    <main className="flex flex-col justify-center items-center size-full">
      <div className="absolute top-2 right-4">
        <ModeToggle />
      </div>

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <PenTool className="h-6 w-6" />
                <span className="">Quizzly AI</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-md font-medium lg:px-4">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-2 mb-4"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mb-4"
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mb-4"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4 mb-5">
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4 mb-3">
                  <CardTitle className="mb-2">Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* LEFT-SIDE NAVBAR UPON SCREEN RESIZE */}
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <PenTool className="h-6 w-6" />
                    <span className="">Quizzly AI</span>
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-3 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground mt-3"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-3 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Analytics
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-3 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
                <div className="mt-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">
                Quiz Builder
              </h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center mb-10">
                <h3 className="text-2xl font-bold tracking-tight">
                  {fileName ? fileName : "You have no document uploaded"}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {fileName
                    ? "Ready! Generate a quiz now"
                    : "Upload a PDF document to get started."}
                </p>
                <div className="flex w-sm items-center space-x-2 mt-5">
                  <Input type="file" onChange={handleFileChange} />
                </div>
                <Button
                  className="mt-5"
                  type="submit"
                  disabled={!fileSelected || loading}
                  onClick={handleGenerateQuiz}
                >
                  {loading ? <ButtonLoadingQuiz /> : "Generate Quiz"}
                </Button>

                {quizQuestions && (
                  <div>
                    <h2>Quiz Questions:</h2>
                    <pre>{quizQuestions}</pre>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
