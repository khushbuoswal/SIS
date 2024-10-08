import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> 8811f35b216d9d1f32b9fca24e490869b73a9cd8

interface QuizCardProps {
  questionNumber: number;
  question: string;
  options: string[];
<<<<<<< HEAD
=======
  points: number;
  handleAnswerSelection:Function
>>>>>>> 8811f35b216d9d1f32b9fca24e490869b73a9cd8
}

export default function QuizCard({
  questionNumber,
  question,
  options,
<<<<<<< HEAD
}: QuizCardProps) {
=======
  // points,
  handleAnswerSelection
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 

  const handleOptionChange = (option: string) => {
    setSelectedOption(option); 
    handleAnswerSelection(questionNumber, option)
  };

>>>>>>> 8811f35b216d9d1f32b9fca24e490869b73a9cd8
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