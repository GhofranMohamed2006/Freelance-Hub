import React from "react";
import { Clock3 } from "lucide-react";

export default function WorkspaceHeader({ project, client }) {
  return (
    <section className="rounded-[28px] bg-gradient-to-br from-white via-white to-[#f0edff] p-7 shadow-sm md:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white">
              {project.status || "Active"}
            </span>

            {project.dueDate && (
              <span className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3 className="h-4 w-4" />
                Due {new Date(project.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>

          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {project.title || project.name}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-500">
            {project.description || "Project workspace"}
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm lg:min-w-[280px]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            {client.name?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div>
            <p className="font-semibold">{client.name || "Client"}</p>
            <p className="mt-1 text-sm text-slate-500">
              {client.email || "Project Client"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
