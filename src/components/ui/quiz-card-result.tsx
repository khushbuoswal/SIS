import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CorrectIcon, IncorrectIcon } from "./icons";
import { useEffect } from "react";

interface QuizCardResultProps {
  questionNumber: number;
  question: string;
  options: string[];
  correctOption: string;
  reference: string;
  selectedAnswer: string;
  handleCorrectAnswer: () => void; // Make sure this updates the score correctly without causing re-renders
}

export default function QuizCardResult({
  questionNumber,
  question,
  options,
  correctOption,
  reference,
  selectedAnswer,
  handleCorrectAnswer,
}: QuizCardResultProps) {

  const points = 0.5; // Default points for each correct answer

  // useEffect to check if the selected answer is correct
  useEffect(() => {
    if (selectedAnswer === correctOption) {
      handleCorrectAnswer(); // Increment the score if the answer is correct
    }
    // Dependencies should be minimized to avoid unnecessary calls
  }, [selectedAnswer, correctOption, handleCorrectAnswer]); // Ensure this only runs on necessary changes

  return (
    <Card className="mb-10 mx-auto max-w-lg">
      <CardHeader className="flex flex-row justify-between bg-secondary p-4 rounded-sm">
        <div>
          <CardTitle className="text-xl">Question {questionNumber}</CardTitle>
          <div className="font-semibold">{points} Points</div>
        </div>
        <div>{reference}</div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">{question}</div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <ul className={` ${selectedAnswer === option ? "border-4 rounded-md" : ""} flex items-center gap-2 `}>
              <li value={option} />
              <span>{option}</span>
              {selectedAnswer === option && selectedAnswer === correctOption ? <CorrectIcon /> : ""}
              {selectedAnswer === option && selectedAnswer !== correctOption ? <IncorrectIcon /> : ""}
              {selectedAnswer !== correctOption && correctOption === option ? <CorrectIcon /> : ""}
            </ul>
            <Separator className="mt-3" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
