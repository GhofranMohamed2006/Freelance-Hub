import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import ClientNavbar from "../navbar/ClientNavbar";

const ClientLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8F9FC]">

            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r border-gray-200 bg-white shadow-lg lg:block">
                <Sidebar />
            </aside>

            {/* Mobile / Tablet Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-[60] h-screen w-72 max-w-[85vw] border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                <Sidebar
                    onNavigate={() => setSidebarOpen(false)}
                />
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[1px] lg:hidden"
                />
            )}

            {/* Main Area */}
            <div className="min-h-screen lg:ml-64">

                {/* Navbar */}
                <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
                    <ClientNavbar
                        onMenuClick={() =>
                            setSidebarOpen(true)
                        }
                    />
                </header>

                {/* Page Content */}
                <main className="min-h-[calc(100vh-64px)] bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default ClientLayout;