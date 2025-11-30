import React, { useEffect, useRef, useState } from "react";
import { Check, LayoutGrid } from "lucide-react";
import PropTypes from "prop-types";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const templates = [
        { id: "classic", name: "Classic", preview: "ATS-friendly corporate layout" },
        { id: "modern", name: "Modern", preview: "Bold headings two-column resume" },
        { id: "minimal", name: "Minimal", preview: "Ultra clean Apple-style resume" },
        { id: "minimal-image", name: "Minimal + Image", preview: "Resume with profile photo" },
        { id: "gradient", name: "Creative Gradient", preview: "Beautiful creative designer CV" },
        { id: "premium", name: "Premium Two-Column", preview: "High-end professional template" },
    ];

    // Close dropdown on outside click / escape
    useEffect(() => {
        const onDocClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        const onESC = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onESC);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onESC);
        };
    }, []);

    const handleSelect = (id) => {
        onChange?.(id);
        setIsOpen(false);
    };

    return (
        <div ref={ref} className="relative inline-block w-full">
            {/* Button */}
            <button
                onClick={() => setIsOpen((s) => !s)}
                className="
          w-full flex items-center justify-between gap-2 px-4 py-2.5
          rounded-xl bg-white/10 backdrop-blur-xl
          border border-white/20 shadow-inner
          text-white hover:bg-white/20 transition
        "
            >
                <div className="flex items-center gap-2">
                    <LayoutGrid className="size-4" />
                    <span>Template: </span>
                    <span className="text-purple-300">{selectedTemplate || "Select"}</span>
                </div>

                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="
            absolute right-0 mt-2 w-72 rounded-xl overflow-hidden z-50
            bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl
            animate-scaleIn
          "
                >
                    {templates.map((tpl) => {
                        const selected = selectedTemplate === tpl.id;

                        return (
                            <div
                                key={tpl.id}
                                onClick={() => handleSelect(tpl.id)}
                                className={`
                  flex items-center gap-4 px-4 py-3 cursor-pointer transition 
                  border-b border-white/10 last:border-0
                  ${selected
                                        ? "bg-gradient-to-r from-purple-600/40 to-indigo-600/40"
                                        : "hover:bg-white/10"
                                    }
                `}
                            >
                                {/* Circle Icon */}
                                <div
                                    className={`h-9 w-9 rounded-full flex items-center justify-center
                    ${selected
                                            ? "bg-purple-600 text-white shadow-lg"
                                            : "bg-white/10 border border-white/20"
                                        }
                  `}
                                >
                                    {selected && <Check className="size-4" />}
                                </div>

                                {/* Label */}
                                <div className="min-w-0">
                                    <h4 className="text-sm font-semibold text-white">{tpl.name}</h4>
                                    <p className="text-xs text-white/60 truncate">{tpl.preview}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

TemplateSelector.propTypes = {
    selectedTemplate: PropTypes.string,
    onChange: PropTypes.func,
};

TemplateSelector.defaultProps = {
    selectedTemplate: "",
    onChange: undefined,
};

export default TemplateSelector;
