import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}

export function ButtonLoadingDashboard() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Logging in
    </Button>
  );
}

export function ButtonLoadingQuiz() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Generating quiz
    </Button>
  );
}