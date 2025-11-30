// src/components/templates/MinimalTemplate.jsx
import React from "react";
import PropTypes from "prop-types";

const MinimalTemplate = ({ data = {}, accentColor = "#065F46", darkMode = false }) => {
  const bg = darkMode ? "bg-[#0b0c0f] text-white" : "bg-white text-gray-900";

  return (
    <div className={`${bg} w-[794px] min-h-[1123px] p-12 font-serif`}>
      <div className="max-w-[680px] mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold">{data.personal_info?.full_name || "Your Name"}</h1>
          <div className="mt-2 text-sm opacity-80">{data.personal_info?.profession} • {data.personal_info?.location}</div>
        </header>

        <section className="mb-8">
          <h4 className="text-sm font-medium" style={{ color: accentColor }}>Profile</h4>
          <p className="mt-2 text-base leading-relaxed">{data.professional_summary || "Concise summary."}</p>
        </section>

        <section className="mb-8">
          <h4 className="text-sm font-medium" style={{ color: accentColor }}>Experience</h4>
          <div className="mt-4 space-y-6">
            {Array.isArray(data.experience) && data.experience.length ? data.experience.map((e,i)=>(
              <div key={i}>
                <div className="font-semibold">{e.title} — <span className="font-normal opacity-70">{e.company}</span></div>
                <div className="text-sm opacity-60">{e.startDate} — {e.endDate || "Present"}</div>
                <p className="text-sm mt-2">{e.summary || e.description}</p>
              </div>
            )) : <div className="opacity-60">Add experience</div>}
          </div>
        </section>

        <section className="mb-8">
          <h4 className="text-sm font-medium" style={{ color: accentColor }}>Education</h4>
          <div className="mt-3 space-y-3 text-sm">
            {Array.isArray(data.education) && data.education.length ? data.education.map((ed,i)=>(
              <div key={i}><div className="font-medium">{ed.degree}</div><div className="opacity-70">{ed.institute} • {ed.year}</div></div>
            )) : <div className="opacity-60">Add education</div>}
          </div>
        </section>

        <footer>
          <div className="text-sm font-medium" style={{ color: accentColor }}>Skills</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.isArray(data.skills) && data.skills.length ? data.skills.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 border rounded">{s}</span>)) : <div className="opacity-60">Add skills</div>}
          </div>
        </footer>
      </div>
    </div>
  );
};

MinimalTemplate.propTypes = {
  data: PropTypes.object,
  accentColor: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default MinimalTemplate;
