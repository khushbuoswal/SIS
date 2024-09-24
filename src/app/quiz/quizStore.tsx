import { useState } from "react";


const [userAnswers, setUserAnswers] = useState<any>({}); // Track user selections


export const handleAnswerSelection = (questionNumber: number, selection: string) => {
    setUserAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [questionNumber]: selection,
    }));
  };


export const getUserAnswers = () => {
return userAnswers
}