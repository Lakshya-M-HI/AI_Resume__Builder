import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import html2pdf from "html2pdf.js";
import { Download, Moon, Sun, Smartphone, Monitor, ZoomIn, ZoomOut } from "lucide-react";


const sectionsList = [
  { id: 'personal', name: 'Personal Info', icon: User },
  { id: 'summary', name: 'Summary', icon: FileText },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'projects', name: 'Projects', icon: FolderIcon },
  { id: 'skills', name: 'Skills', icon: Sparkles },
]

const AI_ResumeBuilder = () => {


  const [scale, setScale] = useState(1);
  const [device, setDevice] = useState("desktop");
  const [darkMode, setDarkMode] = useState(false);


  // ⭐ STEP 4 — PDF EXPORT FUNCTION GOES HERE
  const exportPDF = () => {
    const resume = document.getElementById("resume-preview");

    const opt = {
      margin: 0,
      filename: `${resumeData.title || "resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 5, useCORS: true },
      jsPDF: { unit: "px", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(resume).save();
  };


  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const activeSection = sectionsList[activeSectionIndex]

  // Load existing resume if resumeId matches dummy data
  useEffect(() => {
    if (!resumeId) return
    const found = dummyResumeData.find(r => r._id === resumeId)
    if (found) {
      // Defer the state update to avoid a synchronous setState inside the effect,
      // which can cause cascading renders; also update document title alongside.
      setTimeout(() => {
        setResumeData(found)
        document.title = found.title || 'Resume Builder'
      }, 0)
    }
  }, [resumeId])

  const goPrev = () => setActiveSectionIndex(i => Math.max(i - 1, 0))
  const goNext = () => setActiveSectionIndex(i => Math.min(i + 1, sectionsList.length - 1))

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0A0212] via-black to-[#0A0212] text-white px-6 py-8">

      {/* Back Button */}
      <Link
        to="/app"
        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition mb-6"
      >
        <ArrowLeftIcon className="size-4" /> Back to Dashboard
      </Link>

      <div className="flex gap-6">

        {/* -------------------------------- */}
        {/* LEFT SIDEBAR  */}
        {/* -------------------------------- */}
        <aside className="w-72 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-lg">

          {/* Resume Title */}
          <h1 className="text-xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {resumeData.title || "Untitled Resume"}
          </h1>

          {/* Template Selector */}
          <div className="mt-4">
            <TemplateSelector
              selectedTemplate={resumeData.template}
              onChange={(template) =>
                setResumeData((prev) => ({ ...prev, template }))
              }
            />
          </div>

          {/* Section Navigation */}
          <div className="mt-8 space-y-2">
            {sectionsList.map((s, idx) => {
              const active = idx === activeSectionIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSectionIndex(idx)}
                  className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${active
                      ? "bg-linear-to-r from-purple-600/70 to-indigo-600/70 border border-white/20 shadow-lg"
                      : " hover:bg-white/10"
                    }
                `}
                >
                  <s.icon size={16} />
                  {s.name}
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center gap-1 disabled:opacity-40"
              disabled={activeSectionIndex === 0}
              onClick={goPrev}
            >
              <ChevronLeft size={18} /> Prev
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition flex items-center gap-1 disabled:opacity-40"
              disabled={activeSectionIndex === sectionsList.length - 1}
              onClick={goNext}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </aside>

        {/* -------------------------------- */}
        {/* MAIN PANEL — FORM + PREVIEW */}
        {/* -------------------------------- */}
        <main className="flex-1 flex gap-6">

          {/* LEFT FORM PANEL */}
          <section className="flex-1 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-lg">

            <header className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {activeSection?.name}
              </h2>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-purple-500"
                  checked={removeBackground}
                  onChange={(e) => setRemoveBackground(e.target.checked)}
                />
                Remove BG
              </label>
            </header>

            {/* Render Forms */}
            <div className="space-y-4">
              {activeSection?.id === "personal" && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personal_info: data,
                    }))
                  }
                />
              )}

              {activeSection?.id === "summary" && (
                <textarea
                  rows={6}
                  className="w-full p-4 rounded-xl bg-black/20 border border-white/20 text-white placeholder-slate-300 focus:ring-2 ring-purple-500 transition"
                  placeholder="Write your professional summary…"
                  value={resumeData.professional_summary}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      professional_summary: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          </section>

          {/* RIGHT PREVIEW PANEL */}
          <aside className="w-[430px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

            {/* ====== STEP 1 TOOLBAR GOES HERE ====== */}
            <div className="flex items-center justify-between mb-4">

              {/* Left controls */}
              <div className="flex items-center gap-3">

                {/* Zoom Out */}
                <button onClick={() => setScale(s => Math.max(0.6, s - 0.1))} className="glass-btn">
                  <ZoomOut className="size-4" />
                </button>

                {/* Zoom In */}
                <button onClick={() => setScale(s => Math.min(1.4, s + 0.1))} className="glass-btn">
                  <ZoomIn className="size-4" />
                </button>

                {/* Desktop */}
                <button onClick={() => setDevice("desktop")}
                  className={`glass-btn ${device === "desktop" ? "active-btn" : ""}`}>
                  <Monitor className="size-4" />
                </button>

                {/* Mobile */}
                <button onClick={() => setDevice("mobile")}
                  className={`glass-btn ${device === "mobile" ? "active-btn" : ""}`}>
                  <Smartphone className="size-4" />
                </button>

              </div>

              {/* Right controls */}
              <div className="flex items-center gap-3">

                {/* Dark/Light mode */}
                <button onClick={() => setDarkMode(d => !d)} className="glass-btn">
                  {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </button>

                {/* Export */}
                <button onClick={exportPDF}
                  className="glass-btn bg-purple-600 text-white hover:bg-purple-700">
                  <Download className="size-4" />
                </button>
              </div>
            </div>
            {/* ===== END TOOLBAR ===== */}

            {/* Resume Container */}
            <div className="rounded-xl overflow-hidden">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                scale={scale}
                device={device}
                darkMode={darkMode}
              />

            </div>

          </aside>

        </main>
      </div>
    </div>
  )
}

export default AI_ResumeBuilder;