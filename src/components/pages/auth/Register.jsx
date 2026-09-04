import Navbar from "../../navbar/Navbar";
import { useState } from "react";
import { FiTool } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import googleIcon from "../../../assets/icons/google.webp";
import githubIcon from "../../../assets/icons/github.webp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Register = () => {
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});
    const { register } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await register({
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                role,
            });
            navigate("/");
        } catch (err) {
            setServerError(
                err.response?.data?.message || "An error occurred. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!role) {
            newErrors.role = "Please select your role";
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the Terms of Service";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="min-h-screen">

            {/* Navbar */}
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-purple-50">

                {/* Register Section */}
                <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
                    <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-md sm:p-8">
                        {/* Heading */}
                        <div className="mb-8 text-center font-lora">
                            <h1 className="text-2xl font-bold sm:text-3xl">                                Create your account
                            </h1>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">                                Join the premier marketplace connecting elite talent with top-tier companies.
                            </p>
                        </div>

                        {/* User Role */}
                        <div className="mb-4">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setRole("client");
                                        setErrors((prev) => ({
                                            ...prev,
                                            role: "",
                                        }));
                                    }} className={`rounded-xl cursor-pointer border-2 p-4 sm:p-5 text-center transition-all duration-300 ${role === "client"
                                        ? "border-blue-500 bg-blue-100 shadow-md"
                                        : "border-transparent bg-blue-50 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
                                        }`}
                                >
                                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 sm:h-12 sm:w-12">                                        <FiBriefcase className="text-xl text-blue-700" />
                                    </div>

                                    <p className="font-semibold">Client</p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        I want to hire top talent
                                    </p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setRole("freelancer");
                                        setErrors((prev) => ({
                                            ...prev,
                                            role: "",
                                        }));
                                    }}
                                    className={`rounded-xl cursor-pointer border-2 p-4 sm:p-5 text-center transition-all duration-300 ${role === "freelancer"
                                        ? "border-purple-500 bg-purple-100 shadow-md"
                                        : "border-transparent bg-purple-50 hover:-translate-y-1 hover:border-purple-400 hover:shadow-md"
                                        }`}
                                >
                                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 sm:h-12 sm:w-12">
                                        <FiTool className="text-xl text-purple-700" />
                                    </div>

                                    <p className="font-semibold">Freelancer</p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        I want to find work
                                    </p>
                                </button>

                            </div>

                            {errors.role && (
                                <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                    <p className="text-xs font-lora font-medium text-red-500">
                                        {errors.role}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Form */}
                        <form className="space-y-5 font-lora" onSubmit={handleSubmit}>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Full Name
                                </label>

                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />

                                    <input
                                        type="text"
                                        placeholder="Alex Morgan"
                                        className={`w-full rounded-lg border px-4 py-3 pl-10 text-gray-700 outline-none transition ${errors.fullName
                                            ? "border-red-500"
                                            : "border-gray-200"
                                            }`}
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.fullName && (
                                    <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                        <p className="text-xs font-lora font-medium text-red-500">
                                            {errors.fullName}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />

                                    <input
                                        type="email"
                                        placeholder="alex.morgan@example.com"
                                        className={`w-full rounded-lg border px-4 py-3 pl-10 text-gray-700 outline-none transition ${errors.email
                                            ? "border-red-500"
                                            : "border-gray-200"
                                            }`}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && (
                                    <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                        <p className="text-xs font-lora font-medium text-red-500">
                                            {errors.email}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="">
                                <label className="mb-2 block text-sm font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="At least 8 characters"
                                        className={`w-full rounded-lg border px-4 py-3 pl-10 pr-10 text-gray-700 outline-none transition ${errors.password
                                            ? "border-red-500"
                                            : "border-gray-200"
                                            }`}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>
                            {errors.password && (
                                <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                    <p className="text-xs font-lora font-medium text-red-500">
                                        {errors.password}
                                    </p>
                                </div>
                            )}

                            <div className="">
                                <label className="mb-2 block text-sm font-medium">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <FiLock className="text-gray-600" />
                                    </div>

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        className={`w-full rounded-lg border px-4 py-3 pl-10 pr-10 text-gray-700 outline-none transition ${errors.confirmPassword
                                            ? "border-red-500"
                                            : "border-gray-200"
                                            }`}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />


                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                    <p className="text-xs font-lora font-medium text-red-500">
                                        {errors.confirmPassword}
                                    </p>
                                </div>
                            )}


                            {/* Terms of Service */}

                            <div className="">
                                <label className="flex items-start gap-2 mx-2 text-sm">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>
                                        I agree to the <span className="text-blue-700 cursor-pointer font-bold">Terms of Service</span> and <span className="text-blue-700 cursor-pointer font-bold">Privacy Policy</span>.
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="mt-2 mx-2 text-xs font-lora font-medium text-red-500">
                                        {errors.agreeToTerms}
                                    </p>
                                )}
                            </div>

                            {serverError && (
                                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                    <p className="text-xs font-lora font-medium text-red-500">
                                        {serverError}
                                    </p>
                                </div>
                            )}

                            {/* Register Button */}
                            <button
                                type="submit" disabled={isSubmitting}
                                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white cursor-pointer transition-all duration-300 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"                            >
                                {isSubmitting ? "Creating Account..." : <>Create Account <FiArrowRight className="inline-block ml-1" /></>}
                            </button>

                        </form>


                        {/* Countinue With*/}
                        <div className="my-8">
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-px flex-1 bg-gray-300"></span>
                                <span className="text-sm text-gray-500">OR CONTINUE WITH</span>
                                <span className="h-px flex-1 bg-gray-300"></span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 transition-all duration-300 hover:bg-gray-100"
                                >                                    <img src={googleIcon} alt="Google" className="h-5 w-5 rounded-full" />
                                    Google
                                </button>
                                <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 transition-all duration-300 cursor-pointer hover:bg-gray-100">
                                    <img src={githubIcon} alt="GitHub" className="h-5 w-5 rounded-full" />
                                    GitHub
                                </button>
                            </div>
                        </div>

                        {/* Login */}
                        <p className="mt-6 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-700 font-bold">
                                Login
                            </a>
                        </p>

                    </div>

                </main>

            </div >

        </div >
    );
};

export default Register;