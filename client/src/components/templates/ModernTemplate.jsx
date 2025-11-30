// src/components/templates/ModernTemplate.jsx
import React from "react";
import PropTypes from "prop-types";

const ModernTemplate = ({ data = {}, accentColor = "#7C3AED", darkMode = false }) => {
  const root = darkMode ? "bg-[#08070b] text-white" : "bg-white text-gray-900";
  return (
    <div className={`${root} w-[794px] min-h-[1123px] p-8 font-inter`}>
      <div className="grid grid-cols-3 gap-6">
        {/* Left narrow column (contact + skills) */}
        <div className="col-span-1">
          <div className="p-4 rounded-lg" style={{ background: darkMode ? "#0b0b0f" : "#f8fafc" }}>
            <div className="text-sm font-semibold mb-2" style={{ color: accentColor }}>Contact</div>
            <div className="text-sm opacity-80">{data.personal_info?.email}</div>
            <div className="text-sm opacity-80">{data.personal_info?.phone}</div>
            <div className="mt-4 text-sm font-semibold" style={{ color: accentColor }}>Skills</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.isArray(data.skills) && data.skills.length ? data.skills.map((s,i)=>(
                <span key={i} className="text-xs px-2 py-1 rounded" style={{ background: darkMode ? "#111" : "#fff" }}>{s}</span>
              )) : <div className="text-sm opacity-60">Add skills</div>}
            </div>
          </div>
        </div>

        {/* Right wide column */}
        <div className="col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{data.personal_info?.full_name || "Your Name"}</h1>
              <div className="text-sm opacity-80">{data.personal_info?.profession}</div>
            </div>
            <div className="text-right">
              <div className="px-3 py-2 rounded" style={{ background: accentColor, color: "#fff" }}>{data.personal_info?.location}</div>
            </div>
          </div>

          <section className="mt-6">
            <h3 className="font-semibold" style={{ color: accentColor }}>Profile</h3>
            <p className="mt-2 text-sm opacity-90">{data.professional_summary || "Short profile paragraph."}</p>
          </section>

          <section className="mt-6">
            <h3 className="font-semibold" style={{ color: accentColor }}>Experience</h3>
            <div className="mt-3 space-y-4">
              {Array.isArray(data.experience) && data.experience.length ? data.experience.map((e,i)=>(
                <div key={i} className="flex justify-between">
                  <div>
                    <div className="font-semibold">{e.title}</div>
                    <div className="text-xs opacity-70">{e.company}</div>
                  </div>
                  <div className="text-xs opacity-60">{e.startDate} — {e.endDate || "Present"}</div>
                </div>
              )) : <div className="opacity-60">Add experience</div>}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="font-semibold" style={{ color: accentColor }}>Education</h3>
            <div className="mt-2 space-y-2 text-sm">
              {Array.isArray(data.education) && data.education.length ? data.education.map((ed,i)=>(
                <div key={i}><div className="font-medium">{ed.degree}</div><div className="opacity-70 text-xs">{ed.institute} • {ed.year}</div></div>
              )) : <div className="opacity-60">Add education</div>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

ModernTemplate.propTypes = {
  data: PropTypes.object,
  accentColor: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default ModernTemplate;
