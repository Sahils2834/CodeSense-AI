
"use client";

import { useState } from "react";
import {
  ScanSearch,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Code2,
  PanelRight,
  Loader2,
  RotateCcw,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import ReviewOptions from "./components/ReviewOptions";
import ReviewResults from "./components/ReviewResults";

const MAX_CODE_LENGTH = 20000;

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [mode, setMode] = useState("full");

  const [message, setMessage] = useState("");
  const [reviewResult, setReviewResult] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  const handleReview = async () => {
    setMessage("");
    setReviewResult("");

    if (!code.trim()) {
      setMessage("Please enter some code before starting the review.");
      return;
    }

    if (code.length > MAX_CODE_LENGTH) {
      setMessage("Code exceeds the maximum limit of 20,000 characters.");
      return;
    }

    setIsReviewing(true);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          mode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.error || "Unable to analyse your code. Please try again."
        );
      }

      if (!response.body) {
        throw new Error("The server did not return a readable response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setReviewResult((previous) => previous + chunk);
      }

      const remaining = decoder.decode();

      if (remaining) {
        setReviewResult((previous) => previous + remaining);
      }

    } catch (error) {
      console.error("Review request failed:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while reviewing your code."
      );
    } finally {
      setIsReviewing(false);
    }
  };

  const handleResetReview = () => {
    setReviewResult("");
    setMessage("");
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#f7f8fc] text-gray-900">

      {/* Fixed Header */}
      <div className="relative z-50 shrink-0">
        <Header />
      </div>

      {/* Workspace Heading */}
      <section className="mx-auto w-full max-w-[1900px] shrink-0 px-4 pb-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-indigo-600">
              <Sparkles size={14} />
              AI Developer Workspace
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Code Review Workspace
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Write, analyse and improve your code in one place.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <ShieldCheck size={16} className="text-emerald-600" />
            Secure Analysis
          </div>
        </div>
      </section>

      {/* Main Split Workspace */}
      <section className="mx-auto grid w-full max-w-[1900px] min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto px-4 pb-4 sm:px-6 lg:grid-cols-2 lg:overflow-hidden lg:px-8">

        {/* LEFT PANEL: CODE EDITOR */}
        <div className="flex min-h-[560px] min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:min-h-0">

          {/* Editor Heading */}
          <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Code2 size={19} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Code Editor
                </h2>
                <p className="text-xs text-gray-400">
                  Write or paste your source code
                </p>
              </div>
            </div>

            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
              {code.length.toLocaleString()} / 20,000
            </span>
          </div>

          {/* Editor Area */}
          <div className="min-h-[440px] flex-1 overflow-hidden p-3 sm:p-4">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
            />
          </div>

          {/* Editor Footer */}
          <div className="flex shrink-0 items-center justify-between border-t border-gray-100 px-5 py-3">
            <span className="text-xs text-gray-400">
              <Code2 size={13} className="mr-1 inline" />
              {language.toUpperCase()} · UTF-8
            </span>

            <span className="text-xs text-gray-400">
              Maximum 20,000 characters
            </span>
          </div>
        </div>

        {/* RIGHT PANEL: CONFIGURATION + RESULTS */}
        <div className="flex min-h-[560px] min-w-0 flex-col gap-4 lg:min-h-0 lg:overflow-y-auto lg:pr-1">

          {/* Review Configuration */}
          <div className="shrink-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <PanelRight size={19} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Review Configuration
                </h2>
                <p className="text-xs text-gray-400">
                  Choose how your code should be analysed
                </p>
              </div>
            </div>

            <div className="mb-4">
              <LanguageSelector
                language={language}
                setLanguage={setLanguage}
              />
            </div>

            <ReviewOptions
              mode={mode}
              setMode={setMode}
            />

            {message && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <button
              onClick={handleReview}
              disabled={isReviewing || !code.trim() || code.length > MAX_CODE_LENGTH}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isReviewing ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Analysing Code...
                </>
              ) : (
                <>
                  <ScanSearch size={17} />
                  Analyse Code
                </>
              )}
            </button>
          </div>

          {/* AI Review Results */}
          <div className="min-h-[400px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Results Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <Sparkles size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    AI Review Results
                  </h2>
                  <p className="text-xs text-gray-400">
                    Code insights and recommendations
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {reviewResult && !isReviewing && (
                  <button
                    type="button"
                    onClick={handleResetReview}
                    title="Clear review results"
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    <RotateCcw size={15} />
                  </button>
                )}

                <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${isReviewing
                    ? "bg-indigo-50 text-indigo-600"
                    : reviewResult
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                  {isReviewing
                    ? "Analysing..."
                    : reviewResult
                      ? "Review complete"
                      : "Awaiting review"}
                </span>
              </div>
            </div>

            {/* Results Content */}
            <div className="p-4 sm:p-5">

              {reviewResult ? (
                <div className="max-h-[700px] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                  <article className="space-y-5 text-sm leading-7 text-slate-700">

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="border-b border-gray-200 pb-2 text-xl font-bold text-gray-950">
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2 className="border-b border-gray-100 pb-2 text-base font-bold text-gray-900">
                            {children}
                          </h2>
                        ),

                        h3: ({ children }) => (
                          <h3 className="text-sm font-bold text-gray-900">
                            {children}
                          </h3>
                        ),

                        p: ({ children }) => (
                          <p className="leading-7 text-slate-600">
                            {children}
                          </p>
                        ),

                        ul: ({ children }) => (
                          <ul className="ml-5 list-disc space-y-2 text-slate-600">
                            {children}
                          </ul>
                        ),

                        ol: ({ children }) => (
                          <ol className="ml-5 list-decimal space-y-2 text-slate-600">
                            {children}
                          </ol>
                        ),

                        li: ({ children }) => (
                          <li className="pl-1 leading-7">
                            {children}
                          </li>
                        ),

                        strong: ({ children }) => (
                          <strong className="font-semibold text-gray-950">
                            {children}
                          </strong>
                        ),

                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-indigo-400 bg-indigo-50/60 py-2 pl-4 pr-3 text-slate-600">
                            {children}
                          </blockquote>
                        ),

                        hr: () => (
                          <hr className="border-gray-200" />
                        ),

                        table: ({ children }) => (
                          <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full border-collapse text-left text-xs">
                              {children}
                            </table>
                          </div>
                        ),

                        th: ({ children }) => (
                          <th className="border-b border-gray-200 bg-gray-50 px-3 py-2 font-semibold text-gray-800">
                            {children}
                          </th>
                        ),

                        td: ({ children }) => (
                          <td className="border-b border-gray-100 px-3 py-2 text-slate-600">
                            {children}
                          </td>
                        ),

                        pre: ({ children }) => (
                          <pre className="overflow-x-auto rounded-xl border border-slate-700 bg-[#171923] p-4 text-xs leading-6 text-slate-100">
                            {children}
                          </pre>
                        ),

                        code: ({ className, children }) => {
                          const isBlockCode = Boolean(className);

                          return (
                            <code
                              className={
                                isBlockCode
                                  ? "font-mono text-xs text-emerald-300"
                                  : "rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-xs text-indigo-700"
                              }
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {reviewResult}
                    </ReactMarkdown>

                    {isReviewing && (
                      <span className="inline-block h-4 w-1 animate-pulse bg-indigo-500" />
                    )}

                  </article>
                </div>
              ) : (
                <ReviewResults />
              )}

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
