import {
    FiSearch,
    FiBell,
    FiMenu,
} from "react-icons/fi";

import UserIcon from "../common/UserIcon";

const ClientNavbar = ({ onMenuClick }) => {
    return (
        <header className="h-16 bg-gray-50">
            <div className="flex h-full items-center gap-3 px-4 sm:px-6 lg:px-8">

                {/* Mobile / Tablet Menu */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open sidebar"
                    className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-700 lg:hidden"
                >
                    <FiMenu size={22} />
                </button>

                {/* Search */}
                <div className="relative min-w-0 bg-white rounded-lg flex-1 max-w-md">
                    <FiSearch
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg border border-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-100"
                    />
                </div>

                {/* Right Side */}
                <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-3">

                    {/* Notifications */}
                    <button
                        type="button"
                        className="relative cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Notifications"
                    >
                        <FiBell size={20} />

                        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                    </button>

                    {/* User */}
                    <UserIcon />

                </div>

            </div>
        </header>
    );
};

export default ClientNavbar;