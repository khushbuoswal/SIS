import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

interface QuizCardProps {
  questionNumber: number;
  question: string;
  options: string[];
  points: number;
}

export default function QuizCard({
  questionNumber,
  question,
  options,
  points,
}: QuizCardProps) {
  return (
    <Card className="mb-10 mx-auto max-w-lg ">
      <CardHeader className="flex justify-between bg-secondary p-4 rounded-sm">
        <CardTitle className="text-xl">Question {questionNumber}</CardTitle>
        <div className="font-semibold">{points} Points</div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">{question}</div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center gap-2 hover:text-primary">
              <input type="radio" onChange={() => console.log(option)} name={`question-${questionNumber}`} />
              <span>{option}</span>
            </label>
            <Separator className="mt-3" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
