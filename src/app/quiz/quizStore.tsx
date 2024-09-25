import { useState } from "react";

export default function QuizStore() {

  const [userAnswers, setUserAnswers] = useState<any>({}); // Track user selections


  const handleAnswerSelectionExternal = (questionNumber: number, selection: string) => {
      setUserAnswers((prevAnswers: any) => ({
        ...prevAnswers,
        [questionNumber]: selection,
      }));
    };


  const getUserAnswers = () => {
    return userAnswers
  }
}