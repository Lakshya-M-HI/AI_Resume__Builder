import React, { useEffect, useState, useRef } from "react"
import {
    User,
    Mail,
    Phone,
    MapPin,
    BriefcaseBusiness,
    Linkedin,
    Globe,
} from "lucide-react"

/*
    PersonalInfoForm
    - Props:
        - data: object with fields (full_name, email, phone, location, profession, linkedin, website, image)
        - onChange: function(updatedData)
        - removeBackground: boolean
        - setRemoveBackground: function(toggle)
    - Provides a compact dashboard-themed layout + minimal CSS below.
    - Fixes:
        - duplicate key for email
        - wrong placeholder template string
        - safe preview URL handling for uploaded image
*/

const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
]

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
    const [previewUrl, setPreviewUrl] = useState(null)

    // create preview URL for file objects and cleanup
    const prevImage = useRef(null);
    useEffect(() => {
        if (!data?.image) return setPreviewUrl(null);

        if (typeof data.image === "string") {
            setPreviewUrl(data.image);
        }
    }, [data?.image]);

    useEffect(() => {
        if (!data?.image || typeof data.image === "string") return;

        const url = URL.createObjectURL(data.image);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [data?.image]);


    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const handleFile = (file) => {
        handleChange("image", file)
    }

    return (
        <section className="pi-card">
            <header className="pi-header">
                <div>
                    <h3 className="pi-title">Personal Information</h3>
                    <p className="pi-sub">Enter details that will appear on your resume</p>
                </div>
            </header>

            <div className="pi-body">
                <div className="avatar-row">
                    <label className="avatar-upload">
                        <input
                            className="visually-hidden"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                        />
                        <div className="avatar-preview" aria-hidden>
                            {previewUrl ? (
                                <img src={previewUrl} alt="profile preview" />
                            ) : (
                                <div className="avatar-placeholder">
                                    <User />
                                    <span>Upload photo</span>
                                </div>
                            )}
                        </div>
                    </label>

                    {data?.image && typeof data.image !== "string" && (
                        <div className="bg-toggle">
                            <label className="toggle-label">
                                <span>Remove Background</span>
                                <div className="toggle">
                                    <input
                                        type="checkbox"
                                        checked={!!removeBackground}
                                        onChange={() => setRemoveBackground((p) => !p)}
                                    />
                                    <span className="knob" />
                                </div>
                            </label>
                        </div>
                    )}
                </div>

                <div className="fields-grid">
                    {fields.map((field) => {
                        const FieldIcon = field.icon
                        return (
                            <div className="field" key={field.key}>
                                <label className="field-label">
                                    <FieldIcon className="field-icon" />
                                    <span>{field.label}</span>
                                    {field.required && <span className="required">*</span>}
                                </label>

                                <input
                                    className="field-input"
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                    type={field.type}
                                    value={data?.[field.key] ?? ""}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    required={field.required}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Minimal inline CSS to fit a dashboard theme.
                    Paste this CSS into your global stylesheet or convert to a CSS module. */}
            <style>{`
                :root {
                    --bg: #0f1724;
                    --card: #0b1220;
                    --muted: #98a0b3;
                    --accent: #4f46e5;
                    --surface: #0b1220;
                    --input-bg: #0f1728;
                    --border: rgba(255,255,255,0.06);
                }
                .pi-card {
                padding: 24px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
                    border: 1px solid var(--border);
                    padding: 20px;
                    border-radius: 12px;
                    color: #e6eef8;
                    max-width: 920px;
                    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
                }
                .pi-header { display:flex; align-items:center; justify-content:space-between; margin-bottom: 14px; }
                .pi-title { margin:0; font-size:18px; font-weight:600; }
                .pi-sub { margin:0; color:var(--muted); font-size:13px; margin-top:4px; }

                .pi-body { display:block; gap:18px; }

                .avatar-row { display:flex; gap:16px; align-items:center; margin-bottom:12px; }
                .avatar-upload { cursor:pointer; display:inline-flex; align-items:center; }
                .visually-hidden { display:none; }

                .avatar-preview {
                    width:86px; height:86px; border-radius:12px; overflow:hidden;
                    display:flex; align-items:center; justify-content:center;
                    background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
                    border:1px solid var(--border);
                }
                .avatar-preview img { width:100%; height:100%; object-fit:cover; display:block; }

                .avatar-placeholder { display:flex; flex-direction:column; gap:6px; align-items:center; color:var(--muted); font-size:12px; }
                .avatar-placeholder svg { opacity:0.9; }

                .bg-toggle { font-size:13px; color:var(--muted); }
                .toggle-label { display:flex; gap:12px; align-items:center; }

                .toggle { position:relative; width:44px; height:24px; background:rgba(255,255,255,0.06); border-radius:999px; display:inline-flex; align-items:center; }
                .toggle input { opacity:0; width:100%; height:100%; position:absolute; cursor:pointer; }
                .toggle .knob { position:absolute; left:3px; top:3px; width:18px; height:18px; background:#fff; border-radius:50%; transition: transform .18s ease; }
                .toggle input:checked + .knob { transform: translateX(20px); background: var(--accent); }

                .fields-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:12px; margin-top:8px; }
                .field { display:flex; flex-direction:column; gap:6px; }
                .field-label { display:flex; gap:8px; align-items:center; color:var(--muted); font-size:13px; }
                .field-icon { opacity:0.9; }
                .required { color:#ffb4b4; margin-left:6px; font-size:12px; }

                .field-input {
                    background: var(--input-bg);
                    border: 1px solid var(--border);
                    color: #dbeafe;
                    padding:10px 12px;
                    border-radius:8px;
                    outline:none;
                    font-size:14px;
                }
                .field-input:focus { box-shadow: 0 0 0 3px rgba(79,70,229,0.12); border-color:var(--accent); }

                @media (max-width:720px) {
                    .fields-grid { grid-template-columns: 1fr; }
                }
                    .field-input::placeholder {
    color: rgba(255,255,255,0.4);
}
            `}</style>
        </section>
    )
}

export default PersonalInfoForm