// src/components/templates/MinimalImageTemplate.jsx
import React from "react";
import PropTypes from "prop-types";

const MinimalImageTemplate = ({ data = {}, accentColor = "#3B006E", darkMode = false }) => {
  const bg = darkMode ? "bg-[#0b0b0f] text-white" : "bg-white text-gray-900";
  const imgUrl = typeof data.personal_info?.image === "string" ? data.personal_info.image : null;

  return (
    <div className={`${bg} w-[794px] min-h-[1123px] p-10 font-sans`}>
      <div className="flex gap-6">
        <div style={{ width: 220 }}>
          <div className="rounded-xl overflow-hidden w-44 h-44 bg-gray-100 dark:bg-gray-800">
            {imgUrl ? <img src={imgUrl} alt="profile" className="w-full h-full object-cover" /> : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">Photo</div>
            )}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold">{data.personal_info?.full_name}</h2>
            <div className="text-sm opacity-70">{data.personal_info?.profession}</div>
            <div className="text-sm opacity-70 mt-2">{data.personal_info?.email}</div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium" style={{ color: accentColor }}>Skills</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.isArray(data.skills) && data.skills.length ? data.skills.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 bg-gray-100/50 rounded">{s}</span>)) : <div className="opacity-60">Add skills</div>}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <section>
            <h4 className="text-sm font-medium" style={{ color: accentColor }}>Profile</h4>
            <p className="mt-2">{data.professional_summary}</p>
          </section>

          <section className="mt-4">
            <h4 className="text-sm font-medium" style={{ color: accentColor }}>Experience</h4>
            <div className="mt-3 space-y-3">
              {Array.isArray(data.experience) && data.experience.length ? data.experience.map((e,i)=>(<div key={i}><div className="font-semibold">{e.title}</div><div className="text-xs opacity-70">{e.company}</div><p className="mt-1 text-sm">{e.summary}</p></div>)) : <div className="opacity-60">Add experience</div>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

MinimalImageTemplate.propTypes = {
  data: PropTypes.object,
  accentColor: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default MinimalImageTemplate;
