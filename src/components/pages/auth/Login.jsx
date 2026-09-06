import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

import googleIcon from "../../../assets/icons/google.webp";
import githubIcon from "../../../assets/icons/github.webp";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Handle Input Changes
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

    setServerError("");
  };

  // Validate Form
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

  // Submit Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log("Login Data:", {
        email: formData.email,
        password: formData.password,
      });

      // Login through AuthContext
      const data = await login(formData.email, formData.password);

      console.log("Login Response:", data);

      console.log("Saved Token:", localStorage.getItem("lynk_token"));

      console.log("Saved User:", localStorage.getItem("user"));

      // Go to Dashboard
      // navigate("/dashboard");
      navigate("/client-dashboard"); // مؤقتا
      window.location.reload(); // مؤقتا
    } catch (err) {
      console.error("Login Error:", err);

      setServerError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid email or password",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-purple-50">
        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-md sm:p-8">
            {/* Heading */}
            <div className="mb-8 text-center font-lora">
              <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back</h1>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Sign in to your account and continue your journey.
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex.morgan@example.com"
                    className={`w-full rounded-lg border px-4 py-3 pl-10 text-gray-700 outline-none transition ${errors.email ? "border-red-500" : "border-gray-200"
                      }`}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full rounded-lg border px-4 py-3 pl-10 pr-10 text-gray-700 outline-none transition ${errors.password ? "border-red-500" : "border-gray-200"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
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

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span>Remember me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-bold text-blue-700 hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center">
                  <p className="text-xs font-lora font-medium text-red-500">
                    {serverError}
                  </p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In
                    <FiArrowRight className="ml-1 inline-block" />
                  </>
                )}
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
                {/* Google */}
                <button
                  type="button"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 transition-all duration-300 hover:bg-gray-100"
                >
                  <img
                    src={googleIcon}
                    alt="Google"
                    className="h-5 w-5 rounded-full"
                  />
                  Google
                </button>

                {/* GitHub */}
                <button
                  type="button"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 transition-all duration-300 hover:bg-gray-100"
                >
                  <img
                    src={githubIcon}
                    alt="GitHub"
                    className="h-5 w-5 rounded-full"
                  />
                  GitHub
                </button>
              </div>
            </div>

            {/* Register */}
            <p className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-blue-700">
                Create Account
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
