import { useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { FiMenu, FiX } from "react-icons/fi";

import Button from "../../components/common/Button";
import UserIcon from "../../components/common/UserIcon";

import { useAuth } from "../../components/context/AuthContext";

const Navbar = ({ onMenuClick, showSidebarMenu }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { user, logout } = useAuth();

    const isClient = user?.role === "client";

    const logged = Boolean(
        user || localStorage.getItem("lynk_token")
    );

    const userId = user?._id || user?.id;

    const handlerlogout = () => {
        logout();
        navigate("/");
    };

    const handleProfileNavigate = () => {
        if (user?.role === "freelancer" && userId) {
            navigate(`/freelancer/${userId}`);
        } else {
            navigate("/client/profile");
        }
    };

    const isLoginActive = location.pathname === "/login";
    const isRegisterActive = !isLoginActive;

    return (
        <nav className="w-full bg-white shadow-sm">

            {/* ================= HEADER ================= */}
            <div
                className="
                    mx-auto flex w-full
                    items-center justify-between
                    gap-4
                    px-4 py-3
                    font-libre
                    sm:px-5
                    lg:max-w-7xl
                "
            >

                {/* ================= LOGO + SIDEBAR TOGGLE ================= */}
                <div className="flex shrink-0 items-center gap-2">

                    {/* Sidebar Toggle */}
                    {showSidebarMenu && (
                        <button
                            type="button"
                            onClick={onMenuClick}
                            className="
                                flex h-10 w-10 shrink-0
                                items-center justify-center
                                rounded-lg
                                text-xl text-gray-700
                                transition
                                hover:bg-gray-100
                            "
                            aria-label="Toggle sidebar"
                        >
                            <FiMenu />
                        </button>
                    )}

                    {/* Logo */}
                    <Link
                        to="/"
                        className="shrink-0"
                    >
                        <span className="text-2xl font-bold text-blue-700">
                            Lynk
                        </span>
                    </Link>
                </div>

                {/* ================= DESKTOP NAVIGATION ================= */}
                <div className="hidden items-center gap-8 lg:mx-auto lg:flex">

                    <Link
                        to="/"
                        className="
                            whitespace-nowrap
                            text-lg
                            transition-all duration-300
                            hover:text-blue-800
                        "
                    >
                        Home
                    </Link>

                    <Link
                        to="/freelancers"
                        className="
                            whitespace-nowrap
                            text-lg
                            transition-all duration-300
                            hover:text-blue-800
                        "
                    >
                        Explore
                    </Link>

                    <Link
                        to="/projects"
                        className="
                            whitespace-nowrap
                            text-lg
                            transition-all duration-300
                            hover:text-blue-800
                        "
                    >
                        Talents
                    </Link>

                    <Link
                        to="/services"
                        className="
                            whitespace-nowrap
                            text-lg
                            transition-all duration-300
                            hover:text-blue-800
                        "
                    >
                        Pricing
                    </Link>

                    <Link
                        to="/about"
                        className="
                            whitespace-nowrap
                            text-lg
                            transition-all duration-300
                            hover:text-blue-800
                        "
                    >
                        How It Works
                    </Link>

                </div>

                {/* ================= DESKTOP ACTIONS ================= */}
                <div className="hidden shrink-0 items-center gap-3 lg:flex">

                    {/* Post a Job */}
                    {isClient && (
                        <Button
                            variant="primary"
                            onClick={() => navigate("/post-job")}
                        >
                            Post a Job
                        </Button>
                    )}

                    {/* Profile / Login */}
                    {logged ? (
                        <Button
                            variant="ghost"
                            onClick={handleProfileNavigate}
                        >
                            Profile
                        </Button>
                    ) : (
                        <Button
                            variant={
                                isLoginActive
                                    ? "ghost"
                                    : "transparent"
                            }
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    )}

                    {/* Sign Up */}
                    {!logged && (
                        <Button
                            variant={
                                isRegisterActive
                                    ? "ghost"
                                    : "transparent"
                            }
                            onClick={() => navigate("/register")}
                        >
                            Sign Up
                        </Button>
                    )}

                    {/* Logout */}
                    {logged && (
                        <Button onClick={handlerlogout}>
                            Logout
                        </Button>
                    )}

                    {/* User Icon */}
                    <Link
                        to="/settings"
                        className="
                            flex shrink-0
                            items-center justify-center
                            rounded-lg p-2
                            text-gray-700
                            transition
                            hover:bg-gray-100
                        "
                    >
                        <UserIcon />
                    </Link>

                </div>

                {/* ================= TABLET / MOBILE ACTIONS ================= */}
                <div
                    className="
                        flex shrink-0
                        items-center gap-2
                        lg:hidden
                    "
                >

                    {/* User Icon */}
                    <Link
                        to="/settings"
                        className="
                            flex shrink-0
                            items-center justify-center
                            rounded-lg p-2
                            text-gray-700
                            transition
                            hover:bg-gray-100
                        "
                    >
                        <UserIcon />
                    </Link>

                    {/* Mobile Navigation Menu */}
                    {!showSidebarMenu && (
                        <button
                            type="button"
                            onClick={() =>
                                setIsMenuOpen(!isMenuOpen)
                            }
                            className="
                                flex h-10 w-10 shrink-0
                                items-center justify-center
                                rounded-lg
                                text-xl text-gray-700
                                transition
                                hover:bg-gray-100
                            "
                            aria-label="Open navigation menu"
                        >
                            {isMenuOpen ? (
                                <FiX />
                            ) : (
                                <FiMenu />
                            )}
                        </button>
                    )}

                </div>
            </div>

            {/* ================= MOBILE MENU ================= */}
            {!showSidebarMenu && (
                <div
                    className={`
                        overflow-hidden
                        border-t border-gray-100
                        transition-all duration-300
                        lg:hidden
                        ${
                            isMenuOpen
                                ? "max-h-[500px] opacity-100"
                                : "max-h-0 opacity-0"
                        }
                    `}
                >
                    <div
                        className="
                            flex flex-col gap-2
                            px-5 py-4
                            text-center
                            font-libre
                        "
                    >

                        {/* Home */}
                        <Link
                            to="/"
                            onClick={() =>
                                setIsMenuOpen(false)
                            }
                            className="
                                rounded-lg px-4 py-3
                                text-base
                                transition
                                hover:bg-blue-50
                                hover:text-blue-800
                            "
                        >
                            Home
                        </Link>

                        {/* Explore */}
                        <Link
                            to="/freelancers"
                            onClick={() =>
                                setIsMenuOpen(false)
                            }
                            className="
                                rounded-lg px-4 py-3
                                text-base
                                transition
                                hover:bg-blue-50
                                hover:text-blue-800
                            "
                        >
                            Explore
                        </Link>

                        {/* Talents */}
                        <Link
                            to="/projects"
                            onClick={() =>
                                setIsMenuOpen(false)
                            }
                            className="
                                rounded-lg px-4 py-3
                                text-base
                                transition
                                hover:bg-blue-50
                                hover:text-blue-800
                            "
                        >
                            Talents
                        </Link>

                        {/* Pricing */}
                        <Link
                            to="/services"
                            onClick={() =>
                                setIsMenuOpen(false)
                            }
                            className="
                                rounded-lg px-4 py-3
                                text-base
                                transition
                                hover:bg-blue-50
                                hover:text-blue-800
                            "
                        >
                            Pricing
                        </Link>

                        {/* How It Works */}
                        <Link
                            to="/about"
                            onClick={() =>
                                setIsMenuOpen(false)
                            }
                            className="
                                rounded-lg px-4 py-3
                                text-base
                                transition
                                hover:bg-blue-50
                                hover:text-blue-800
                            "
                        >
                            How It Works
                        </Link>

                        {/* ================= MOBILE BUTTONS ================= */}
                        <div
                            className="
                                flex flex-col
                                items-center gap-3
                                border-t border-gray-100
                                pt-4
                            "
                        >

                            {/* Post a Job */}
                            {isClient && (
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        navigate("/post-job");
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Post a Job
                                </Button>
                            )}

                            {/* Profile / Login */}
                            {logged ? (
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        handleProfileNavigate();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Profile
                                </Button>
                            ) : (
                                <Button
                                    variant={
                                        isLoginActive
                                            ? "ghost"
                                            : "transparent"
                                    }
                                    onClick={() => {
                                        navigate("/login");
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Login
                                </Button>
                            )}

                            {/* Sign Up */}
                            {!logged && (
                                <Button
                                    variant={
                                        isRegisterActive
                                            ? "ghost"
                                            : "transparent"
                                    }
                                    onClick={() => {
                                        navigate("/register");
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Sign Up
                                </Button>
                            )}

                            {/* Logout */}
                            {logged && (
                                <Button
                                    onClick={() => {
                                        handlerlogout();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Logout
                                </Button>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
