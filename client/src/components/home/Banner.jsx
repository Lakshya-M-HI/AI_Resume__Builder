import React from 'react'

const Banner = () => {
    return (
        <div className="w-full px-4 md:px-14 py-6">
            <div className="max-w-6xl mx-auto bg-linear-to-r from-indigo-600 via-violet-500 to-purple-600 text-white rounded-2xl p-6 md:p-8 shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
                            Build a Job‑Winning Resume in Minutes — Powered by AI
                        </h1>
                        <p className="mt-2 text-sm md:text-base text-violet-100/90">
                            Generate ATS-friendly, tailored resumes for each role using smart prompts and job-description analysis.
                            Faster editing, instant formatting, and keyword optimization so your resume reaches recruiters first.
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <a
                                href="/create"
                                aria-label="Create your resume"
                                className="inline-flex items-center gap-2 bg-white text-violet-600 font-semibold px-4 py-2 rounded-lg shadow hover:scale-[0.99] transition-transform"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M12 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Create Your Resume
                            </a>

                            <a
                                href="/templates"
                                aria-label="Browse templates"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-white"
                            >
                                View Templates
                            </a>

                            <a
                                href="/how-it-works"
                                aria-label="How it works"
                                className="ml-2 text-sm text-white/90 underline hover:text-white transition"
                            >
                                How it works
                            </a>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3 text-sm">
                            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                ATS‑Optimized
                            </span>

                            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Tailored to job descriptions
                            </span>

                            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 8l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Export PDF / DOCX
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:w-48 shrink-0">
                        <div className="bg-white/8 border border-white/10 rounded-lg p-4 text-sm text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">4.9</div>
                                    <div className="text-xs text-white/80">average user rating</div>
                                </div>
                                <div className="text-xs text-white/80">Trusted by 50k+</div>
                            </div>

                            <div className="mt-4 space-y-2">
                                <div className="h-2 bg-white/10 rounded w-28 animate-pulse" />
                                <div className="h-2 bg-white/6 rounded w-32 animate-pulse" />
                                <div className="h-2 bg-white/6 rounded w-20 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner