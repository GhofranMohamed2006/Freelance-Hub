import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
    FiSearch,
    FiMapPin,
    FiDollarSign,
    FiUser,
    FiAlertCircle,
    FiArrowRight,
} from "react-icons/fi";

import {
    getFreelancers,
    getCategories,
} from "../../api/freelancer.api";

import Loader from "../../components/common/Loader";

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const FindTalent = () => {
    const navigate = useNavigate();

    const [freelancers, setFreelancers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadFreelancers = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getFreelancers(
                    search,
                    category
                );

                setFreelancers(
                    data.data || data || []
                );
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load freelancers."
                );
            } finally {
                setLoading(false);
            }
        };

        loadFreelancers();
    }, [search, category]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategories();

                setCategories(
                    data.data || data || []
                );
            } catch (err) {
                console.error(
                    "Failed to load categories:",
                    err
                );
            }
        };

        loadCategories();
    }, []);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-[#F8F9FC]"
        >

            {/* Header */}

            <motion.div
                variants={cardVariants}
                className="mb-8 mx-2"
            >
                <h1 className="text-2xl font-bold text-[#0B1120]">
                    Find Talent
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Find the right freelancer for your
                    project.
                </p>
            </motion.div>

            <motion.div
                variants={cardVariants}
                className="mb-8 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
                {/* Search */}
                <div className="relative">
                    <FiSearch
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search freelancers by name, skill..."
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                </div>

                {/* Category Filter */}
                <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                            Browse by Category
                        </label>

                        {category && (
                            <button
                                type="button"
                                onClick={() => setCategory("")}
                                className="text-xs font-medium text-gray-500 transition hover:text-blue-600"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setCategory("")}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === ""
                                ? "bg-blue-600 text-white shadow-sm"
                                : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                        >
                            All
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setCategory(cat.id)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === cat.id
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Error */}

            {error && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <FiAlertCircle size={18} />
                    {error}
                </div>
            )}

            {/* Loading */}

            {loading ? (
                <Loader text="Finding freelancers..." />
            ) : freelancers.length === 0 ? (

                /* Empty State */

                <motion.div
                    variants={cardVariants}
                    className="rounded-xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm"
                >

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <FiUser size={24} />
                    </div>

                    <h2 className="font-semibold text-[#0B1120]">
                        No freelancers found
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Try searching with another name
                        or skill.
                    </p>
                </motion.div>

            ) : (

                /* Results */

                <>
                    <motion.div variants={cardVariants} className="mb-4">
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold text-gray-800">
                                {freelancers.length}
                            </span>{" "}
                            freelancers found
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                    >

                        {freelancers.map((freelancer) => (
                            <motion.div
                                variants={cardVariants}
                                key={freelancer.id}
                                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                            >

                                {/* Profile */}

                                <div className="flex items-center gap-4">

                                    {freelancer.avatar ? (
                                        <img
                                            src={
                                                freelancer.avatar
                                            }
                                            alt={
                                                freelancer.name
                                            }
                                            className="h-14 w-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <FiUser
                                                size={23}
                                            />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <h2 className="truncate font-semibold text-[#0B1120]">
                                            {freelancer.name ||
                                                "Freelancer"}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Freelancer
                                        </p>
                                    </div>
                                </div>

                                {/* Bio */}

                                <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-500">
                                    {freelancer.bio ||
                                        "This freelancer hasn't added a bio yet."}
                                </p>

                                {/* Location */}

                                {freelancer.location && (
                                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                        <FiMapPin
                                            size={15}
                                        />
                                        {freelancer.location}
                                    </div>
                                )}

                                {/* Skills */}

                                {freelancer.skills?.length >
                                    0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {freelancer.skills
                                                .slice(0, 4)
                                                .map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                        </div>
                                    )}

                                {/* Footer */}

                                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

                                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                                        <FiDollarSign
                                            size={16}
                                            className="text-green-600"
                                        />

                                        {freelancer.hourlyRate ||
                                            0}
                                        /hr
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/freelancers/${freelancer.id}`
                                            )
                                        }
                                        className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                                    >
                                        View Profile
                                        <FiArrowRight
                                            size={15}
                                        />
                                    </button>

                                </div>
                            </motion.div>
                        ))}

                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

export default FindTalent;