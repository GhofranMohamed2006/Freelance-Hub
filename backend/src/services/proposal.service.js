const Proposal = require("../models/Proposal");
const Job = require("../models/Job");
const User = require("../models/User");
const { id, now, pick } = require("../utils/helpers");
function list(q, user) {
  let a = Proposal.all();

  if (q.jobId) {
    const targetJobId = String(q.jobId);
    a = a.filter((x) => String(x.jobId) === targetJobId);
  }

  if (q.freelancerId) {
    const targetFreelancerId = String(q.freelancerId);
    a = a.filter((x) => String(x.freelancerId) === targetFreelancerId);
  }

  if (q.status) a = a.filter((x) => x.status === q.status);

  if (user && user.role === "freelancer")
    a = a.filter((x) => String(x.freelancerId) === String(user.id));

  if (user && user.role === "client") {
    a = a.filter((x) => {
      const job = Job.findById(x.jobId);
      return job && job.clientId === user.id;
    });
  }

  return a.map((proposal) => {
    const freelancer = User.findById(proposal.freelancerId);
    const job = Job.findById(proposal.jobId);
    const jobTitle = job?.title || proposal.jobTitle || "Job Proposal";
    return {
      ...proposal,
      title: jobTitle,
      jobTitle,
      job: job
        ? { id: job.id, title: job.title, clientId: job.clientId }
        : null,
      freelancer: freelancer
        ? { id: freelancer.id, name: freelancer.name, email: freelancer.email }
        : null,
    };
  });
}
function get(i) {
  const x = Proposal.findById(i);

  if (!x) {
    throw Object.assign(new Error("Proposal not found"), { status: 404 });
  }

  return x;
}
function create(b, userId) {
  const job = Job.findById(b.jobId);
  if (!job) throw Object.assign(new Error("Job not found"), { status: 404 });
  if (job.clientId === userId)
    throw Object.assign(new Error("You cannot apply to your own job"), {
      status: 400,
    });
  if (
    Proposal.all().some((x) => x.jobId === job.id && x.freelancerId === userId)
  )
    throw Object.assign(
      new Error("You already submitted a proposal for this job"),
      { status: 409 },
    );
  if (b.bid === undefined || b.bid === null || b.bid === "") {
    throw Object.assign(new Error("Proposed Rate is required"), {
      status: 400,
    });
  }
  return Proposal.create({
    id: id(),
    jobId: job.id,
    jobTitle: job.title,
    freelancerId: userId,
    bid: Number(b.bid),
    estimatedCompletionTime: b.estimatedCompletionTime || "",
    coverLetter: b.coverLetter || "",
    skills: b.skills || [],
    status: "pending",
    createdAt: now(),
    updatedAt: now(),
  });
}
function update(i, b, user) {
  const p = get(i),
    job = Job.findById(p.jobId);
  const isFreelancer = p.freelancerId === user.id,
    isClient = job && job.clientId === user.id;
  if (!isFreelancer && !isClient)
    throw Object.assign(new Error("Not allowed"), { status: 403 });
  const patch = isFreelancer
    ? pick(b, ["bid", "estimatedCompletionTime", "coverLetter", "skills"])
    : pick(b, ["status"]);
  return Proposal.update(i, { ...patch, updatedAt: now() });
}
function remove(i, userId) {
  const p = get(i);
  if (p.freelancerId !== userId)
    throw Object.assign(new Error("Not allowed"), { status: 403 });
  Proposal.delete(i);
}
module.exports = { list, get, create, update, remove };
