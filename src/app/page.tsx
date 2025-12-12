"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Option = {
  id: number;
  label: string;
};

type Question = {
  id: number;
  prompt: string;
  options: Option[];
  correctOptionId: number;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "What sound does a cat make?",
    options: [
      { id: 1, label: "Bhau-Bhau" },
      { id: 2, label: "Meow-Meow" },
      { id: 3, label: "Oink-Oink" },
    ],
    correctOptionId: 2,
  },
  {
    id: 2,
    prompt: "What would you probably find in your fridge?",
    options: [
      { id: 1, label: "Shoes" },
      { id: 2, label: "Ice Cream" },
      { id: 3, label: "Books" },
    ],
    correctOptionId: 2,
  },
  {
    id: 3,
    prompt: "What color are bananas?",
    options: [
      { id: 1, label: "Blue" },
      { id: 2, label: "Yellow" },
      { id: 3, label: "Red" },
    ],
    correctOptionId: 2,
  },
  {
    id: 4,
    prompt: "How many stars are in the sky?",
    options: [
      { id: 1, label: "Two" },
      { id: 2, label: "Infinite" },
      { id: 3, label: "One Hundred" },
    ],
    correctOptionId: 2,
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  const score = useMemo(() => {
    return QUESTIONS.reduce((total, question) => {
      const selected = answers[question.id];
      if (selected === question.correctOptionId) {
        return total + 1;
      }
      return total;
    }, 0);
  }, [answers]);

  const handleSelectOption = (optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#E0F2F7] via-[#B8E6F5] to-[#9DD9F2] px-4 py-8">
        <main className="w-full max-w-[1040px]">
          <section className="relative mx-auto flex min-h-[420px] items-center justify-center overflow-hidden rounded-[40px] bg-gradient-to-br from-[#cee6ff] via-[#f7fbff] to-[#c4e4ff] p-[3px] shadow-[0_32px_80px_rgba(15,23,42,0.45)]">
            <div className="flex h-full w-full items-center justify-center rounded-[36px] bg-[#f7fbff]/95 px-6 py-10 sm:px-10">
              <div className="mx-auto text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
                  Congratulations!
                </p>
                <p className="text-2xl font-semibold text-slate-800 sm:text-3xl">
                  Your final score is
                </p>
                <p className="mt-6 text-5xl font-extrabold leading-none text-sky-600 sm:text-6xl">
                  {score}
                </p>
                <p className="mt-2 text-xs font-medium tracking-wide text-slate-600 sm:text-sm">
                  out of {QUESTIONS.length} questions
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#E0F2F7] via-[#B8E6F5] to-[#9DD9F2] px-4 py-8">
      <main className="w-full max-w-[1040px]">
        <section className="relative mx-auto flex min-h-[420px] items-center justify-center overflow-hidden rounded-[40px] bg-gradient-to-br from-[#cee6ff] via-[#f7fbff] to-[#c4e4ff] p-[3px] shadow-[0_32px_80px_rgba(15,23,42,0.45)]">
          <div className="relative flex h-full w-full items-stretch rounded-[36px] bg-[#f7fbff]/95 px-5 py-8 sm:px-10 sm:py-10">
            <div className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col">
              <header className="mb-8 text-center sm:mb-10">
                <h1 className="text-center">
                  <span className="bg-gradient-to-r from-[#172b4d] via-[#2c7fb8] to-[#51b8ff] bg-clip-text text-[30px] font-semibold italic leading-tight tracking-[-0.08em] text-transparent sm:text-[40px] md:text-[46px]">
                    Test Your Knowledge
                  </span>
                </h1>
                <div className="mt-4 flex justify-center">
                  <div className="inline-flex min-h-[40px] items-center justify-center rounded-[14px] bg-transparent px-6 py-2">
                    <p className="text-[13px] font-medium leading-snug tracking-[-0.02em] text-slate-600 sm:text-[15px]">
                      Answer all questions to see your results
                    </p>
                  </div>
                </div>
                
                {/* Progress Indicator */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1">
                    {QUESTIONS.map((question, index) => {
                      const isCompleted = answers[question.id] !== null;
                      const isCurrent = index === currentIndex;
                      
                      return (
                        <div key={question.id} className="flex items-center">
                          <div
                            className={`h-2 w-20 rounded-full transition-all duration-300 ${
                              index < currentIndex || isCurrent
                                ? 'bg-[#252c36]'
                                : 'bg-[#e4e7f3]'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </header>

              <div className="mb-4 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                <span>
                  Question {currentIndex + 1} of {QUESTIONS.length}
                </span>
              </div>

              <div className="mb-5 rounded-[6px] bg-gradient-to-r from-[#b2e2ff] via-[#c9ecff] to-[#d6f3ff] px-5 py-3 text-center text-[13px] font-semibold tracking-[-0.02em] text-slate-800 shadow-[0_6px_12px_rgba(15,23,42,0.12)] sm:text-[14px]">
                {currentQuestion.id}. {currentQuestion.prompt}
              </div>

              <div className="relative mb-8">
                <div className="space-y-2" role="list" aria-label="Answer options">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = answers[currentQuestion.id] === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelectOption(option.id)}
                        className={`w-full rounded-[6px] px-5 py-3 text-center text-[13px] font-semibold tracking-[-0.02em] text-slate-800 shadow-[0_6px_12px_rgba(15,23,42,0.12)] transition-colors duration-150 sm:text-[14px]
                        ${
                          isSelected
                            ? "bg-gradient-to-r from-[#b2e2ff] via-[#c9ecff] to-[#d6f3ff]"
                            : "bg-[#f0f9ff] hover:bg-[#e0f2fe]"
                        }`}
                        role="listitem"
                        aria-pressed={isSelected}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <footer className="mt-auto flex items-center justify-between text-[11px] text-slate-500">
                <div className="hidden sm:block">
                  Select an option to continue
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d1def0] bg-white/90 text-slate-600 shadow-[0_4px_10px_rgba(15,23,42,0.12)] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous question"
                  >
                    ‹
                  </button>

                  {currentIndex < QUESTIONS.length - 1 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3da9f5] bg-[#49b5ff] text-white shadow-[0_4px_10px_rgba(15,23,42,0.25)] transition-colors hover:bg-[#379be6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49b5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7fbff]"
                      aria-label="Next question"
                    >
                      ›
                    </button>
                  )}

                  {currentIndex === QUESTIONS.length - 1 && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="rounded-[12px] bg-[#49b5ff] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_10px_rgba(15,23,42,0.25)] transition-colors hover:bg-[#379be6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49b5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7fbff]"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </footer>
            </div>

            <div className="pointer-events-none absolute left-6 -bottom-2 hidden sm:block">
              <div className="relative">
                <div className="absolute -top-16 left-0 rounded-[6px] border border-[#e0e0e0] bg-white px-4 py-1 text-[20px] font-medium leading-[19.64px] tracking-[-0.82px] text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.1)] text-center" style={{ fontFamily: 'var(--font-caveat-brush)' }}>
                  Best of Luck!
                </div>
                <div className="relative h-[96px] w-[96px] overflow-hidden rounded-full bg-white">
                  <Image
                    src="/cat.gif"
                    alt="Cat"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>

                      </div>
        </section>
      </main>
    </div>
  );
}
