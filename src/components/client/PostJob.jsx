import Navbar from "../navbar/Navbar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SkillSelector from "../project/SkillSelector";

import { createJob } from "../services/jobService";
import { getCategories } from "../services/categoryService";

function PostJob() {
    const navigate = useNavigate();

    // ================= CATEGORIES =================
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    // ================= FORM DATA =================
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        skills: [],
        minBudget: "",
        maxBudget: "",
        duration: "",
    });

    // ================= STATES =================
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ================= GET CATEGORIES =================
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getCategories();

                console.log("Categories:", result);

                const categoriesData = result.data || result;

                setCategories(
                    Array.isArray(categoriesData) ? categoriesData : []
                );
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    // ================= HANDLE CHANGE =================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // ================= VALIDATION =================
    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Job title is required";
        }

        if (!formData.category) {
            newErrors.category = "Please select a category";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (formData.skills.length === 0) {
            newErrors.skills = "Add at least one skill";
        }

        if (!formData.duration) {
            newErrors.duration = "Please select project duration";
        }

        if (
            formData.minBudget &&
            formData.maxBudget &&
            Number(formData.minBudget) > Number(formData.maxBudget)
        ) {
            newErrors.maxBudget =
                "Maximum budget must be greater than minimum budget";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // ================= SUBMIT JOB =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            console.log("Sending job:", formData);

            const result = await createJob(formData);

            console.log("Job created successfully:", result);

            alert("Job posted successfully!");

            navigate("/client/jobs");
        } catch (error) {
            console.error("Error creating job:", error);

            alert(
                error.response?.data?.message ||
                    "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // ================= CANCEL =================
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-purple-50 px-4 py-10 sm:px-6">
                <div className="mx-auto max-w-3xl">

                    {/* Header */}
                    <div className="mb-8 text-center font-lora">
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                            Post a New Job
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Find the right freelancer for your project.
                        </p>
                    </div>

                    {/* Form Card */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md sm:p-8"
                    >

                        {/* Job Title */}
                        <div className="mb-6">
                            <label
                                htmlFor="title"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Job Title{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Build a React Website"
                                className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 ${
                                    errors.title
                                        ? "border-red-500"
                                        : "border-gray-200 focus:border-blue-500"
                                }`}
                            />

                            {errors.title && (
                                <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                    <p className="text-xs font-medium text-red-500">
                                        {errors.title}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <label
                                htmlFor="category"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Category{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                disabled={loadingCategories}
                                className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-700 outline-none transition ${
                                    errors.category
                                        ? "border-red-500"
                                        : "border-gray-200 focus:border-blue-500"
                                }`}
                            >
                                <option value="">
                                    {loadingCategories
                                        ? "Loading Categories..."
                                        : "Select Category"}
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {errors.category && (
                                <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                    <p className="text-xs font-medium text-red-500">
                                        {errors.category}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Description{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Describe your project, requirements, and expectations..."
                                className={`w-full resize-none rounded-lg border bg-white px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 ${
                                    errors.description
                                        ? "border-red-500"
                                        : "border-gray-200 focus:border-blue-500"
                                }`}
                            />

                            {errors.description && (
                                <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                    <p className="text-xs font-medium text-red-500">
                                        {errors.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Skills */}
                        <div className="mb-6">
                            <SkillSelector
                                skills={formData.skills}
                                setSkills={(skills) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        skills,
                                    }));

                                    if (errors.skills) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            skills: "",
                                        }));
                                    }
                                }}
                            />

                            {errors.skills && (
                                <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                    <p className="text-xs font-medium text-red-500">
                                        {errors.skills}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Budget */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Budget
                            </label>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <input
                                    type="number"
                                    name="minBudget"
                                    value={formData.minBudget}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="Minimum Budget"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500"
                                />

                                <div>
                                    <input
                                        type="number"
                                        name="maxBudget"
                                        value={formData.maxBudget}
                                        onChange={handleChange}
                                        min="0"
                                        placeholder="Maximum Budget"
                                        className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-700 outline-none transition placeholder:text-gray-400 ${
                                            errors.maxBudget
                                                ? "border-red-500"
                                                : "border-gray-200 focus:border-blue-500"
                                        }`}
                                    />

                                    {errors.maxBudget && (
                                        <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                            <p className="text-xs font-medium text-red-500">
                                                {errors.maxBudget}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="mb-8">
                            <label
                                htmlFor="duration"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Project Duration{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-700 outline-none transition ${
                                    errors.duration
                                        ? "border-red-500"
                                        : "border-gray-200 focus:border-blue-500"
                                }`}
                            >
                                <option value="">Select Duration</option>
                                <option value="less-than-week">
                                    Less than 1 week
                                </option>
                                <option value="1-2-weeks">
                                    1 - 2 weeks
                                </option>
                                <option value="2-4-weeks">
                                    2 - 4 weeks
                                </option>
                                <option value="1-3-months">
                                    1 - 3 months
                                </option>
                                <option value="3-months-plus">
                                    3+ months
                                </option>
                            </select>

                            {errors.duration && (
                                <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                    <p className="text-xs font-medium text-red-500">
                                        {errors.duration}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Posting..." : "Post a Job"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostJob;
