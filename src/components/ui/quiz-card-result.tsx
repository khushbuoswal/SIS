import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { CorrectIcon, IncorrectIcon } from "./icons";

interface QuizCardResultProps {
  questionNumber: number;
  question: string;
  options: string[];
  points: number;
  correctOption: string
  reference: string;
  selectedAnswer: string;
  setScore: Function;
}


export default function QuizCardResult({
  questionNumber,
  question,
  options,
  correctOption,
  reference,
  selectedAnswer,
  setScore,
}: QuizCardResultProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 


  const points = 0.5; // Default points for each question
  const [totalScore, setTotalScore] = useState(0)
  

  useEffect(() => {
    let totalScore = 0
    options.forEach((option) => {
      if(selectedAnswer == correctOption){
        totalScore = totalScore + points
      }
    })
    setScore(totalScore)
    
  }, []);

  return (
    <Card className="mb-10 mx-auto max-w-lg"> 
      <CardHeader className="flex flex-row justify-between bg-secondary p-4 rounded-sm">
        <div>
          <CardTitle className="text-xl">Question {questionNumber}</CardTitle>
          <div className="font-semibold">{points} Points</div>
        </div> 
        <div> {reference}</div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">{question}</div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <ul className={` ${selectedAnswer == option ? "border-4 rounded-md" : ""} flex items-center gap-2 `}>
              <li
                value={option}
              />
                <span >{option}</span>
               {selectedAnswer == option && selectedAnswer == correctOption ? <CorrectIcon/> : ""}
               {selectedAnswer == option && selectedAnswer != correctOption ? <IncorrectIcon/> : ""}
               {selectedAnswer != correctOption && correctOption == option ? <CorrectIcon/>  : ""}
            </ul>
            <Separator className="mt-3" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
