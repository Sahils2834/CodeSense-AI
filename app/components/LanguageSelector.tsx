
"use client";

import { Code2, ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
    language: string;
    setLanguage: (language: string) => void;
}

const languages = [
    { value: "javascript", label: "JavaScript", short: "JS" },
    { value: "typescript", label: "TypeScript", short: "TS" },
    { value: "python", label: "Python", short: "PY" },
    { value: "java", label: "Java", short: "JV" },
    { value: "cpp", label: "C++", short: "C+" },
    { value: "c", label: "C", short: "C" },
];

export default function LanguageSelector({
    language,
    setLanguage,
}: LanguageSelectorProps) {
    const selectedLanguage = languages.find(
        (lang) => lang.value === language
    );

    return (
        <div className="flex w-full flex-col gap-2.5">
            <div className="flex items-center justify-between">
                <label
                    htmlFor="programming-language"
                    className="flex items-center gap-2 text-sm font-bold text-slate-800"
                >
                    <Code2 size={16} className="text-indigo-600" />
                    Programming Language
                </label>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Select Language
                </span>
            </div>

            <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-[10px] font-extrabold text-indigo-600">
                        {selectedLanguage?.short || "?"}
                    </span>
                </div>

                <select
                    id="programming-language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pl-14 pr-12 text-sm font-semibold text-slate-800 shadow-sm outline-none transition-all duration-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 group-focus-within:rotate-180 group-focus-within:text-indigo-600"
                />
            </div>

            <p className="text-xs text-slate-400">
                Choose the language that matches your source code.
            </p>
        </div>
    );
}
