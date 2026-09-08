import React, { useState, useEffect } from "react";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiUser,
  FiFileText,
  FiCpu,
  FiAward,
  FiBriefcase,
} from "react-icons/fi";

const EditProfileModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [activeTab, setActiveTab] = useState("basic");

  // Sync state properly if initialData changes
  const [formData, setFormData] = useState({
    name: initialData?.name || initialData?.fullName || "",
    title: initialData?.title || initialData?.jobTitle || initialData?.role || "",
    location: initialData?.location || "",
    avatar: initialData?.avatar || initialData?.profilePicture || "",
    about: initialData?.about || initialData?.bio || "",
    skills: Array.isArray(initialData?.skills) ? initialData.skills : [],
    certifications: Array.isArray(initialData?.certifications) ? initialData.certifications : [],
    portfolioList: Array.isArray(initialData?.portfolioList)
      ? initialData.portfolioList
      : Array.isArray(initialData?.portfolio)
      ? initialData.portfolio
      : [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || initialData.fullName || "",
        title: initialData.title || initialData.jobTitle || initialData.role || "",
        location: initialData.location || "",
        avatar: initialData.avatar || initialData.profilePicture || "",
        about: initialData.about || initialData.bio || "",
        skills: Array.isArray(initialData.skills) ? initialData.skills : [],
        certifications: Array.isArray(initialData.certifications) ? initialData.certifications : [],
        portfolioList: Array.isArray(initialData.portfolioList)
          ? initialData.portfolioList
          : Array.isArray(initialData.portfolio)
          ? initialData.portfolio
          : [],
      });
    }
  }, [initialData]);

  // State for adding a new skill
  const [newSkill, setNewSkill] = useState("");

  // Handlers for Basic Info & About
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Skill Handlers
  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Portfolio Handlers
  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      portfolioList: [
        ...prev.portfolioList,
        {
          title: "",
          category: "",
          description: "",
          image: "",
          technologies: [],
        },
      ],
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.portfolioList];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormData((prev) => ({ ...prev, portfolioList: updatedProjects }));
  };

  const handleRemoveProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      portfolioList: prev.portfolioList.filter((_, i) => i !== index),
    }));
  };

  // Certification Handlers
  const handleCertChange = (index, field, value) => {
    const updatedCerts = [...formData.certifications];
    updatedCerts[index] = { ...updatedCerts[index], [field]: value };
    setFormData((prev) => ({ ...prev, certifications: updatedCerts }));
  };

  const handleAddCert = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { title: "", issuer: "", year: new Date().getFullYear().toString() },
      ],
    }));
  };

  const handleRemoveCert = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Save Form Handler
  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: formData.name,
    title: formData.title,
    avatar: formData.avatar,
    bio: formData.about,
    location: formData.location,
    skills: formData.skills,
    certifications: formData.certifications,
    portfolio: formData.portfolioList,
  };

  try {
    await onSave(payload);
    onClose();
  } catch (error) {
    console.error("Failed to save profile:", error);
  }
};

  const tabs = [
    { id: "basic", label: "Basic Info", icon: FiUser },
    { id: "about", label: "About Me", icon: FiFileText },
    { id: "skills", label: "Skills", icon: FiCpu },
    { id: "portfolio", label: "Portfolio", icon: FiBriefcase },
    { id: "certifications", label: "Certifications", icon: FiAward },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50/50 px-6 gap-2 pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-xs font-semibold cursor-pointer sm:text-sm transition ${
                  isActive
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* TAB 1: BASIC INFO */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Professional Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Senior Full-Stack Engineer"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Cairo, Egypt or Remote"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-indigo-500 focus:outline-none"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT ME */}
          {activeTab === "about" && (
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Bio Summary
              </label>
              <textarea
                name="about"
                rows={6}
                value={formData.about}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 text-sm leading-relaxed focus:border-indigo-500 focus:outline-none"
                placeholder="Write a brief summary about your technical background, skills, and experience..."
              />
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Manage Skills
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 rounded-xl border border-gray-200 p-3 text-sm focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. React.js, Tailwind CSS"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer"
                >
                  <FiPlus /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FEATURED PORTFOLIO */}
          {activeTab === "portfolio" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Featured Projects
                </label>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  <FiPlus /> Add Project
                </button>
              </div>

              {formData.portfolioList.length === 0 ? (
                <p className="py-4 text-center text-xs text-gray-400">
                  No portfolio projects added yet. Click "Add Project" to start.
                </p>
              ) : (
                formData.portfolioList.map((project, index) => (
                  <div
                    key={index}
                    className="relative space-y-3 rounded-xl border border-gray-200 bg-gray-50/50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">
                        Project #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(index)}
                        className="text-gray-400 transition hover:text-red-500 cursor-pointer"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        placeholder="Project Title (e.g. E-Commerce Mobile App)"
                        value={project.title || ""}
                        onChange={(e) =>
                          handleProjectChange(index, "title", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:border-indigo-500 focus:outline-none"
                      />

                      <input
                        type="text"
                        placeholder="Category (e.g. MOBILE APP / WEB)"
                        value={project.category || ""}
                        onChange={(e) =>
                          handleProjectChange(index, "category", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Cover Image URL (https://...)"
                      value={project.image || project.imageUrl || ""}
                      onChange={(e) =>
                        handleProjectChange(index, "image", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />

                    <textarea
                      rows={2}
                      placeholder="Short Project Description..."
                      value={project.description || ""}
                      onChange={(e) =>
                        handleProjectChange(index, "description", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />

                    <input
                      type="text"
                      placeholder="Technologies (comma separated: React, Tailwind, Node.js)"
                      value={
                        Array.isArray(project.technologies)
                          ? project.technologies.join(", ")
                          : project.technologies || ""
                      }
                      onChange={(e) => {
                        const techArray = e.target.value
                          .split(",")
                          .map((t) => t.trimStart());
                        handleProjectChange(index, "technologies", techArray);
                      }}
                      className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: CERTIFICATIONS */}
          {activeTab === "certifications" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Certifications List
                </label>
                <button
                  type="button"
                  onClick={handleAddCert}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  <FiPlus /> Add New
                </button>
              </div>

              {formData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/50 p-4"
                >
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      placeholder="Certification Title"
                      value={cert.title || ""}
                      onChange={(e) =>
                        handleCertChange(index, "title", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Issuer"
                        value={cert.issuer || ""}
                        onChange={(e) =>
                          handleCertChange(index, "issuer", e.target.value)
                        }
                        className="flex-1 rounded-lg border border-gray-200 bg-white p-2 text-xs focus:border-indigo-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={cert.year || ""}
                        onChange={(e) =>
                          handleCertChange(index, "year", e.target.value)
                        }
                        className="w-24 rounded-lg border border-gray-200 bg-white p-2 text-xs focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveCert(index)}
                    className="p-1 text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;