
"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import {
    Trash2,
    Copy,
    Check,
    Code2,
    FileCode2,
} from "lucide-react";

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
    language: string;
}

const languageExtensions: Record<string, string> = {
    javascript: "js",
    typescript: "ts",
    python: "py",
    java: "java",
    cpp: "cpp",
    c: "c",
};

const languageNames: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    python: "Python",
    java: "Java",
    cpp: "C++",
    c: "C",
};

export default function CodeEditor({
    code,
    setCode,
    language,
}: CodeEditorProps) {
    const [copied, setCopied] = useState(false);

    const extension = languageExtensions[language] || "txt";
    const languageName = languageNames[language] || language;

    const lineCount = code ? code.split("\n").length : 1;
    const characterCount = code.length;

    // Adapt editor height to the available desktop viewport.
    const editorHeight =
        "max(420px, min(650px, calc(100vh - 350px)))";

    const handleCopy = async () => {
        if (!code) return;

        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch {
            console.error("Unable to copy code to clipboard.");
        }
    };

    const handleClear = () => {
        setCode("");
        setCopied(false);
    };

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-[#292B38] bg-[#11121A] shadow-[0_12px_40px_rgba(15,15,30,0.12)] transition-colors duration-200 hover:border-[#4440A8]/60">

            {/* Editor toolbar */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] bg-[#181923] px-4 py-3 sm:px-5">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    </div>

                    <div className="h-5 w-px bg-white/10" />

                    <div className="flex min-w-0 items-center gap-2">
                        <FileCode2
                            size={15}
                            className="shrink-0 text-[#9B91FF]"
                        />

                        <span className="truncate text-sm font-medium text-gray-300">
                            main.{extension}
                        </span>

                        <span className="hidden rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-gray-500 sm:inline-block">
                            {languageName}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCopy}
                        disabled={!code}
                        className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-medium text-gray-400 transition hover:border-[#8175FF]/40 hover:bg-[#8175FF]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        {copied ? (
                            <Check size={14} className="text-green-400" />
                        ) : (
                            <Copy size={14} />
                        )}
                        <span>{copied ? "Copied" : "Copy"}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={!code}
                        className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-medium text-gray-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <Trash2 size={14} />
                        <span>Clear</span>
                    </button>
                </div>
            </div>

            {/* Monaco editor */}
            <div
                className="min-h-0 flex-1 bg-[#11121A]"
                style={{ height: editorHeight }}
            >
                <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    loading={
                        <div className="flex h-full items-center justify-center bg-[#11121A]">
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#8175FF] border-t-transparent" />
                                Loading code editor...
                            </div>
                        </div>
                    }
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        fontSize: 14,
                        fontFamily: "'JetBrains Mono', 'Consolas', monospace",
                        fontLigatures: true,
                        lineNumbers: "on",
                        lineNumbersMinChars: 3,
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        renderLineHighlight: "all",
                        roundedSelection: true,
                        padding: {
                            top: 20,
                            bottom: 20,
                        },
                        tabSize: 4,
                        wordWrap: "on",
                        bracketPairColorization: {
                            enabled: true,
                        },
                        guides: {
                            indentation: true,
                            bracketPairs: true,
                        },
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                        folding: true,
                        overviewRulerBorder: false,
                        hideCursorInOverviewRuler: true,
                        scrollbar: {
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                        },
                    }}
                />
            </div>

            {/* Editor status bar */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] bg-[#181923] px-4 py-2.5 sm:px-5">

                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <Code2 size={13} className="text-[#8175FF]" />
                    <span>{languageName}</span>
                    <span className="text-gray-700">|</span>
                    <span>UTF-8</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-gray-500">
                    <span>
                        {lineCount} {lineCount === 1 ? "line" : "lines"}
                    </span>

                    <span>
                        {characterCount.toLocaleString()} characters
                    </span>

                    <span className="hidden sm:inline">
                        Spaces: 4
                    </span>
                </div>
            </div>
        </div>
    );
}
