import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import FreelancerSidebar from "../sidebar/FreelancerSidebar";
import { useAuth } from "../context/AuthContext";

const PublicLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { user } = useAuth();

    const isClient = user?.role === "client";
    const isFreelancer = user?.role === "freelancer";
    const showSidebar = isClient || isFreelancer;

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#F8F9FC]">

            {/* ================= DESKTOP SIDEBAR ================= */}

            {showSidebar && (
                <aside
                    className={`
                        fixed inset-y-0 left-0 z-50
                        hidden w-64
                        border-r border-gray-200
                        bg-white shadow-lg
                        xl:block
                        transition-transform duration-300
                        ${
                            sidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }
                    `}
                >
                    {isClient ? (
                        <Sidebar />
                    ) : (
                        <FreelancerSidebar />
                    )}
                </aside>
            )}

            {/* ================= TABLET / MOBILE SIDEBAR ================= */}

            {showSidebar && (
                <aside
                    className={`
                        fixed inset-y-0 left-0
                        z-[100]
                        w-72 max-w-[85vw]
                        border-r border-gray-200
                        bg-white shadow-2xl
                        xl:hidden
                        transition-transform duration-300
                        ${
                            sidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }
                    `}
                >
                    {isClient ? (
                        <Sidebar onNavigate={closeSidebar} />
                    ) : (
                        <FreelancerSidebar onNavigate={closeSidebar} />
                    )}
                </aside>
            )}

            {/* ================= TABLET / MOBILE OVERLAY ================= */}

            {showSidebar && sidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="
                        fixed inset-0
                        z-[90]
                        bg-black/30
                        xl:hidden
                    "
                />
            )}

            {/* ================= MAIN ================= */}

            <div
              className={`
                  min-h-screen
                  transition-all
                  duration-300
                  ${
                      showSidebar && sidebarOpen
                          ? "xl:ml-64 xl:w-[calc(100%-16rem)]"
                          : "w-full"
                  }
              `}
          >

                {/* ================= NAVBAR ================= */}

                <header
                    className="
                        sticky top-0 z-40
                        w-full
                        border-b border-gray-200
                        bg-white
                        shadow-sm
                    "
                >
                    <Navbar
                        onMenuClick={toggleSidebar}
                        showSidebarMenu={showSidebar}
                    />
                </header>

                {/* ================= PAGE CONTENT ================= */}

                <main
                    className="
                        min-h-[calc(100vh-64px)]
                        w-full
                        overflow-x-hidden
                        bg-[#F8F9FC]
                    "
                >
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default PublicLayout;