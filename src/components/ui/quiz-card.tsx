import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface QuizCardProps {
  questionNumber: number;
  question: string;
  options: string[];
  points: number;
  handleAnswerSelection:Function
}

export default function QuizCard({
  questionNumber,
  question,
  options,
  // points,
  handleAnswerSelection
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 

  const handleOptionChange = (option: string) => {
    setSelectedOption(option); 
    handleAnswerSelection(questionNumber, option)
  };

  const points = 0.5; // Default points for each question

  return (
    <Card className="mb-10 mx-auto max-w-lg">
      <CardHeader className="flex justify-between bg-secondary p-4 rounded-sm">
        <CardTitle className="text-xl">Question {questionNumber}</CardTitle>
        <div className="font-semibold">{points} Points</div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">{question}</div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center gap-2 hover:text-primary">
              <input
                type="radio"
                name={`question-${questionNumber}`}
                value={option}
                checked={selectedOption === option} 
                onChange={() => handleOptionChange(option)}
              />
              <span>{option}</span>
            </label>
            <Separator className="mt-3" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}