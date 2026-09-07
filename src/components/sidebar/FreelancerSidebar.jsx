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
    { name: "Dashboard", path: "/freelancer/dashboard", icon: LayoutDashboard },
    { name: "Find Work", path: "/find-work", icon: Search },
    {
      name: "My Projects",
      path: "/freelancer/projects",
      icon: BriefcaseBusiness,
    },
    { name: "Proposals", path: "/freelancer/proposals", icon: FileText },
    { name: "Messages", path: "/freelancer/messages", icon: MessageSquare },
    { name: "Earnings", path: "/freelancer/earnings", icon: Wallet },
    { name: "Profile", path: "/freelancer/profile", icon: UserRound },
    { name: "Settings", path: "/freelancer/settings", icon: Settings },
  ];

  const fullName =
    user?.name ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    "Freelancer";

  const email = user?.email || "freelancer@lynk.com";

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center px-6">
        <h1 className="font-serif text-2xl font-bold text-indigo-700">Lynk</h1>
      </div>

      <nav className="flex-1 px-4 py-4">
        <div className="space-y-2">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {error && (
        <div className="mx-4 mb-3 rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-semibold text-red-700">Profile Error</p>

          <p className="mt-1 break-words text-xs leading-5 text-red-600">
            {error}
          </p>
        </div>
      )}

      <div className="mx-4 mb-5 rounded-2xl bg-indigo-50 p-4">
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={fullName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
              <UserRound className="h-5 w-5" />
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {fullName}
            </p>

            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSidebar;
