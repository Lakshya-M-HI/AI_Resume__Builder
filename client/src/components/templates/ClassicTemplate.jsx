// src/components/templates/ClassicTemplate.jsx
import React from "react";
import PropTypes from "prop-types";

const ClassicTemplate = ({ data = {}, accentColor = "#2563EB", darkMode = false }) => {
  const rootBg = darkMode ? "bg-[#0f1724] text-white" : "bg-white text-gray-900";
  const sectionTitle = darkMode ? "text-white/85" : "text-gray-800";

  return (
    <div className={`${rootBg} w-[794px] min-h-[1123px] p-8 font-sans`}>
      {/* Header */}
      <header className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold leading-tight">{data.personal_info?.full_name || "Your Name"}</h1>
          <div className="mt-1 text-sm opacity-80">
            {data.personal_info?.profession || "Profession"} • {data.personal_info?.location || ""}
          </div>
        </div>

        <div className="text-right text-sm">
          <div>{data.personal_info?.email || ""}</div>
          <div>{data.personal_info?.phone || ""}</div>
          {data.personal_info?.website && <div>{data.personal_info.website}</div>}
        </div>
      </header>

      <div className="flex gap-8">
        {/* Left column */}
        <div className="w-2/3 pr-4">
          {/* Summary */}
          <section className="mb-5">
            <h3 className={`text-sm font-semibold ${sectionTitle}`} style={{ color: accentColor }}>Summary</h3>
            <p className="mt-2 text-sm leading-relaxed">
              {data.professional_summary || "Concise professional summary that highlights achievements, years of experience and top skills."}
            </p>
          </section>

          {/* Experience */}
          <section className="mb-5">
            <h3 className={`text-sm font-semibold ${sectionTitle}`} style={{ color: accentColor }}>Experience</h3>
            <div className="mt-2 space-y-4">
              {Array.isArray(data.experience) && data.experience.length ? data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-semibold">{exp.title || exp.role || "Job Title"}</div>
                      <div className="text-xs opacity-75">{exp.company || exp.organization} • {exp.location || ""}</div>
                    </div>
                    <div className="text-xs opacity-60">{exp.startDate || exp.from} — {exp.endDate || exp.to || "Present"}</div>
                  </div>
                  <p className="text-sm mt-1 text-gray-700 dark:text-gray-200">{exp.summary || exp.description || ""}</p>
                </div>
              )) : (
                <div className="text-sm opacity-60">Add professional experience entries.</div>
              )}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-5">
            <h3 className={`text-sm font-semibold ${sectionTitle}`} style={{ color: accentColor }}>Projects</h3>
            <div className="mt-2 space-y-3">
              {Array.isArray(data.project) && data.project.length ? data.project.map((p, i) => (
                <div key={i}>
                  <div className="text-sm font-medium">{p.title || p.name}</div>
                  <div className="text-xs opacity-70">{p.role || ""}</div>
                  <p className="text-sm mt-1">{p.summary || p.description || ""}</p>
                </div>
              )) : <div className="text-sm opacity-60">Add projects</div>}
            </div>
          </section>
        </div>

        {/* Right column */}
        <aside className="w-1/3 pl-4 border-l border-gray-200 dark:border-gray-700">
          {/* Education */}
          <section className="mb-6">
            <h4 className={`text-sm font-semibold ${sectionTitle}`} style={{ color: accentColor }}>Education</h4>
            <div className="mt-2 space-y-3 text-sm">
              {Array.isArray(data.education) && data.education.length ? data.education.map((ed, i) => (
                <div key={i}>
                  <div className="font-medium">{ed.degree || ed.course || "Degree"}</div>
                  <div className="opacity-70 text-xs">{ed.institute || ed.school} • {ed.year || ed.graduationYear}</div>
                </div>
              )) : <div className="opacity-60">Add education</div>}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h4 className={`text-sm font-semibold ${sectionTitle}`} style={{ color: accentColor }}>Skills</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.isArray(data.skills) && data.skills.length ? data.skills.map((s, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-gray-100/60 dark:bg-white/6 rounded">{s}</span>
              )) : <div className="opacity-60 text-sm">Add skills</div>}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

ClassicTemplate.propTypes = {
  data: PropTypes.object,
  accentColor: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default ClassicTemplate;
