import Navbar from "../../navbar/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import googleIcon from "../../../assets/icons/google.webp";
import githubIcon from "../../../assets/icons/github.webp";

const Login = () => {
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
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

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        console.log("Login Data:", formData);
    };

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <Navbar />
            
            <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-purple-50">
                {/* Login Section */}
                <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
                    <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-md sm:p-8">
                        
                        {/* Heading */}
                        <div className="mb-8 text-center font-lora">
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                Welcome back
                            </h1>
                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                Sign in to access your account and continue your journey.
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-5 font-lora" onSubmit={handleSubmit}>
                            
                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                                    <input
                                        type="email"
                                        placeholder="alex.morgan@example.com"
                                        className={`w-full rounded-lg border px-4 py-3 pl-10 text-gray-700 outline-none transition ${
                                            errors.email ? "border-red-500" : "border-gray-200"
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

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className={`w-full rounded-lg border px-4 py-3 pl-10 pr-10 text-gray-700 outline-none transition ${
                                            errors.password ? "border-red-500" : "border-gray-200"
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
                                {errors.password && (
                                    <div className="mt-3 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                                        <p className="text-xs font-lora font-medium text-red-500">
                                            {errors.password}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="text-blue-700 font-bold hover:underline">
                                  Forgot password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white cursor-pointer transition-all duration-300 hover:bg-blue-700"
                            >
                                Sign In <FiArrowRight className="inline-block ml-1" />
                            </button>
                        </form>

                        {/* Continue With */}
                        <div className="my-8">
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-px flex-1 bg-gray-300"></span>
                                <span className="text-sm text-gray-500">OR CONTINUE WITH</span>
                                <span className="h-px flex-1 bg-gray-300"></span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 cursor-pointer transition-all duration-300 hover:bg-gray-100"
                                >
                                    <img src={googleIcon} alt="Google" className="h-5 w-5 rounded-full" />
                                    Google
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 cursor-pointer transition-all duration-300 hover:bg-gray-100"
                                >
                                    <img src={githubIcon} alt="GitHub" className="h-5 w-5 rounded-full" />
                                    GitHub
                                </button>
                            </div>
                        </div>

                        {/* Register Link */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-700 font-bold hover:underline">
                                Register
                            </Link>
                        </p>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Login;