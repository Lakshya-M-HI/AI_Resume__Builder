// src/components/templates/CreativeGradientTemplate.jsx
import React from "react";
import PropTypes from "prop-types";

const CreativeGradientTemplate = ({ data = {}, accentColor = "#A855F7", darkMode = false }) => {
  const root = darkMode ? "bg-[#071022] text-white" : "bg-white text-gray-900";

  return (
    <div className={`${root} w-[794px] min-h-[1123px] p-8 font-inter`}>
      <div className="flex gap-6">
        {/* Left gradient bar */}
        <div style={{ width: 140 }} className="shrink-0">
          <div
            className="h-full rounded-lg p-4 flex flex-col justify-start"
            style={{ background: `linear-gradient(180deg, ${accentColor}, #6d28d9)` }}
          >
            <div className="text-lg font-bold">{data.personal_info?.full_name}</div>
            <div className="text-xs mt-2 opacity-80">{data.personal_info?.profession}</div>
            <div className="mt-4 text-xs opacity-80">{data.personal_info?.email}</div>
            <div className="mt-2 text-xs opacity-80">{data.personal_info?.phone}</div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Skills</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.isArray(data.skills) && data.skills.length ? data.skills.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 bg-white/20 rounded">{s}</span>)) : <div className="opacity-70">Add skills</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white/5 p-6 rounded-lg">
          <section>
            <h3 className="text-sm font-semibold" style={{ color: accentColor }}>Profile</h3>
            <p className="mt-2 text-sm">{data.professional_summary}</p>
          </section>

          <section className="mt-4">
            <h3 className="text-sm font-semibold" style={{ color: accentColor }}>Experience</h3>
            <div className="mt-3 space-y-4">
              {Array.isArray(data.experience) && data.experience.length ? data.experience.map((e,i)=>(<div key={i}><div className="font-semibold">{e.title}</div><div className="text-xs opacity-70">{e.company}</div><p className="mt-1 text-sm">{e.summary}</p></div>)) : <div className="opacity-60">Add experience</div>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

CreativeGradientTemplate.propTypes = {
  data: PropTypes.object,
  accentColor: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default CreativeGradientTemplate;
