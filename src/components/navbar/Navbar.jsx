import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "../../components/common/Button";
import UserIcon from "../../components/common/UserIcon";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 font-libre">

                {/* Logo */}
                <div>
                    <a href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-700">
                            Lynk
                        </span>
                    </a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 lg:flex lg:mx-auto">
                    <a
                        href="/"
                        className="text-lg transition-all duration-300 hover:text-blue-800"
                    >
                        Home
                    </a>

                    <a
                        href="/freelancers"
                        className="text-lg transition-all duration-300 hover:text-blue-800"
                    >
                        Explore
                    </a>

                    <a
                        href="/projects"
                        className="text-lg transition-all duration-300 hover:text-blue-800"
                    >
                        Talents
                    </a>

                    <a
                        href="/services"
                        className="text-lg transition-all duration-300 hover:text-blue-800"
                    >
                        Pricing
                    </a>

                    <a
                        href="/about"
                        className="text-lg transition-all duration-300 hover:text-blue-800"
                    >
                        How It Works
                    </a>
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    <Button variant="primary">
                        Post a Job
                    </Button>

                    <Button variant="transparent">
                        Login
                    </Button>

                    <Button variant="ghost">
                        Sign Up
                    </Button>

                    <UserIcon />
                </div>

                {/* Mobile & Tablet Actions */}
                <div className="flex items-center gap-2 lg:hidden">

                    <UserIcon />

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-gray-700 transition hover:bg-gray-100"
                    >
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </button>

                </div>
            </div>

            {/* Mobile & Tablet Menu */}
            <div
                className={`overflow-hidden border-t border-gray-100 transition-all duration-300 lg:hidden ${isMenuOpen
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col gap-2 px-5 py-4 text-center font-libre">

                    <a
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-lg px-4 py-3 text-base transition hover:bg-blue-50 hover:text-blue-800"
                    >
                        Home
                    </a>

                    <a
                        href="/freelancers"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-lg px-4 py-3 text-base transition hover:bg-blue-50 hover:text-blue-800"
                    >
                        Explore
                    </a>

                    <a
                        href="/projects"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-lg px-4 py-3 text-base transition hover:bg-blue-50 hover:text-blue-800"
                    >
                        Talents
                    </a>

                    <a
                        href="/services"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-lg px-4 py-3 text-base transition hover:bg-blue-50 hover:text-blue-800"
                    >
                        Pricing
                    </a>

                    <a
                        href="/about"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-lg px-4 py-3 text-base transition hover:bg-blue-50 hover:text-blue-800"
                    >
                        How It Works
                    </a>

                    {/* Mobile & Tablet Buttons */}
                    <div className="flex flex-col items-center gap-3 border-t border-gray-100 pt-4">
                        <Button variant="primary">
                            Post a Job
                        </Button>

                        <Button variant="transparent">
                            Login
                        </Button>

                        <Button variant="ghost">
                            Sign Up
                        </Button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;