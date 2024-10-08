import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CorrectIcon, IncorrectIcon } from "./icons";

interface QuizCardResultProps {
  questionNumber: number;
  question: string;
  options: string[];
  points: number;
}

export default function QuizCardResult({
  questionNumber,
  question,
  options,
}: QuizCardResultProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 


  const points = 0.5; // Default points for each question

  return (
    <Card className="mb-10 mx-auto max-w-lg"> 
      <CardHeader className="flex justify-between bg-secondary p-4 rounded-sm">
        <CardTitle className="text-xl">Questionnnnnn {questionNumber}</CardTitle>
        <div className="font-semibold">{points} Points</div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">{question}</div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <ul className="flex items-center gap-2 hover:text-primary">
              
              <li
                value={option}
              />
              {/* TODO uncomment and update variable name to show correct and incorrect answers */}
              {/* <div className={validation == false ?"text-red-600" : validation == true ? "text-lime-600" : ""}> */}
                <span >{option}</span>
                {/* { validation == false ? <IncorrectIcon/> : validation == true ? <CorrectIcon/> : ""} */}
              {/* </div> */}
              
            </ul>
            <Separator className="mt-3" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}