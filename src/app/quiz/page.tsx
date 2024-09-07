"use client";
import { CircleUser, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import QuizCard from "@/components/ui/quiz-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/ui/sidebar";
import { UserDropdown } from "@/components/ui/userDropdown";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load quiz data from the API on component mount
    async function fetchQuizData() {
      setLoading(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
        });
        const data = await response.json();
        if (data.quizData) {
          setQuizData(data.quizData);
          localStorage.setItem("quizQuestions", JSON.stringify(data.quizData));
        } else {
          console.error("Quiz data is not available in the response");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizData();
  }, []);

  return (
    <main className="flex flex-col justify-center items-center size-full">
      <div className="absolute top-2 right-4">
        <ModeToggle />
      </div>

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <Sidebar />
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
              <SheetContent side="left">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <UserDropdown />
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Quiz Mode</h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
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
                  {loading ? (
                    <p>Loading quiz questions...</p>
                  ) : quizData.length > 0 ? (
                    quizData.map((quiz, index) => (
                      <QuizCard
                        key={index}
                        questionNumber={quiz.questionNumber}
                        question={quiz.question}
                        options={quiz.options}
                        points={quiz.points}
                      />
                    ))
                  ) : (
                    <p>No quiz questions available. Please generate a quiz first.</p>
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
