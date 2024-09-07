"use client"
import Link from "next/link";
import { CircleUser, Menu, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ButtonLoadingQuiz } from "@/components/ui/button-loading";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/ui/sidebar";
import { UserDropdown } from "@/components/ui/userDropdown";

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
        <Sidebar />

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
              <Sidebar />
              </SheetContent>
            </Sheet>
            <UserDropdown />
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
