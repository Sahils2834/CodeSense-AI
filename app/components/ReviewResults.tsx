
"use client";

import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
    Check,
    Copy,
    FileCode2,
    Sparkles,
    Loader2,
    AlertCircle,
    Clock3,
} from "lucide-react";

import "highlight.js/styles/github-dark.css";

interface ReviewResultsProps {
    content?: string;
    isLoading?: boolean;
    error?: string;
}

function getTextFromNode(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(getTextFromNode).join("");
    }

    if (node && typeof node === "object" && "props" in node) {
        return getTextFromNode(
            (node as { props: { children?: ReactNode } }).props.children
        );
    }

    return "";
}

export default function ReviewResults({
    content = "",
    isLoading = false,
    error = "",
}: ReviewResultsProps) {
    const [copied, setCopied] = useState(false);

    const copyCode = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            console.error("Unable to copy code.");
        }
    };

    const hasContent = content.trim().length > 0;

    return (
        <section className="space-y-4">

            {/* Status */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-violet-600" />
                    <span className="text-xs font-semibold text-gray-800">
                        Code Analysis
                    </span>
                </div>

                <span
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${isLoading
                        ? "bg-indigo-50 text-indigo-600"
                        : error
                            ? "bg-red-50 text-red-600"
                            : hasContent
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-gray-100 text-gray-500"
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={12} className="animate-spin" />
                            Analysing
                        </>
                    ) : error ? (
                        <>
                            <AlertCircle size={12} />
                            Failed
                        </>
                    ) : hasContent ? (
                        <>
                            <Check size={12} />
                            Review complete
                        </>
                    ) : (
                        <>
                            <Clock3 size={12} />
                            Awaiting review
                        </>
                    )}
                </span>
            </div>

            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                    <AlertCircle size={17} className="mt-0.5 shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            {/* Empty state */}
            {!hasContent && !isLoading && !error && (
                <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <FileCode2 size={23} />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-800">
                        No review available yet
                    </h3>

                    <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
                        Submit your code for AI analysis. Your findings,
                        recommendations and improved implementation will
                        appear here.
                    </p>
                </div>
            )}

            {/* Markdown review */}
            {hasContent && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                        <div>
                            <p className="text-xs font-semibold text-gray-800">
                                Analysis Report
                            </p>
                            <p className="mt-0.5 text-[11px] text-gray-400">
                                Generated by Gemini AI
                            </p>
                        </div>

                        <Sparkles size={17} className="text-violet-500" />
                    </div>

                    <div className="review-markdown overflow-x-auto p-4 sm:p-5">

                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="mb-3 mt-5 border-b border-gray-100 pb-2 text-xl font-bold text-gray-900 first:mt-0">
                                        {children}
                                    </h1>
                                ),

                                h2: ({ children }) => (
                                    <h2 className="mb-3 mt-6 flex items-center gap-2 border-b border-gray-100 pb-2 text-base font-bold text-gray-900 first:mt-0">
                                        <span className="h-5 w-1 rounded-full bg-violet-500" />
                                        {children}
                                    </h2>
                                ),

                                h3: ({ children }) => (
                                    <h3 className="mb-2 mt-4 text-sm font-bold text-gray-800">
                                        {children}
                                    </h3>
                                ),

                                p: ({ children }) => (
                                    <p className="mb-3 text-[13px] leading-7 text-gray-600">
                                        {children}
                                    </p>
                                ),

                                ul: ({ children }) => (
                                    <ul className="mb-4 ml-5 list-disc space-y-2 text-[13px] leading-6 text-gray-600 marker:text-violet-500">
                                        {children}
                                    </ul>
                                ),

                                ol: ({ children }) => (
                                    <ol className="mb-4 ml-5 list-decimal space-y-2 text-[13px] leading-6 text-gray-600 marker:font-semibold marker:text-violet-600">
                                        {children}
                                    </ol>
                                ),

                                li: ({ children }) => (
                                    <li className="pl-1">
                                        {children}
                                    </li>
                                ),

                                strong: ({ children }) => (
                                    <strong className="font-semibold text-gray-900">
                                        {children}
                                    </strong>
                                ),

                                blockquote: ({ children }) => (
                                    <blockquote className="my-4 border-l-4 border-violet-300 bg-violet-50/60 px-4 py-3 text-sm text-gray-600">
                                        {children}
                                    </blockquote>
                                ),

                                table: ({ children }) => (
                                    <div className="my-4 overflow-x-auto rounded-lg border border-gray-200">
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
                                    <td className="border-b border-gray-100 px-3 py-2 text-gray-600">
                                        {children}
                                    </td>
                                ),

                                code: ({ children, className }) => {
                                    const isBlock = Boolean(className);

                                    return isBlock ? (
                                        <code className={`${className ?? ""} block min-w-0 text-[12px] leading-6`}>
                                            {children}
                                        </code>
                                    ) : (
                                        <code className="rounded bg-violet-50 px-1.5 py-0.5 font-mono text-[12px] text-violet-700">
                                            {children}
                                        </code>
                                    );
                                },

                                pre: ({ children }) => {
                                    const code = getTextFromNode(children);

                                    return (
                                        <div className="group relative my-4 overflow-hidden rounded-xl border border-gray-800 bg-[#1e1e2e]">

                                            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                                                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                                                    <span className="ml-2 text-[10px] font-medium text-gray-400">
                                                        Code
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => copyCode(code)}
                                                    className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[10px] text-gray-300 transition hover:bg-white/10 hover:text-white"
                                                >
                                                    {copied ? (
                                                        <>
                                                            <Check size={12} />
                                                            Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy size={12} />
                                                            Copy code
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            <pre className="overflow-x-auto p-4 text-[12px] leading-6">
                                                {children}
                                            </pre>
                                        </div>
                                    );
                                },

                                hr: () => (
                                    <hr className="my-5 border-gray-200" />
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>

                        {isLoading && (
                            <div className="mt-4 flex items-center gap-2 text-xs text-violet-600">
                                <Loader2 size={14} className="animate-spin" />
                                Gemini is generating the review...
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Loading without response text */}
            {isLoading && !hasContent && (
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50/40 p-6 text-center">
                    <Loader2 size={28} className="mb-3 animate-spin text-indigo-600" />

                    <p className="text-sm font-semibold text-gray-800">
                        Analysing your code
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Gemini is checking bugs, security and performance.
                    </p>
                </div>
            )}
        </section>
    );
}
