// src/components/templates/TwoColumnPremiumTemplate.jsx
import React from "react";
import PropTypes from "prop-types";

const TwoColumnPremiumTemplate = ({ data = {}, accentColor = "#2563EB", darkMode = false }) => {
  const bg = darkMode ? "bg-[#071026] text-white" : "bg-white text-gray-900";

  return (
    <div className={`${bg} w-[794px] min-h-[1123px] p-8 font-sans`}>
      <div className="grid grid-cols-3 gap-6">
        {/* Left */}
        <div className="col-span-1">
          <div className="p-4 rounded-lg border" style={{ borderColor: `${accentColor}33` }}>
            <h2 className="text-lg font-bold">{data.personal_info?.full_name}</h2>
            <div className="text-sm opacity-80">{data.personal_info?.profession}</div>

            <div className="mt-4">
              <div className="text-xs font-semibold" style={{ color: accentColor }}>Contact</div>
              <div className="mt-2 text-sm opacity-80">{data.personal_info?.email}</div>
              <div className="text-sm opacity-80">{data.personal_info?.phone}</div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold" style={{ color: accentColor }}>Skills</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.isArray(data.skills) && data.skills.length ? data.skills.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 bg-gray-100/60 rounded">{s}</span>)) : <div className="opacity-60">Add skills</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-2">
          <section>
            <h3 className="text-xl font-bold" style={{ color: accentColor }}>{data.personal_info?.full_name || "Your Name"}</h3>
            <p className="text-sm opacity-80">{data.personal_info?.profession}</p>
          </section>

          <section className="mt-4">
            <h4 className="text-sm font-semibold" style={{ color: accentColor }}>Summary</h4>
            <p className="mt-2 text-sm">{data.professional_summary}</p>
          </section>

          <section className="mt-6">
            <h4 className="text-sm font-semibold" style={{ color: accentColor }}>Experience</h4>
            <div className="mt-3 space-y-4">
              {Array.isArray(data.experience) && data.experience.length ? data.experience.map((e,i)=>(<div key={i}><div className="flex justify-between"><div className="font-semibold">{e.title}</div><div className="text-xs opacity-60">{e.startDate}—{e.endDate || "Present"}</div></div><div className="text-sm opacity-80">{e.summary}</div></div>)) : <div className="opacity-60">Add experience</div>}
            </div>
          </section>

          <section className="mt-6">
            <h4 className="text-sm font-semibold" style={{ color: accentColor }}>Education</h4>
            <div className="mt-2 space-y-2">
              {Array.isArray(data.education) && data.education.length ? data.education.map((ed,i)=>(<div key={i}><div className="font-medium">{ed.degree}</div><div className="text-xs opacity-70">{ed.institute} • {ed.year}</div></div>)) : <div className="opacity-60">Add education</div>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

TwoColumnPremiumTemplate.propTypes = {
  data: PropTypes.object,
  accentColor: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default TwoColumnPremiumTemplate;
