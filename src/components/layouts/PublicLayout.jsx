import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import FreelancerSidebar from "../sidebar/FreelancerSidebar";

import { useAuth } from "../context/AuthContext";

const PublicLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { user } = useAuth();

    const isClient = user?.role === "client";
    const isFreelancer = user?.role === "freelancer";

    const showSidebar = isClient || isFreelancer;

    return (
        <div className="min-h-screen bg-[#F8F9FC]">

            {/* Desktop Sidebar */}
            {showSidebar && (
                <aside
                    className={`fixed left-0 top-0 z-50 hidden h-screen w-64 border-r border-gray-200 bg-white shadow-lg transition-transform duration-300 lg:block ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }`}
                >
                    {isClient ? (
                        <Sidebar />
                    ) : (
                        <FreelancerSidebar />
                    )}
                </aside>
            )}

            {/* Mobile / Tablet Sidebar */}
            {showSidebar && (
                <aside
                    className={`fixed left-0 top-0 z-[60] h-screen w-72 max-w-[85vw] border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }`}
                >
                    {isClient ? (
                        <Sidebar
                            onNavigate={() => setSidebarOpen(false)}
                        />
                    ) : (
                        <FreelancerSidebar
                            onNavigate={() => setSidebarOpen(false)}
                        />
                    )}
                </aside>
            )}

            {/* Mobile Overlay */}
            {sidebarOpen && showSidebar && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[1px] lg:hidden"
                />
            )}

            {/* Main Area */}
            <div
                className={`min-h-screen transition-all duration-300 ${
                    showSidebar && sidebarOpen
                        ? "lg:ml-64"
                        : "lg:ml-0"
                }`}
            >

                {/* Navbar */}
                <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
                    <Navbar
                        onMenuClick={() =>
                            setSidebarOpen((prev) => !prev)
                        }
                        showSidebarMenu={showSidebar}
                    />
                </header>

                {/* Content */}
                <main className="min-h-[calc(100vh-64px)] bg-[#F8F9FC]">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default PublicLayout;