import React from "react";
import { Link } from "react-router-dom";
import Feature from "./Feature";

const Hero = () => {
  // ----- Resume title state -----
  const [resumeTitle, setResumeTitle] = React.useState("");

  // ----- Typing-placeholder + cursor -----
  const typingList = [
    "Frontend Developer Resume",
    "Full-Stack Engineer Resume",
    "UI/UX Designer Resume",
    "Data Analyst Resume",
    "Product Manager Resume",
    "Software Engineer (Fresher)",
  ];
  const [text, setText] = React.useState("");
  const [cursorVisible, setCursorVisible] = React.useState(true);
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // blinking cursor
  React.useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  // typing effect (updates `text`)
  React.useEffect(() => {
    const current = typingList[wordIndex];
    const delay = isDeleting ? 40 : 70;

    const t = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setText(current.substring(0, Math.max(0, charIndex - 1)));
        setCharIndex((c) => c - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((w) => (w + 1) % typingList.length);
        }
      }
    }, delay);

    return () => clearTimeout(t);
    // charIndex intentionally included
  }, [charIndex, isDeleting, wordIndex]);

  // ----- Suggestions (client fallback) -----
  const fallbackPool = [
    "Frontend Developer Resume",
    "React Developer Resume",
    "Next.js Engineer Resume",
    "Full-Stack Engineer Resume",
    "Backend Developer Resume",
    "Data Scientist Resume",
    "Machine Learning Engineer Resume",
    "DevOps Engineer Resume",
    "Cloud Engineer Resume",
    "Product Manager Resume",
    "Project Manager Resume",
    "UI/UX Designer Resume",
    "Graphic Designer Resume",
    "Marketing Manager Resume",
    "SEO Specialist Resume",
    "Business Analyst Resume",
    "Data Analyst Resume",
    "QA Engineer Resume",
    "SRE Resume",
    "Mobile Developer (iOS) Resume",
    "Mobile Developer (Android) Resume",
    "Embedded Systems Engineer Resume",
    "Electrical Engineer Resume",
    "Mechanical Engineer Resume",
    "HR Manager Resume",
    "Sales Manager Resume",
    "Customer Success Resume",
    "Finance Analyst Resume",
    "Accountant Resume",
    "Cybersecurity Engineer Resume",
    "Blockchain Developer Resume",
    "AI Researcher Resume",
    "Full-Stack (MERN) Resume",
    "Software Engineer (Fresher)",
  ];

  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
  const [activeSuggestion, setActiveSuggestion] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(false);

  // debounce ref
  const debounceRef = React.useRef(null);

  // call API (optional) - falls back to local pool if API fails or absent
  const fetchSuggestions = async (q) => {
    if (!q || q.trim().length === 0) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const url = `/api/suggest?text=${encodeURIComponent(q)}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("API error");
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setFilteredSuggestions(data.slice(0, 8));
            setActiveSuggestion(0);
            setShowSuggestions(true);
          } else {
            const fallback = fallbackPool
              .filter((s) => s.toLowerCase().includes(q.toLowerCase()))
              .slice(0, 8);
            setFilteredSuggestions(fallback);
            setActiveSuggestion(0);
            setShowSuggestions(fallback.length > 0);
          }
        } catch (err) {
          const fallback = fallbackPool
            .filter((s) => s.toLowerCase().includes(q.toLowerCase()))
            .slice(0, 8);
          setFilteredSuggestions(fallback);
          setActiveSuggestion(0);
          setShowSuggestions(fallback.length > 0);
          console.log(err)
        }
      }, 300);
    } catch (e) {
      // ignore
      console.log(e)
    }
  };

  // input change handler (also triggers suggestions)
  const handleInputChange = (e) => {
    const val = e.target.value;
    setResumeTitle(val);
    setIsTyping(true);
    fetchSuggestions(val);
  };

  // keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((a) => (a + 1) % filteredSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((a) => (a - 1 < 0 ? filteredSuggestions.length - 1 : a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSuggestions[activeSuggestion]) {
        setResumeTitle(filteredSuggestions[activeSuggestion]);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (s) => {
    setResumeTitle(s);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (resumeTitle.trim()) {
      fetchSuggestions(resumeTitle);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 140);
  };

  // popular chips
  const popular = ["Software Engineer", "Frontend Developer", "Product Manager", "Data Analyst", "UI/UX Designer"];
  const handleChipClick = (c) => {
    const title = `${c} Resume`;
    setResumeTitle(title);
    fetchSuggestions(title);
  };

  // create button animation state
  const [creating, setCreating] = React.useState(false);
  const createTimeoutRef = React.useRef(null);
  const handleCreate = () => {
    if (!resumeTitle.trim()) return;
    setCreating(true);
    if (createTimeoutRef.current) clearTimeout(createTimeoutRef.current);
    createTimeoutRef.current = setTimeout(() => setCreating(false), 1400);
    console.log("Create resume for:", resumeTitle);
    // TODO: integrate create API
  };

  // icon selector for suggestion list
  const iconFor = (s) => {
    s = s.toLowerCase();
    if (s.includes("design") || s.includes("ux") || s.includes("ui")) return "design";
    if (s.includes("data") || s.includes("analyst") || s.includes("scientist")) return "data";
    if (s.includes("dev") || s.includes("engineer") || s.includes("full-stack") || s.includes("frontend") || s.includes("backend") || s.includes("react") || s.includes("node")) return "code";
    if (s.includes("product") || s.includes("manager")) return "brief";
    if (s.includes("devops") || s.includes("cloud") || s.includes("sre")) return "cloud";
    return "file";
  };

  // small svg icon component
  const Icon = ({ name }) => {
    switch (name) {
      case "design":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 19l7-12H5l7 12z" />
            <path d="M12 7v6" />
          </svg>
        );
      case "data":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="3" width="18" height="6" rx="1" />
            <rect x="6" y="13" width="12" height="6" rx="1" />
            <path d="M9 8v8" />
          </svg>
        );
      case "cloud":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 17.58A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 4 16.25" />
          </svg>
        );
      case "brief":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        );
      case "code":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M16 18l6-6-6-6" />
            <path d="M8 6l-6 6 6 6" />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M14 2H6a2 2 0 0 0-2 2v16l4-3h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
            <path d="M14 2v6h6" />
          </svg>
        );
    }
  };

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap");
        * { font-family: "Poppins", sans-serif; }

        /* CTA gradient (ai-cta-btn) */
        .ai-cta-btn {
          background: linear-gradient(135deg, #7C3AED, #4F46E5, #06B6D4);
          background-size: 200% 200%;
          animation: ctaFlow 5s ease infinite;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 6px 18px rgba(88,28,135,0.18), 0 3px 8px rgba(6,182,212,0.12);
        }
        .ai-cta-btn:hover { transform: translateY(-2px) scale(1.02); background-position: 100% 0%; }

        @keyframes ctaFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* gemini border (animated multi-color rim) */
        .gemini-border { position: relative; border-radius: 14px; padding: 2px; background: transparent; }
        .gemini-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(90deg,#8B5CF6,#3B82F6,#06B6D4,#10B981,#F59E0B,#EF4444,#8B5CF6);
          background-size: 300% 100%;
          animation: geminiGlow 5s linear infinite;
          z-index: 1;
          filter: blur(8px);
          opacity: 0.95;
        }
        @keyframes geminiGlow { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
        .gemini-inner { position: relative; z-index: 2; border-radius: 12px; background: rgba(20,20,35,0.85); backdrop-filter: blur(10px); padding: 10px 14px; display:flex; align-items:center; border:1px solid rgba(255,255,255,0.08); }

        /* active input glow */
        .input-active .gemini-inner { box-shadow: 0 10px 50px rgba(124,58,237,0.14), inset 0 1px 0 rgba(255,255,255,0.02); transform: translateZ(0); transition: box-shadow 200ms ease; }

        /* placeholder neon */
        .ai-input::placeholder { color: rgba(233,213,255,0.88); opacity:1; }

        /* tiny ai spark animation */
        .ai-spark svg { transform-origin: center; animation: sparkBounce 2.6s ease-in-out infinite; filter: drop-shadow(0 6px 14px rgba(139,92,246,0.12)); }
        @keyframes sparkBounce { 0% { transform: translateY(0) scale(1); } 50% { transform: translateY(-3px) scale(1.03); } 100% { transform: translateY(0) scale(1); } }

        /* suggestions dropdown */
        ul[role="listbox"] { list-style:none; margin:0; padding:8px; border-radius:10px; box-shadow: 0 8px 30px rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.04); }
        ul[role="listbox"]::-webkit-scrollbar { width:8px; }
        ul[role="listbox"]::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius:999px; }

        .suggest-item { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px; cursor:pointer; color:#eef2ff; }
        .suggest-item:hover { background: rgba(255,255,255,0.03); }
        .suggest-active { background: rgba(255,255,255,0.06); }

        /* popular chips */
        .chip { display:inline-flex; gap:8px; align-items:center; padding:6px 10px; border-radius:999px; background:rgba(255,255,255,0.03); color:#fff; cursor:pointer; border:1px solid rgba(255,255,255,0.04); }
        .chip:hover { transform:translateY(-3px); box-shadow:0 8px 30px rgba(124,58,237,0.08); }

        /* create button spark on click */
        .creating { animation: createPulse 1.2s ease; }
        @keyframes createPulse { 0% { transform:scale(1); box-shadow:0 6px 18px rgba(124,58,237,0.12);} 50% { transform:scale(1.03); box-shadow:0 18px 48px rgba(124,58,237,0.22);} 100% { transform:scale(1); box-shadow:0 6px 18px rgba(124,58,237,0.12);} }

        /* responsive tweaks */
        @media (max-width:640px) {
          .gemini-inner { padding:8px 10px; }
        }
      `}</style>

      <section className="flex flex-col items-center bg-linear-to-b from-black to-[#2A0054] text-white px-4 pb-10">
        {/* NAV */}
        <nav className="flex items-center justify-between py-3 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
          <Link to="/" className="flex items-center gap-3">
            {/* Animated RV monogram (glowing rim + RV text) */}
            <img src="/logo.svg" alt="logo" />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <button className="bg-transparent text-gray-200 hover:text-white">Templates</button>
            <button className="bg-transparent text-gray-200 hover:text-white">Features</button>
            <Link to="/app"><button className="ai-cta-btn text-white px-4 py-2 rounded-full">Get Started</button></Link>
          </div>

          <div className="md:hidden">
            <button className="bg-gray-900 p-2 rounded-md">≡</button>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="flex items-center mt-20 mx-auto lg:mx-0">
          <div className="flex -space-x-3 pr-3">
            {/* Avatar svgs (replaced images) */}
            <svg className="w-10 h-10 object-cover rounded-full border-2 border-white transform hover:-translate-y-0.5 transition z-1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs><linearGradient id="a1" x1="0" x2="1"><stop offset="0" stopColor="#7C3AED" /><stop offset="1" stopColor="#06B6D4" /></linearGradient></defs>
              <circle cx="16" cy="16" r="15" fill="url(#a1)" />
              <path d="M10 21c1.8-2 4.4-3 6-3s4.2 1 6 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="12.5" cy="13" r="1.6" fill="#fff" />
              <circle cx="19.5" cy="13" r="1.6" fill="#fff" />
            </svg>

            <svg className="w-10 h-10 object-cover rounded-full border-2 border-white transform hover:-translate-y-0.5 transition z-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs><linearGradient id="a2" x1="0" x2="1"><stop offset="0" stopColor="#10B981" /><stop offset="1" stopColor="#4F46E5" /></linearGradient></defs>
              <rect x="1" y="1" width="30" height="30" rx="6" fill="url(#a2)" />
              <g transform="translate(6 6)" fill="#fff" opacity="0.95">
                <rect x="0" y="0" width="4" height="4" rx="1" />
                <rect x="6" y="0" width="10" height="10" rx="2" />
                <rect x="0" y="12" width="14" height="4" rx="1" />
              </g>
            </svg>

            <svg className="w-10 h-10 object-cover rounded-full border-2 border-white transform hover:-translate-y-0.5 transition z-3" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs><linearGradient id="a3" x1="0" x2="1"><stop offset="0" stopColor="#F59E0B" /><stop offset="1" stopColor="#EF4444" /></linearGradient></defs>
              <circle cx="16" cy="16" r="15" fill="url(#a3)" />
              <g fill="#fff" opacity="0.95">
                <rect x="8" y="8" width="16" height="4" rx="1" />
                <rect x="8" y="14" width="10" height="10" rx="2" />
              </g>
            </svg>
          </div>

          <div className="ml-4">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-transparent fill-[#FF8F20]" aria-hidden>
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              ))}
            </div>
            <p className="text-xs text-gray-200">Trusted by 25,000+ professionals</p>
          </div>
        </div>

        <h1 className="text-[34px] md:text-6xl font-semibold text-center max-w-[840px] mt-6 bg-linear-to-r from-white to-[#5D009F] text-transparent bg-clip-text">
          Advanced AI Resume Builder — Create Tailored, ATS-Friendly Resumes in Minutes
        </h1>

        <p className="text-gray-200 text-sm max-md:px-2 text-center max-w-sm mt-3">
          Generate optimized resumes, tailored cover letters, and LinkedIn summaries with AI that matches your target job.
        </p>

        {/* INPUT AREA */}
        <div className="mt-8 w-full max-w-lg">
          <div className={`relative w-full ${isTyping || showSuggestions ? "input-active" : ""}`}>
            <div className="gemini-border mx-auto">
              <div className="gemini-inner" style={{ alignItems: "center" }}>
                {/* search icon */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='text-gray-300 shrink-0' aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg> */}

                {/* AI spark */}
                <div className="ai-spark" style={{ marginRight: 10 }} aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <defs><linearGradient id="coreMobileGradInner" x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor="#7b1fa2" /><stop offset="60%" stopColor="#d63384" /><stop offset="100%" stopColor="#ff77b6" /></linearGradient></defs>
                    <circle cx="12" cy="12" r="5" fill="url(#coreMobileGradInner)" />
                    <path d="M12 2 L12 6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M12 18 L12 22" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M2 12 L6 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M18 12 L22 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* input with typing placeholder */}
                <input
                  className="ai-input px-3 w-full h-11 outline-none text-white bg-transparent rounded-md placeholder:text-transparent"
                  type="text"
                  placeholder={`${text}${cursorVisible ? "│" : ""}`}
                  value={resumeTitle}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  aria-label="Resume title"
                  style={{ caretColor: "#E9D5FF" }}
                />

                <button
                  type="button"
                  onClick={handleCreate}
                  className={`ml-2 cursor-pointer inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white font-semibold ai-cta-btn ${creating ? "creating" : ""}`}
                  aria-label="Create resume"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90" aria-hidden>
                    <path d="M12 2v6" />
                    <path d="M12 22v-6" />
                    <path d="M4.93 4.93l4.24 4.24" />
                    <path d="M14.83 14.83l4.24 4.24" />
                    <path d="M2 12h6" />
                    <path d="M22 12h-6" />
                  </svg>
                  {creating ? "Creating..." : "Create Resume"}
                </button>
              </div>
            </div>

            {/* suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul
                role="listbox"
                aria-label="Resume title suggestions"
                className="absolute left-0 right-0 mt-2 z-50 bg-linear-to-b from-[#0b0220]/80 to-[#17042a]/80 backdrop-blur rounded-md p-1"
                style={{ maxHeight: 220, overflowY: "auto" }}
              >
                {filteredSuggestions.map((s, idx) => (
                  <li
                    key={s}
                    role="option"
                    aria-selected={activeSuggestion === idx}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSuggestionClick(s)}
                    className={`suggest-item ${activeSuggestion === idx ? "suggest-active" : ""}`}
                  >
                    <span style={{ width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#EDE9FE" }}>
                      <Icon name={iconFor(s)} />
                    </span>
                    <span className="text-sm" style={{ color: "#EDE9FE" }}>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* popular chips */}
          <div className="mt-3 flex flex-wrap gap-3">
            {popular.map((c) => (
              <button key={c} onClick={() => handleChipClick(c)} className="chip text-sm">
                {c}
              </button>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-gray-200 text-xs">50,000+ resumes created and growing every day</p>
            <p className="text-xs text-gray-300">Tip: Use role + key skills for better tailoring</p>
          </div>
        </div>

        {/* features cards (using the SVGs you provided) */}
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-0 mt-14">
          <div className="bg-linear-to-b from-[#2A0150] to-[#090025] hover:-translate-y-1 transition duration-300 border border-violet-900 rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              {/* ATS-Optimized Templates SVG */}
              <svg className="w-12 h-12" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs><linearGradient id="ats1" x1="0" x2="1"><stop offset="0" stopColor="#7C3AED" /><stop offset="1" stopColor="#4F46E5" /></linearGradient></defs>
                <rect x="6" y="8" width="36" height="48" rx="3" fill="#0e0620" stroke="url(#ats1)" strokeWidth="2" />
                <path d="M14 18h22M14 26h22M14 34h14" stroke="#cbd5ff" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M44 44l5 5 9-13" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <button className="bg-purple-950 text-xs text-slate-50 rounded-full px-4 py-2">Popular</button>
            </div>
            <p className="text-lg text-gray-50">ATS-Optimized Templates</p>
            <p className="text-sm text-gray-200">Choose from interview-tested resume templates that pass Applicant Tracking Systems.</p>
          </div>

          <div className="bg-linear-to-b from-[#2A0150] to-[#090025] hover:-translate-y-1 transition duration-300 border border-violet-900 rounded-lg p-6 space-y-4">
            {/* AI Job-Description Tailoring SVG */}
            <svg className="w-12 h-12" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs><linearGradient id="tail1" x1="0" x2="1"><stop offset="0" stopColor="#06B6D4" /><stop offset="1" stopColor="#10B981" /></linearGradient></defs>
              <rect x="6" y="8" width="36" height="48" rx="3" fill="#071026" stroke="url(#tail1)" strokeWidth="2" />
              <circle cx="46" cy="20" r="9" fill="#0b1226" stroke="#7C3AED" strokeWidth="1.8" />
              <path d="M42 18c1 1 2 2.2 4 2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
              <g transform="translate(12,16)" fill="#cfeffb" opacity="0.95">
                <rect x="0" y="0" width="20" height="3" rx="1" />
                <rect x="0" y="6" width="12" height="3" rx="1" />
              </g>
              <path d="M46 29v6" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M50 33h-8" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <p className="text-lg text-gray-50">AI Job-Description Tailoring</p>
            <p className="text-sm text-gray-200">Paste a job posting and get a resume and cover letter tailored to the role and keywords.</p>
          </div>

          <div className="bg-linear-to-b from-[#2A0150] to-[#090025] hover:-translate-y-1 transition duration-300 border border-violet-900 rounded-lg p-6 space-y-4">
            {/* One-Click Export SVG */}
            <svg className="w-12 h-12" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs><linearGradient id="exp1" x1="0" x2="1"><stop offset="0" stopColor="#F59E0B" /><stop offset="1" stopColor="#EF4444" /></linearGradient></defs>
              <rect x="6" y="8" width="36" height="48" rx="3" fill="#071026" stroke="url(#exp1)" strokeWidth="2" />
              <path d="M24 18v14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M20 26l8-8 8 8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="46" y="34" width="10" height="10" rx="2" fill="#0b1226" stroke="#c7a2ff" strokeWidth="1.5" />
              <path d="M48 39h6M48 43h6" stroke="#c7a2ff" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p className="text-lg text-gray-50">One-Click Export</p>
            <p className="text-sm text-gray-200">Export to PDF, Word, or share a public resume link. Generate matching cover letters and LinkedIn summaries.</p>
          </div>
        </div>
        <Feature />
      </section>
    </>
  );
};

export default Hero;
