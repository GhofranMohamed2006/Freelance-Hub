import React from "react";

const FeaturedPortfolio = ({ portfolioList }) => {
  const projects = Array.isArray(portfolioList) ? portfolioList : [];

  if (projects.length === 0) {
    return (
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl mb-4">
          Featured Portfolio
        </h2>
        <p className="text-xs text-gray-400">No portfolio projects added yet.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Featured Portfolio
        </h2>
        <button className="text-sm font-bold text-indigo-600 hover:underline">
          View All ({projects.length})
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const projectImage =
            project.image ||
            project.coverImage ||
            project.imageUrl ||
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";

          // (technologies أو tools أو skills)
          const techList =
            project.technologies || project.tools || project.skills || [];

          return (
            <div
              key={project.id || project._id || index}
              className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200"
            >
              {/* Image Box */}
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img
                  src={projectImage}
                  alt={project.title || "Project preview"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>

              {/* Body */}
              <div className="p-5">
                <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase">
                  {project.category || "PROJECT"}
                </span>

                <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 group-hover:text-indigo-600 transition-colors">
                  {project.title || "Untitled Project"}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                  {project.description || "No description provided."}
                </p>

                {/* Tech Badges */}
                {techList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech, idx) => (
                      <span
                        key={`${tech}-${idx}`}
                        className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600"
                      >
                        {typeof tech === "string" ? tech : tech.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedPortfolio;