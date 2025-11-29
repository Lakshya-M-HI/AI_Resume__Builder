import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import dummyResumeData from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react'

const AI_ResumeBuilder = () => {

  
  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  })


  const loadExistingResume = async () => {

    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }


    const [activeSectionIndex, setActiveSectionIndex] = useState(0)

    const [removeBackground, setRemoveBackground] = useState(false)



    const sections = [
      { id: "personal", name: "Personal Info", icon: User },
      { id: "summary", name: "Summary", icon: FileText },
      { id: "experience", name: "Experience", icon: Briefcase },
      { id: "education", name: "Education", icon: GraduationCap },
      { id: "projects", name: "Projects", icon: FolderIcon },
      { id: "skills", name: "Skills", icon: Sparkles },
    ]



    // useEffect(() => {
    //   loadExistingResume()
    // }, [])

  }


  return (
    <div>

      <div>
        <Link to={'/app'}>
          <ArrowLeftIcon /> Back to Dashboard
        </Link>
      </div>


      <div>
        <div>
          {/* Left Panel - Form */}
          <div>
            <div>
              {/* progress bar using activeSectionIndex */}
              <hr />
              <hr />

              {/* Section Navigation  */}
              <div>
                <div></div>
                <div>{activeSectionIndex !== 0 && (
                  <>
                    <button onClick={() => { setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0)) }} disabled={activeSectionIndex === 0}>
                      <ChevronLeft /> previous
                    </button>

                    <button onClick={() => { setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1)) }} disabled={activeSectionIndex === sections.length - 1}>
                      <ChevronRight /> previous
                    </button>
                  </>
                )}
                </div>
              </div>


            </div>
          </div>



          {/* Right Panel - Preview */}
          <div></div>

        </div>
      </div>


    </div>
  )
}

export default AI_ResumeBuilder