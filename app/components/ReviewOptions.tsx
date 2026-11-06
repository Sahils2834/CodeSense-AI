
"use client";

import {
    ScanSearch,
    Bug,
    ShieldCheck,
    Gauge,
    WandSparkles,
    Check,
} from "lucide-react";

const reviewModes = [
    {
        id: "full",
        label: "Full Review",
        description: "Complete code analysis",
        icon: ScanSearch,
    },
    {
        id: "bugs",
        label: "Bug Detection",
        description: "Find logical errors",
        icon: Bug,
    },
    {
        id: "security",
        label: "Security",
        description: "Identify vulnerabilities",
        icon: ShieldCheck,
    },
    {
        id: "performance",
        label: "Performance",
        description: "Improve execution speed",
        icon: Gauge,
    },
    {
        id: "optimization",
        label: "Optimization",
        description: "Cleaner, better code",
        icon: WandSparkles,
    },
];

interface ReviewOptionsProps {
    mode: string;
    setMode: (mode: string) => void;
}

export default function ReviewOptions({
    mode,
    setMode,
}: ReviewOptionsProps) {
    return (
        <div className="space-y-3">

            {/* Heading */}
            <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800">
                    Review Type
                </label>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Choose Analysis
                </span>
            </div>

            {/* Compact review options */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {reviewModes.map((item) => {
                    const Icon = item.icon;
                    const active = mode === item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setMode(item.id)}
                            aria-pressed={active}
                            className={`group flex min-h-[58px] items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-all duration-200 ${active
                                    ? "border-indigo-400 bg-indigo-50/80 ring-1 ring-indigo-500/10"
                                    : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
                                }`}
                        >
                            {/* Icon */}
                            <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${active
                                        ? "bg-indigo-600 text-white"
                                        : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                                    }`}
                            >
                                <Icon size={16} strokeWidth={2} />
                            </div>

                            {/* Label */}
                            <div className="min-w-0 flex-1">
                                <p
                                    className={`text-xs font-bold ${active ? "text-indigo-700" : "text-slate-800"
                                        }`}
                                >
                                    {item.label}
                                </p>

                                <p className="mt-0.5 text-[10px] leading-4 text-slate-500">
                                    {item.description}
                                </p>
                            </div>

                            {/* Selection indicator */}
                            <div
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${active
                                        ? "border-indigo-600 bg-indigo-600 text-white"
                                        : "border-slate-300 bg-white text-transparent"
                                    }`}
                            >
                                <Check size={10} strokeWidth={3} />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
