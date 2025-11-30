import { Download, Moon, Sun, Smartphone, Monitor, ZoomIn, ZoomOut } from "lucide-react";
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeGradientTemplate from "./templates/CreativeGradientTemplate";
import TwoColumnPremiumTemplate from "./templates/TwoColumnPremiumTemplate";


// Convert HEX → RGBA
const hexToRgba = (hex, alpha = 1) => {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    const h = hex.replace("#", "");
    const bigint = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const ResumePreview = ({
    data,
    template = "classic",
    accentColor = "#2563EB",
    classes = "",
    scale: propScale = 1,
    device: propDevice = "desktop",
    darkMode: propDarkMode = false,
}) => {

    // UI States
    const [scale, setScale] = useState(propScale);
    const [device, setDevice] = useState(propDevice);
    const [darkMode, setDarkMode] = useState(propDarkMode);

    // Which template to render
    const renderedTemplate = useMemo(() => {
        const props = { data, accentColor, darkMode };

        switch (template) {
            case "classic":
                return <ClassicTemplate {...props} />;
            case "modern":
                return <ModernTemplate {...props} />;
            case "minimal":
                return <MinimalTemplate {...props} />;
            case "minimal-image":
                return <MinimalImageTemplate {...props} />;
            case "gradient":
                return <CreativeGradientTemplate {...props} />;
            case "premium":
                return <TwoColumnPremiumTemplate {...props} />;
            default:
                return <ClassicTemplate {...props} />;
        }
    }, [template, data, accentColor, darkMode]);


    return (
        <div className={`w-full flex flex-col items-center ${classes}`}>

            {/* ===== TOOLBAR ===== */}
            <div className="flex items-center justify-between mb-4 w-full max-w-[900px] px-2 select-none">

                {/* Left — Device Switch */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setDevice("desktop")}
                        className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs transition 
                            ${device === "desktop"
                                ? "bg-white/10 text-white border border-white/20"
                                : "bg-white/5 text-white/50"}
                        `}
                    >
                        <Monitor className="size-4" /> Desktop
                    </button>

                    <button
                        onClick={() => setDevice("mobile")}
                        className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs transition 
                            ${device === "mobile"
                                ? "bg-white/10 text-white border border-white/20"
                                : "bg-white/5 text-white/50"}
                        `}
                    >
                        <Smartphone className="size-4" /> Mobile
                    </button>
                </div>

                {/* Middle — Zoom */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setScale(prev => Math.max(prev - 0.1, 0.6))}
                        className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg transition text-white/90"
                    >
                        <ZoomOut className="size-4" />
                    </button>

                    <span className="text-white/80 text-xs w-10 text-center">
                        {(scale * 100).toFixed(0)}%
                    </span>

                    <button
                        onClick={() => setScale(prev => Math.min(prev + 0.1, 1.4))}
                        className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg transition text-white/90"
                    >
                        <ZoomIn className="size-4" />
                    </button>
                </div>

                {/* Right — Dark Mode + Download */}
                <div className="flex items-center gap-2">

                    <button
                        onClick={() => setDarkMode(d => !d)}
                        className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
                    >
                        {darkMode ? (
                            <Sun className="size-4 text-yellow-300" />
                        ) : (
                            <Moon className="size-4 text-white/90" />
                        )}
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs flex items-center gap-1"
                    >
                        <Download className="size-4" /> Export
                    </button>
                </div>
            </div>


            {/* ===== RESUME PREVIEW AREA ===== */}
            <div
                className={`mx-auto transition-all duration-300 ${device === "mobile" ? "w-[380px]" : "max-w-[850px]"}`}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                }}
            >

                <div
                    id="resume-preview"
                    aria-label="Resume Preview"
                    className={`
                        resume-sheet relative
                        rounded-xl overflow-hidden shadow-2xl border 
                        transition-all duration-300
                        ${darkMode ? "bg-[#1C1D1F] text-white" : "bg-white text-black"}
                        animate-scaleIn
                    `}
                    style={{
                        width: "850px",
                        aspectRatio: "1 / 1.414",
                        borderColor: hexToRgba(accentColor, 0.35),
                        boxShadow: `
                            0 0 40px ${hexToRgba(accentColor, 0.25)},
                            0 20px 35px rgba(0,0,0,0.20)
                        `,
                    }}
                >
                    {/* ACTUAL RENDERED TEMPLATE */}
                    <div className="relative z-10 p-8">
                        {renderedTemplate}
                    </div>
                </div>
            </div>
        </div>
    );
};

ResumePreview.propTypes = {
    data: PropTypes.object.isRequired,
    template: PropTypes.string,
    accentColor: PropTypes.string,
    classes: PropTypes.string,
    scale: PropTypes.number,
    device: PropTypes.string,
    darkMode: PropTypes.bool,
};

export default React.memo(ResumePreview);
