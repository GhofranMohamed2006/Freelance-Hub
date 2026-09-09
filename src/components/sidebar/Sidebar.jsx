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
    FiInbox,
} from "react-icons/fi";

const navLinks = [
    {
        to: "/",
        label: "Home",
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
        to: "/find-talents",
        label: "Find Talents",
        icon: FiSearch,
    },
    {
        to: "/myjobs",
        label: "My Jobs",
        icon: FiFileText,
    },
    {
        to: "/proposals",
        label: "Proposals",
        icon: FiInbox,
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
    {
        to: "/client-settings",
        label: "Settings",
        icon: FiSettings,
    },
];

const Sidebar = ({ onNavigate }) => {
    const { user } = useAuth();

    return (
        <aside className="flex h-full min-h-0 w-full flex-col bg-white">

            {/* Logo */}
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-100 px-6">
                <h1 className="font-lora text-2xl font-bold text-blue-700">
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

            {/* Navigation */}
            <nav className="sidebar-scroll min-h-0 flex-1 overflow-y-auto px-4 py-5">
                <div className="space-y-1.5">

                    {navLinks.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                                `flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-blue-700 text-white shadow-sm"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                                }`
                            }
                        >
                            <Icon
                                size={19}
                                className="shrink-0"
                            />

                            <span className="truncate">
                                {label}
                            </span>
                        </NavLink>
                    ))}


                </div>
            </nav>

            {/* User Section */}
            <div className="shrink-0 border-t border-gray-100 p-4">
                <div className="rounded-2xl bg-blue-50 p-3.5">
                    <div className="flex items-center gap-3">

                        {/* Avatar */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
                            <FiUser size={19} />
                        </div>

                        {/* User Info */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-gray-800">
                                {user?.name || "Client"}
                            </p>

                            <p className="truncate text-xs capitalize text-gray-500">
                                {user?.role || "Client"}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;