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
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import QuizCard from "@/components/ui/quiz-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Quiz() {
  // const quizData = [
  //   {
  //     questionNumber: 1,
  //     question: "What is the capital of France?",
  //     options: ["Paris", "London", "Berlin", "Madrid"],
  //     points: 0.5,
  //   },
  //   {
  //     questionNumber: 2,
  //     question: "Which planet is known as the Red Planet?",
  //     options: ["Earth", "Mars", "Jupiter", "Venus"],
  //     points: 0.5,
  //   },
  //   {
  //     questionNumber: 3,
  //     question: "What is the chemical symbol for water?",
  //     options: ["H2O", "O2", "CO2", "NaCl"],
  //     points: 0.5,
  //   },
  //   {
  //     questionNumber: 4,
  //     question: "What is the largest mammal in the world?",
  //     options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
  //     points: 0.5,
  //   },
  //   {
  //     questionNumber: 5,
  //     question: "Who wrote 'Romeo and Juliet'?",
  //     options: [
  //       "William Shakespeare",
  //       "Charles Dickens",
  //       "Mark Twain",
  //       "Leo Tolstoy",
  //     ],
  //     points: 0.5,
  //   },
  // ];

  const [quizData, setQuizData] = useState<any[]>([]);

  useEffect(() => {
    // Load quiz data from local storage
    const savedQuizData = localStorage.getItem("quizQuestions");
    if (savedQuizData) {
      setQuizData(JSON.parse(savedQuizData));
    }
  }, []);

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
              <h1 className="text-lg font-semibold md:text-2xl">Quiz Mode</h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <ScrollArea className="h-full w-full">
                <div className="p-4 lg:p-6 mt-5">
                {/* {quizData.map((quiz, index) => (
                    <QuizCard
                      key={index}
                      questionNumber={quiz.questionNumber}
                      question={quiz.question}
                      options={quiz.options}
                      points={quiz.points}
                    />
                  ))} */}
                  {quizData ? (
                    <pre>{quizData}</pre>
                  ) : (
                    <p>
                      No quiz questions available. Please generate a quiz first.
                    </p>
                  )}
                  <div className="flex justify-center mt-6">
                    <Button className="mb-3 w-60">Submit Quiz</Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
