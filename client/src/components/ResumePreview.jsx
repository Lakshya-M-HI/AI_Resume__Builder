import { Download, Moon, Sun, Smartphone, Monitor, ZoomIn, ZoomOut } from "lucide-react";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeGradientTemplate from "./templates/CreativeGradientTemplate";
import TwoColumnPremiumTemplate from "./templates/TwoColumnPremiumTemplate";



const ResumePreview = ({
    data,
    template = 'classic',
    accentColor = '#2563EB',
    classes = '',
    scale = 1,
    device = "desktop",
    darkMode = false
}) => {


    // Convert HEX → RGBA
    const hexToRgba = (hex, alpha = 1) => {


        if (!hex) return `rgba(0,0,0,${alpha})`;
        const h = hex.replace("#", "");
        const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const ResumePreview = ({ data, template = "classic", accentColor = "#2563EB", classes = "" }) => {
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


            const [scale, setScale] = useState(1); // Zoom
            const [device, setDevice] = useState("desktop"); // desktop | mobile
            const [darkMode, setDarkMode] = useState(false); // light/dark


            return (
                <div className={`w-full flex justify-center ${classes}`}>

                    <div
                        className={`
        mx-auto transition-all duration-300
        ${device === "mobile" ? "w-[380px]" : "max-w-[850px]"}
      `}
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: "top center",
                        }}
                    >
                        <div
                            id="resume-preview"
                            aria-label="Resume Preview"
                            className={`
          rounded-2xl overflow-hidden shadow-2xl border relative
          ${darkMode ? "bg-[#1B1C1E] text-white" : "bg-white text-black"}
          animate-scaleIn
        `}
                            style={{
                                borderColor: hexToRgba(accentColor, 0.35),
                                boxShadow: `0 0 25px ${hexToRgba(accentColor, 0.25)},
                      0 6px 18px rgba(0,0,0,0.15)`
                            }}
                        >
                            {/* The actual resume template */}
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
    }

    export default React.memo(ResumePreview);
