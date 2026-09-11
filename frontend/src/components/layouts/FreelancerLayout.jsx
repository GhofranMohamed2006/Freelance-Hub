import { useState } from "react";
import { Outlet } from "react-router-dom";

import FreelancerSidebar from "../sidebar/FreelancerSidebar";
import FreelancerNavbar from "../navbar/FreelancerNavbar";

const FreelancerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r border-gray-200 bg-white shadow-lg lg:block">
        <FreelancerSidebar />
      </aside>

      <aside
        className={`fixed left-0 top-0 z-[60] h-screen w-72 max-w-[85vw] border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <FreelancerSidebar onNavigate={() => setSidebarOpen(false)} />
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <div className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
          <FreelancerNavbar onMenuClick={() => setSidebarOpen(true)} />
        </header>

        <main className="min-h-[calc(100vh-64px)] bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FreelancerLayout;
