import React, { useState } from 'react'
import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  // const [colorPalettes, setColorPalettes] = useState([
  //   {
  //     id: 1,
  //     name: "Royal Purple & Indigo",
  //     primary: "#3B006E",
  //     secondary: "#4F46E5",
  //     accent: "#A855F7",
  //     background: "#F8F5FF",
  //     text: "#1A1A1A"
  //   },
  //   {
  //     id: 2,
  //     name: "Navy & Sky (Tech)",
  //     primary: "#0F172A",
  //     secondary: "#1E3A8A",
  //     accent: "#38BDF8",
  //     background: "#F8FAFC",
  //     text: "#0A0A0A"
  //   },
  //   {
  //     id: 3,
  //     name: "Emerald & Slate (Minimal)",
  //     primary: "#065F46",
  //     secondary: "#10B981",
  //     accent: "#34D399",
  //     background: "#F0FDF4",
  //     text: "#0F172A"
  //   },
  //   {
  //     id: 4,
  //     name: "Black & Gold (Luxury)",
  //     primary: "#000000",
  //     secondary: "#1A1A1A",
  //     accent: "#D4AF37",
  //     background: "#FAF9F6",
  //     text: "#121212"
  //   },
  //   {
  //     id: 5,
  //     name: "Maroon & Pink (Creative)",
  //     primary: "#7F1D1D",
  //     secondary: "#BE123C",
  //     accent: "#F472B6",
  //     background: "#FFF1F2",
  //     text: "#1F1F1F"
  //   },
  //   {
  //     id: 6,
  //     name: "Blue & Orange (Bold)",
  //     primary: "#1E40AF",
  //     secondary: "#2563EB",
  //     accent: "#F97316",
  //     background: "#EFF6FF",
  //     text: "#0B0B0B"
  //   },
  //   {
  //     id: 7,
  //     name: "Teal & Navy (Calm)",
  //     primary: "#0D9488",
  //     secondary: "#14B8A6",
  //     accent: "#2DD4BF",
  //     background: "#ECFEFF",
  //     text: "#0B1A1A"
  //   },
  //   {
  //     id: 8,
  //     name: "Dark Purple & Silver (Premium)",
  //     primary: "#2A0054",
  //     secondary: "#3B006E",
  //     accent: "#C7D2FE",
  //     background: "#F7F3FF",
  //     text: "#111111"
  //   }
  // ]);

  // const colors = ['#9333ea', '#d97706', '#dc2626', '#284c7', '#16a34a']
  const [allResumes, setAllResumes] = useState(dummyResumeData)

  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)

  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState("")

  const navigate = useNavigate()

  const createResume = async (e) => {
    e.preventDefault()
    setShowCreateResume(false)
    navigate(`/app/builder/:resume123`)

  }


  const uploadResume = async (e) => {
    e.preventDefault()
    setShowUploadResume(false)
    navigate(`/app/builder/:resume123`)

  }


  const editTitle = async (e) => {
    e.preventDefault()
  }


  const deleteResume = async (resumeId) => {
    const confirm = window.confirm("Are you sure and want to delete this Resume?")

    if (confirm) {
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }
  }


  return (
    <div>

      <div className='max-w-7xl mx-auto px-4 py-8'>

        <p className='text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Rudransh</p>
      </div>


      <div className="flex gap-6 mx-9">

        {/* Create Resume */}
        <button onClick={() => { setShowCreateResume(true) }} className="group h-44 w-40 rounded-2xl bg-linear-to-br from-indigo-400/70 to-purple-500/70 
                     backdrop-blur-lg border border-white/10 shadow-lg
                     hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

          <div className="flex flex-col items-center pt-6">

            <span className="p-3 rounded-full bg-linear-to-br from-indigo-300 to-purple-500 
                       shadow-md group-hover:scale-105 transition-all duration-300">
              <PlusIcon className="size-10 text-white" />
            </span>

            <p className="mt-4 text-lg font-semibold text-white group-hover:text-indigo-200 transition-all duration-300">
              Create Resume
            </p>
          </div>
        </button>


        {/* Upload Existing */}
        <button onClick={() => { setShowUploadResume(true) }} className="group h-44 w-40 rounded-2xl bg-linear-to-br from-indigo-400/70 to-purple-500/70 
                     backdrop-blur-lg border border-white/10 shadow-lg
                     hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

          <div className="flex flex-col items-center pt-6">

            <span className="p-3 rounded-full bg-linear-to-br from-indigo-300 to-purple-500 
                       shadow-md group-hover:scale-105 transition-all duration-300">
              <UploadCloudIcon className="size-10 text-white" />
            </span>

            <p className="mt-4 text-lg font-semibold text-white group-hover:text-indigo-200 transition-all duration-300">
              Upload Existing
            </p>
          </div>
        </button>

      </div>

      <hr className='border-slate-300 my-6 sm:w-[305px]' />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {allResumes.map((resume, index) => {

          return (
            <button onClick={() => { navigate(`/app/builder/:${resume._id}`) }}
              key={index}
              className="group h-48 w-full rounded-2xl 
                   bg-linear-to-br from-indigo-400/60 to-purple-500/60
                   backdrop-blur-xl border border-white/10 shadow-lg
                   hover:-translate-y-2 hover:shadow-2xl 
                   transition-all duration-300 p-5 text-left relative"
            >
              {/* Top Icon */}
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-lg bg-white/10 text-white shadow-inner">
                  <FilePenLineIcon className="size-6" />
                </div>
              </div>

              {/* Resume Title */}
              <p className="mt-4 text-white font-semibold text-base leading-tight">
                {resume.title}
              </p>

              {/* Updated Date */}
              <p className="mt-1 text-xs text-white/70">
                Updated on{" "}
                {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              {/* Bottom Action Icons (Trash + Edit) */}
              <div onClick={e => e.stopPropagation()} className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <TrashIcon onClick={() => { deleteResume(resume._id) }} className="size-5 text-red-300 cursor-pointer hover:text-red-400 transition" />
                <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className="size-5 text-white/80 cursor-pointer hover:text-white transition" />
              </div>
            </button>
          );
        })}
      </div>

      {showCreateResume && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowCreateResume(false)}
        >
          <form
            onSubmit={createResume}
            onClick={(e) => e.stopPropagation()}
            className="relative w-96 p-6 rounded-2xl shadow-2xl border border-white/20 
                 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-2xl 
                 text-white animate-scaleIn"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create a Resume</h2>

              {/* Cross Button */}
              <button
                type="button"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            {/* Input Field */}
            <label className="text-sm text-white/80">Resume Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Ex: Full Stack Developer Resume"
              required
              className="w-full mt-2 p-3 rounded-lg bg-white/10 border border-white/20 
                   text-white placeholder-white/50 focus:outline-none 
                   focus:ring-2 focus:ring-purple-400 transition"
            />

            {/* Action Button */}
            <button
              type="submit"
              className="w-full mt-5 bg-linear-to-r from-purple-600 to-indigo-500 
                   py-3 rounded-lg font-semibold hover:from-purple-700 
                   hover:to-indigo-600 transition shadow-lg hover:shadow-xl"
            >
              Create Resume
            </button>
          </form>
        </div>
      )}


      {showUploadResume && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowUploadResume(false)}
        >
          <form
            onSubmit={uploadResume}
            onClick={(e) => e.stopPropagation()}
            className="relative w-96 p-6 rounded-2xl shadow-2xl border border-white/20 
                 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-2xl 
                 text-white animate-scaleIn"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload your Existing Resume</h2>

              {/* Cross Button */}
              <button
                type="button"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            {/* Input Field */}
            <label className="text-sm text-white/80">Resume Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Ex: Full Stack Developer Resume"
              required
              className="w-full mt-2 p-3 rounded-lg bg-white/10 border border-white/20 
                   text-white placeholder-white/50 focus:outline-none 
                   focus:ring-2 focus:ring-purple-400 transition"
            />

            <div className='my-4' >
              <label htmlFor="resume_Input">
                <h3>Select resume file</h3>
                <div>
                  {resume ? (
                    <p>{resume.name}</p>
                  ) : (
                    <div className='flex gap-3 items-center justify-center m-5'>
                      <UploadCloud />
                      <p>Upload Resume</p>
                    </div>
                  )}
                </div>
              </label>
              <input type="file" id='resume_Input' accept='.pdf' hidden onChange={(e) => { setResume(e.target.files[0]) }} required />
            </div>



            {/* Action Button */}
            <button
              type="submit"
              className="w-full mt-5 bg-linear-to-r from-purple-600 to-indigo-500 
                   py-3 rounded-lg font-semibold hover:from-purple-700 
                   hover:to-indigo-600 transition shadow-lg hover:shadow-xl"
            >
              Upload Resume
            </button>
          </form>
        </div>
      )}


      {editResumeId && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setEditResumeId('')}
        >
          <form
            onSubmit={editTitle}
            onClick={(e) => e.stopPropagation()}
            className="relative w-96 p-6 rounded-2xl shadow-2xl border border-white/20 
                 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-2xl 
                 text-white animate-scaleIn"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Resume Title</h2>

              {/* Cross Button */}
              <button
                type="button"
                onClick={() => {
                  setEditResumeId('');
                  setTitle("");
                }}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            {/* Input Field */}
            <label className="text-sm text-white/80">Update</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Ex: Full Stack Developer Resume"
              required
              className="w-full mt-2 p-3 rounded-lg bg-white/10 border border-white/20 
                   text-white placeholder-white/50 focus:outline-none 
                   focus:ring-2 focus:ring-purple-400 transition"
            />



            {/* Action Button */}
            <button onClick={()=>{setEditResumeId(resume.title)}}
              type="submit"
              className="w-full mt-5 bg-linear-to-r from-purple-600 to-indigo-500 
                   py-3 rounded-lg font-semibold hover:from-purple-700 
                   hover:to-indigo-600 transition shadow-lg hover:shadow-xl">
              Update
            </button>
          </form>
        </div>
      )}

    </div>
  )
}

export default Dashboard