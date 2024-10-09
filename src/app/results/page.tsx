"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import QuizCard from "@/components/ui/quiz-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/ui/sidebar";
import { UserDropdown } from "@/components/ui/userDropdown";
import QuizCardResult from "@/components/ui/quiz-card-result";

export default function Quiz() {
  const [quizData, setQuizData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0); // Add score state
  const [time, setTime] = useState("00:00"); // Add time state
  const [userAnswers, setUserAnswers] = useState<any[]>([]);

  
  useEffect(() => {
    // Load quiz data from localStorage
    const storedQuizQuestions = localStorage.getItem("quizQuestions");
    if (storedQuizQuestions) {
      setQuizData(JSON.parse(storedQuizQuestions));
    } else {
      console.error("No quiz questions found in local storage");
    }
  
    const submittedAnswers = localStorage.getItem("userAnswers");
    if(submittedAnswers) {
      console.log(submittedAnswers)
      setUserAnswers(JSON.parse(submittedAnswers));
    } else {
      console.error("No submitted answers found in local storage");
    }
  
    // Load the time taken
    const storedTimeTaken = localStorage.getItem("timeTaken");
    if (storedTimeTaken) {
      const timeTakenSeconds = JSON.parse(storedTimeTaken);
      const minutes = Math.floor(timeTakenSeconds / 60);
      const seconds = timeTakenSeconds % 60;
      setTime(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
    }
  
    // Placeholder: Set score (you can replace this logic with actual scoring logic)
    //setScore(85); // Example score
  
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
              <SheetContent side="left" className="flex flex-col">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <UserDropdown />
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {/* Title Section */}
            <div className="w-full">
              <h1 className="text-lg font-semibold md:text-2xl">Results Page</h1>
              {/* Score and Time Section */}
              <div className="mt-2 flex justify-between">
                <p className="text-sm md:text-lg">Score: {score}</p>
                <p className="text-sm md:text-lg">Time: {time}</p>
              </div>
            </div>
            


            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            >
              <ScrollArea className="h-full w-full">
                <div className="p-4 lg:p-6 mt-5">
                  {loading ? (
                    <p>Loading quiz questions...</p>
                  ) : quizData.length > 0 ? (
                    quizData.map((quiz, index) => (
                      <QuizCardResult
                      key={index}
                      questionNumber={quiz.question_number}
                      question={quiz.quiz_question}
                      options={quiz.options}
                      correctOption={quiz.correct_option} // Pass the correct option
                      points={quiz.points}
                      reference={quiz.reference}
                      selectedAnswer={userAnswers[index+1]}
                      setScore={setScore}
                      />
                    ))
                  ) : (
                    <p> </p>
                  )}
                </div>
              </ScrollArea>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
