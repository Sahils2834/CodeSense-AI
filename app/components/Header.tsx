"use client";

import { Code2, Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">

            <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">

                {/* Logo and Brand */}
                <div className="flex items-center gap-3.5">

                    <div className="group relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40">

                        <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />

                        <Code2 size={23} className="relative text-white" strokeWidth={2.3} />

                    </div>

                    <div className="flex flex-col">

                        <h1 className="text-[21px] font-extrabold tracking-tight text-slate-900">
                            CodeLens
                            <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                AI
                            </span>
                        </h1>

                        <p className="text-[9px] font-semibold tracking-[2.1px] text-slate-400">
                            INTELLIGENT CODE REVIEW
                        </p>

                    </div>

                </div>


                {/* Right Navigation */}
                <div className="flex items-center gap-3 sm:gap-5">

                    {/* AI Status */}
                    <div className="hidden items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-4 py-2 sm:flex">

                        <Sparkles size={15} className="text-indigo-600" />

                        <span className="text-xs font-semibold text-indigo-700">
                            AI Powered
                        </span>

                        <span className="relative ml-1 flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>

                    </div>


                    {/* Security Badge */}
                    <div className="hidden items-center gap-2 text-sm font-medium text-slate-500 md:flex">
                        <ShieldCheck size={17} className="text-emerald-500" />
                        Secure Analysis
                    </div>


                    {/* GitHub / Project Link */}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                        <Code2 size={17} />

                        <span className="hidden sm:inline">
                            Project
                        </span>

                        <ArrowUpRight
                            size={14}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </a>

                </div>

            </div>

        </header>
    );
}