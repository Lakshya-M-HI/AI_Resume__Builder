import React from "react";
// import Zap from 'lucide-react';

const Feature = () => {
    const featuresData = [
        {
            icon: (
                <svg
                    aria-hidden="true"
                    className="text-purple-400 h-10 w-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
            ),
            title: "Lightning-fast setup",
            description: "Launch production-ready pages in minutes with prebuilt components and starter flows.",
        },
        {
            icon: (
                <svg
                    aria-hidden="true"
                    className="text-pink-400 h-10 w-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
            ),
            title: "Pixel perfect",
            description: "Design-first components that match your Figma files and scale across screens.",
        },
        {
            icon: (
                <svg
                    aria-hidden="true"
                    className="text-emerald-400 h-10 w-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <circle cx="17.5" cy="17.5" r="3.5" />
                </svg>
            ),
            title: "Highly customizable",
            description: "Utility-first classes and tokens let you customize every detail effortlessly.",
        },
    ];

    return (
        <section id="features" aria-labelledby="features-heading"
            className="py-16 px-6 md:px-12 "
        >
            <div className="max-w-6xl mx-auto text-center">
                <p className="inline-block text-sm font-semibold px-4 py-1 rounded-full bg-gradient-to-r from-purple-900/40 to-indigo-900/30 text-purple-300 border border-purple-800">
                {/* <Zap width={14} /> */}
                   Simple Process

                </p>

                <h2 id="features-heading" className="mt-6 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    Built for builders
                </h2>

                <p className="mt-3 text-lg text-slate-300 max-w-3xl mx-auto">
                    Components, patterns and pages — everything you need to ship. Designed for speed, flexibility and
                    delightful developer experience.
                </p>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuresData.map((feature, idx) => (
                        <article
                            key={idx}
                            role="group"
                            tabIndex={0}
                            className={`relative transform-gpu transition duration-300 ease-out hover:-translate-y-3 focus:-translate-y-3 focus:outline-none ${
                                idx === 1 ? "rounded-xl p-px bg-gradient-to-br from-[#7C3AED] to-[#2563EB]" : ""
                            }`}
                        >
                            <div
                                className="relative rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md p-6 h-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                aria-hidden="false"
                            >
                                <div className="flex items-start gap-4">
                                    <span
                                        className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-white/3 to-white/2 p-3 ${
                                            idx === 1 ? "ring-2 ring-white/10" : ""
                                        }`}
                                        aria-hidden="true"
                                    >
                                        {feature.icon}
                                    </span>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white text-lg font-semibold leading-snug">{feature.title}</h3>
                                        <p className="mt-2 text-sm text-slate-300/90 line-clamp-3">{feature.description}</p>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between">
                                    <div className="text-xs text-slate-400">Advanced</div>
                                    <span className="inline-flex items-center gap-2 text-xs text-white/90 bg-gradient-to-r from-violet-600 to-indigo-500 px-3 py-1 rounded-full">
                                        <svg className="h-3 w-3 text-white/90" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Ready
                                    </span>
                                </div>

                                {/* subtle accent line */}
                                <span
                                    className={`absolute left-4 right-4 bottom-4 h-0.5 rounded-full ${
                                        idx === 1 ? "bg-gradient-to-r from-purple-500 to-indigo-400 opacity-80" : "bg-slate-800/60"
                                    }`}
                                    aria-hidden="true"
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Feature