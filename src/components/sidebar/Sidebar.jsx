
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    FiGrid,
    FiSearch,
    FiEdit3,
    FiMessageSquare,
    FiSettings,
    FiUser,
    FiBriefcase,
    FiFileText,
    FiX,
    FiHome,
} from "react-icons/fi";

const navByRole = {
    client: [
        {
            to: "/",
            label: "home",
            icon: FiHome,
        },
        {
            to: "/client-dashboard",
            label: "Dashboard",
            icon: FiGrid,
        },
        {
            to: "/post-job",
            label: "Post a Job",
            icon: FiEdit3,
        },
        {
            to: "/find-services",
            label: "Find Services",
            icon: FiSearch,
        },
        {
            to: "/myjobs",
            label: "My Jobs",
            icon: FiFileText,
        },
        {
            to: "/ongoingProjects",
            label: "Ongoing Projects",
            icon: FiBriefcase,
        },
        {
            to: "/messages",
            label: "Messaging",
            icon: FiMessageSquare,
        },
    ],

    freelancer: [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: FiGrid,
        },
        {
            to: "/jobs",
            label: "Find Jobs",
            icon: FiBriefcase,
        },
        {
            to: "/messages",
            label: "Messaging",
            icon: FiMessageSquare,
        },
    ],
};

const Sidebar = ({ onNavigate }) => {
    const { user } = useAuth();

    const links = navByRole[user?.role] || [];

    const settingsPath =
        user?.role === "client"
            ? "/client-settings"
            : "/freelancer-settings";

    return (
        <aside className="flex h-full w-full flex-col bg-white px-4 py-5">

            {/* Logo */}
            <div className="flex items-center justify-between px-2">
                <h1 className="cursor-pointer font-lora text-2xl font-bold text-blue-700">
                    Lynk
                </h1>

                {/* Close Button - Mobile / Tablet */}
                <button
                    type="button"
                    onClick={onNavigate}
                    aria-label="Close sidebar"
                    className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 lg:hidden"
                >
                    <FiX size={22} />
                </button>
            </div>

            {/* Divider */}
            <div className="mt-3 border-t border-gray-200" />

            {/* Navigation */}
            <nav className="mt-6 flex flex-1 flex-col gap-2">

                {/* Main Links */}
                {links.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                ? "bg-blue-700 text-white"
                                : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                            }`
                        }
                    >
                        <Icon size={19} />
                        <span>{label}</span>
                    </NavLink>
                ))}

                {/* Settings */}
                <NavLink
                    to={settingsPath}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                        `mt-auto flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive
                            ? "bg-blue-700 text-white"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                        }`
                    }
                >
                    <FiSettings size={19} />
                    <span>Settings</span>
                </NavLink>
            </nav>

            {/* User Section */}
            <div className="mt-4 border-t border-gray-200 pt-4 ">

                <div className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-2">

                    {/* Avatar */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <FiUser size={19} />
                    </div>

                    {/* User Info */}
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">
                            {user?.name || "User"}
                        </p>

                        <p className="text-xs capitalize text-gray-500">
                            {user?.role || "Client"}
                        </p>
                    </div>

                </div>

            </div>

        </aside>
    );
};

export default Sidebar;

