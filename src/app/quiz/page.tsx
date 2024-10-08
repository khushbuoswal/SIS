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
import { useRouter } from "next/navigation"; // Import useRouter
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle, // test
} from "@/components/ui/dialog";
//import { getUserAnswers, handleAnswerSelectionExternal } from "./quizStore";
import { ButtonLoadingQuiz } from "@/components/ui/button-loading";

export default function Quiz() {
  const [quizData, setQuizData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true); // Timer state
  const [userAnswers, setUserAnswers] = useState<any>({}); // Track user selections
  const [isExamMode, setIsExamMode] = useState(false); // Exam mode state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state
  const router = useRouter(); // Initialize useRouter
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    router.push("/results"); // Redirect to the results page after closing the dialog
  };
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  

  const handleAnswerSelection = (questionNumber: number, selection: string) => {
    setUserAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [questionNumber]: selection,
    }));
  };



// Set the start time when the exam mode and timer start
useEffect(() => {
  if (isExamMode && isTimerRunning && startTime === null) {
    setStartTime(Date.now());
  }
}, [isExamMode, isTimerRunning, startTime]);


// Set the start time when the exam mode and timer start
useEffect(() => {
  if (isExamMode && isTimerRunning && startTime === null) {
    setStartTime(Date.now());
  }
}, [isExamMode, isTimerRunning]);


  // Check Exam Mode from localStorage on component mount
  useEffect(() => {
    const storedExamMode = localStorage.getItem("examMode");
    if (storedExamMode) {
      setIsExamMode(JSON.parse(storedExamMode));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExamMode && isTimerRunning && seconds > 0) {
      // Only run timer in Exam Mode
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsTimerRunning(false); // Stop the timer
      setIsDialogOpen(true); // Open the dialog when the timer runs out
    }

    // Cleanup timer on component unmount or when timer stops
    return () => clearInterval(timer);
  }, [isTimerRunning, seconds, isExamMode, router]);

  useEffect(() => {
    // Load quiz data from localStorage
    const storedQuizQuestions = localStorage.getItem("quizQuestions");
    if (storedQuizQuestions) {
      setQuizData(JSON.parse(storedQuizQuestions));
    } else {
      console.error("No quiz questions found in local storage");
    }
    setLoading(false);
    // Start the timer if Exam Mode is enabled
    if (isExamMode) {
      setIsTimerRunning(true);
    }
  }, [isExamMode]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // Handle quiz submission
  const handleSubmit = () => {
    setIsTimerRunning(false); // Stop the timer when the quiz is submitted
    if (startTime) {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000); // Calculate in seconds
      setElapsedTime(timeTaken);
      localStorage.setItem("elapsedTime", timeTaken.toString()); // Save to localStorage if needed
    }
    console.log(userAnswers);
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    console.log("Quiz submitted");
    router.push("/results"); // Redirect to results page
  };
  
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
            {/* Title and Timer Section */}
            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg font-semibold md:text-2xl">Quiz Mode</h1>
              {/* Timer visible only if Exam Mode is enabled */}
              {isExamMode && (
                <p className="text-lg font-semibold">
                  Timer: {formatTime(seconds)}
                </p>
              )}
            </div>

            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <ScrollArea className="h-full w-full">
                <div className="p-4 lg:p-6 mt-5">
                  {quizData.length > 0 ? (
                    quizData.map((quiz, index) => (
                      <QuizCard
                        key={index}
                        questionNumber={quiz.question_number}
                        question={quiz.quiz_question}
                        options={quiz.options}
                        points={quiz.points}
                        handleAnswerSelection={handleAnswerSelection}
                      />
                    ))
                  ) : (
                    <p></p>
                  )}
                  <div className="flex justify-center mt-6">
                    {loading ? (
                      <ButtonLoadingQuiz /> // Use the loading button when quiz is loading
                    ) : (
                      <a href="http://localhost:3000/results">
                        <Button className="mb-3 w-60" onClick={handleSubmit}>
                          Submit Quiz
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </main>
        </div>
      </div>

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time up!</DialogTitle>
            <DialogDescription>
              The quiz time is over. You will be redirected to the results page.
            </DialogDescription>
            <Button onClick={handleDialogClose}>OK</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
