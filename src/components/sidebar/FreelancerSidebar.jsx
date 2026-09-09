import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Search,
  MessageSquare,
  Settings,
  FileText,
  Wallet,
  UserRound,
  HomeIcon,
} from "lucide-react";

import { getMe } from "../../api/auth.api.js";

const FreelancerSidebar = ({ onNavigate }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setError("");

        const data = await getMe();
        setUser(data.user || data);
      } catch (err) {
        console.error("Failed to load freelancer profile:", err);

        setError(
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load profile",
        );
      }
    };

    loadUser();
  }, []);

  const links = [
    {
      name: "Home",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Dashboard",
      path: "/freelancer/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Find Work",
      path: "/freelancer/find-work",
      icon: Search,
    },
    {
      name: "My Projects",
      path: "/freelancer/projects",
      icon: BriefcaseBusiness,
    },
    {
      name: "Proposals",
      path: "/freelancer/proposals",
      icon: FileText,
    },
    {
      name: "Messages",
      path: "/freelancer/messages",
      icon: MessageSquare,
    },
    {
      name: "Earnings",
      path: "/freelancer/earnings",
      icon: Wallet,
    },
    {
      name: "Profile",
      path: "/freelancer/profile",
      icon: UserRound,
    },
    {
      name: "Settings",
      path: "/freelancer/settings",
      icon: Settings,
    },
  ];

  const fullName =
    user?.name ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    "Freelancer";

  const email = user?.email || "freelancer@lynk.com";

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">

      {/* Logo */}
      <div className="flex h-[72px] shrink-0 items-center border-b border-slate-100 px-6">
        <h1 className="font-serif text-2xl font-bold text-indigo-700">
          Lynk
        </h1>
      </div>

      {/* Navigation */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sidebar-scroll">
        <div className="space-y-1.5">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              <Icon className="h-[19px] w-[19px] shrink-0" />

              <span className="truncate">
                {name}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-3 shrink-0 rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-semibold text-red-700">
            Profile Error
          </p>

          <p className="mt-1 break-words text-xs leading-5 text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* User Profile */}
      <div className="shrink-0 border-t border-slate-100 p-4">
        <div className="rounded-2xl bg-indigo-50 p-3.5">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={fullName}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
                <UserRound className="h-5 w-5" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {fullName}
              </p>

              <p className="truncate text-xs text-slate-500">
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSidebar;