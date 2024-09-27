"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch"
import { UserDropdown } from "@/components/ui/userDropdown";
import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from "pdfjs-dist/types/src/display/api";
import { ButtonLoadingQuiz } from "@/components/ui/button-loading";

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export default function Dashboard() {
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any>(null);
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      setFileSelected(true);

      // Read the PDF file
      const reader = new FileReader();
      reader.onload = async function (e) {
        const target = e.target;
        if (target && target.result) {
          const typedArray = new Uint8Array(target.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let fullText = "";

          // Extract text from each page
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const textItems = textContent.items
              .filter((item): item is TextItem => "str" in item)
              .map((item) => (item as TextItem).str);
            fullText += textItems.join(" ");
          }
          setPdfText(fullText); // Store extracted text
        } else {
          console.error("Error: e.target or e.target.result is null.");
        }
      };
      reader.readAsArrayBuffer(file); // Trigger the reader
    } else {
      setFileName(null);
      setFileSelected(false);
    }
  };

  const fetchQuizQuestions = async () => {
    if (!pdfText) return;

    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfText }),
      });

      const data = await response.json();
      setQuizQuestions(data.quizData);

      // Save to local storage
      localStorage.setItem("quizQuestions", JSON.stringify(data.quizData));
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      setQuizQuestions("An error occurred while fetching quiz questions.");
    }
    setLoading(false);
  };

  const handleGenerateQuiz = async () => {
    await fetchQuizQuestions();
    window.location.href = "/quiz";
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchOn(checked);
    localStorage.setItem("examMode", JSON.stringify(checked));
  };

  return (
    <main className="flex flex-col justify-center items-center size-full">
      <div className="absolute top-2 right-4">
        <ModeToggle />
      </div>

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <UserDropdown />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">
                Quiz Builder
              </h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            >

              <div className="flex flex-col items-center gap-1 text-center mb-10">
                <div className="flex items-center space-x-2 mb-8">
                  <Switch
                    checked={isSwitchOn}
                    onCheckedChange={handleSwitchChange}
                    id="document-switch"
                  />
                  <label htmlFor="document-switch">Exam Mode</label>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {fileName ? fileName : "You have no document uploaded"}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {fileName
                    ? "Ready! Generate a quiz now"
                    : "Upload a PDF document to get started."}
                </p>
                <div className="flex w-sm items-center space-x-2 mt-5">
                  <Input type="file" accept="application/pdf" onChange={handleFileChange} />
                </div>
                <Button
                  className="mt-5"
                  type="submit"
                  disabled={!fileSelected || loading}
                  onClick={handleGenerateQuiz}
                >
                  {loading ? <ButtonLoadingQuiz />: "Generate Quiz"}
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
