import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Check, CheckCircle2, LockKeyhole } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";
import MilestoneItem from "./MilestoneItem";
import FilesList from "./FilesList";

import {
  getFreelancerProject,
  getFreelancerPayments,
  updateMilestone,
  uploadProjectFile,
} from "../../../api/freelancer.api.js";

export default function FreelancerProjectWorkspace() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError("");

        if (id) {
          const projectData = await getFreelancerProject(id);
          setProject(projectData);
        }

        const paymentsData = await getFreelancerPayments();
        setPayments(paymentsData);
      } catch {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const handleMilestone = async (milestoneId, status) => {
    try {
      const projectId = id || project?.id;

      if (!projectId) {
        setError("No project selected");
        return;
      }

      const updatedProject = await updateMilestone(projectId, milestoneId, {
        status,
      });

      setProject(updatedProject);
    } catch {
      setError("Failed to update milestone");
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const uploadedFile = await uploadProjectFile(file);

      setProject((current) => ({
        ...current,
        files: [...(current.files || []), uploadedFile],
      }));
    } catch {
      setError("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <p className="text-red-500">{error || "Project not found"}</p>
      </div>
    );
  }

  const milestones = Array.isArray(project.milestones)
    ? project.milestones
    : [];

  const files = Array.isArray(project.files) ? project.files : [];

  const completedMilestones = milestones.filter(
    (milestone) => milestone.status?.toLowerCase() === "completed",
  ).length;

  const progress = milestones.length
    ? Math.round((completedMilestones / milestones.length) * 100)
    : 0;

  const projectPayment = payments.find(
    (payment) =>
      payment.projectId === project.id || payment.projectID === project.id,
  );

  const client = project.client || project.clientUser || {};

  return (
    <main className="min-h-screen bg-[#f8f9ff] px-5 py-8 text-slate-900 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* header moved to WorkspaceHeader component */}
        <WorkspaceHeader project={project} client={client} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_290px]">
          <section className="rounded-[28px] bg-white p-7 shadow-sm md:p-10">
            <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 className="font-serif text-2xl font-bold">
                  Project Milestones
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {completedMilestones} of {milestones.length} milestones
                  completed
                </p>
              </div>

              <span className="font-semibold text-indigo-600">
                {progress}% Complete
              </span>
            </div>

            <div className="space-y-4">
              {milestones.map((milestone, idx) => (
                <MilestoneItem
                  key={milestone.id}
                  milestone={milestone}
                  index={idx}
                  onToggle={handleMilestone}
                />
              ))}

              {milestones.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-400">
                  No milestones yet.
                </p>
              )}
            </div>
          </section>

          <aside className="rounded-[28px] bg-indigo-700 p-7 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-indigo-200">Milestone Escrow</p>

                <h2 className="mt-2 text-4xl font-bold">
                  ${Number(projectPayment?.amount || 0).toLocaleString()}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500">
                <LockKeyhole className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-sm">
                <span className="text-indigo-200">Secured in Smart Escrow</span>

                <span className="font-semibold">
                  {projectPayment?.status || "Pending"}
                </span>
              </div>

              <div className="mt-4 h-2 rounded-full bg-indigo-400">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_290px]">
          <section className="rounded-[28px] bg-white p-7 shadow-sm md:p-10">
            <div className="mb-7">
              <h2 className="font-serif text-2xl font-bold">Project Tasks</h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete your project deliverables
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {milestones.map((milestone) => {
                const completed =
                  milestone.status?.toLowerCase() === "completed";

                return (
                  <button
                    key={milestone.id}
                    type="button"
                    onClick={() =>
                      handleMilestone(
                        milestone.id,
                        completed ? "In Progress" : "Completed",
                      )
                    }
                    className="flex items-start gap-4 rounded-2xl border border-slate-100 p-5 text-left transition hover:border-indigo-200 hover:bg-indigo-50/30"
                  >
                    <span
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        completed
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-slate-300"
                      }`}
                    >
                      {completed && <Check className="h-3.5 w-3.5" />}
                    </span>

                    <span>
                      <span
                        className={`block font-semibold ${
                          completed
                            ? "text-slate-500 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {milestone.title}
                      </span>

                      <span className="mt-1 block text-sm text-slate-500">
                        {milestone.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <FilesList
            files={files}
            uploading={uploading}
            onUpload={handleUpload}
          />
        </div>

        <section className="mt-6 rounded-[28px] bg-white p-7 shadow-sm md:p-10">
          <h2 className="font-serif text-2xl font-bold">Project Activity</h2>

          <div className="mt-7">
            {milestones.length > 0 ? (
              milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex gap-4 border-b border-slate-100 py-5 last:border-0"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{milestone.title}</h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Status: {milestone.status || "Pending"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No project activity yet.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
