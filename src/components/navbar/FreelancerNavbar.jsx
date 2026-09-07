import { Bell, Menu, Search, UserRound } from "lucide-react";
import { useAuth } from "../../components/context/AuthContext";

const FreelancerNavbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative flex max-w-xl flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search..."
          className="h-10 w-full rounded-xl bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div className="flex gap-5">
        <button
          type="button"
          className="relative rounded-xl p-2.5 cursor-pointer text-slate-600 hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-full bg-indigo-600 text-white"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || "Profile"}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <UserRound className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default FreelancerNavbar;
