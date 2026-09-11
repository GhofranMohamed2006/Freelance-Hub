const Project = require("../models/Project");
const Proposal = require("../models/Proposal");
const Payment = require("../models/Payment");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Job = require("../models/Job");
const { pick, sanitizeUser } = require("../utils/helpers");

function dashboard(user) {
  const uid = user.id;
  const u = User.findById(uid);
  if (!u) throw Object.assign(new Error("User not found"), { status: 404 });
  const userSafe = sanitizeUser(u);

  const allProjects = Project.all().filter((p) => p.freelancerId === uid);
  const allProposals = Proposal.all().filter((p) => p.freelancerId === uid);
  const allPayments = Payment.all().filter((p) => p.freelancerId === uid);
  const allNotifications = Notification.all().filter((n) => n.userId === uid);
  const jobsById = Object.fromEntries(Job.all().map((job) => [job.id, job]));

  const totalEarned = allPayments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + Number(p.amount || 0), 0);
  const activeProjects = allProjects.filter(
    (p) => p.status === "active",
  ).length;
  const completedProjects = allProjects.filter(
    (p) => p.status === "completed",
  ).length;
  const activeProposals = allProposals.filter(
    (p) => p.status === "pending",
  ).length;

  // simple recent activity: payments (paid), proposals (created), projects (updated)
  const activity = [];
  for (const pay of allPayments) {
    if (pay.status === "paid")
      activity.push({
        type: "payment",
        message: `Payment received ${pay.amount || 0}`,
        date: pay.releasedAt || pay.updatedAt || pay.createdAt,
        refId: pay.id,
      });
  }
  for (const pr of allProposals) {
    const job = jobsById[pr.jobId];
    const jobName = job?.title || pr.jobTitle || "Unknown job";
    activity.push({
      type: "proposal",
      message: `Proposal ${pr.status || ""} for job ${jobName}`,
      date: pr.updatedAt || pr.createdAt,
      refId: pr.id,
    });
  }
  for (const pj of allProjects) {
    activity.push({
      type: "project",
      message: `Project ${pj.status || ""}: ${pj.title || ""}`,
      date: pj.updatedAt || pj.createdAt,
      refId: pj.id,
    });
  }
  activity.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  const projects = allProjects
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0),
    )
    .slice(0, 10);
  const proposals = allProposals
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0),
    )
    .slice(0, 10)
    .map((proposal) => {
      const job = jobsById[proposal.jobId];
      const jobTitle = job?.title || proposal.jobTitle || "Job Proposal";
      return {
        ...proposal,
        title: jobTitle,
        jobTitle,
        job: job
          ? { id: job.id, title: job.title, clientId: job.clientId }
          : proposal.job || null,
      };
    });
  const recentActivity = activity.slice(0, 10);
  const notifications = allNotifications
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0),
    )
    .slice(0, 10);

  return {
    user: userSafe,
    stats: { totalEarned, activeProjects, completedProjects, activeProposals },
    projects,
    proposals,
    recentActivity,
    notifications,
  };
}

function getProjects(user) {
  const uid = user.id;
  const u = User.findById(uid);
  if (!u) throw Object.assign(new Error("User not found"), { status: 404 });
  // Return only projects that belong to this freelancer
  return Project.all().filter((p) => p.freelancerId === uid);
}

function getProject(id, user) {
  const uid = user.id;
  const u = User.findById(uid);
  if (!u) throw Object.assign(new Error("User not found"), { status: 404 });
  const p = Project.findById(id);
  if (!p || p.freelancerId !== uid)
    throw Object.assign(new Error("Project not found"), { status: 404 });
  return p;
}

module.exports = { dashboard, getProjects, getProject };
