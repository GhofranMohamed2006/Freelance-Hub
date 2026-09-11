const Job = require("../models/Job");
const Proposal = require("../models/Proposal");
const { id, now, pick } = require("../utils/helpers");

const fields = [
    "title",
    "description",
    "categoryId",
    "category",
    "skills",
    "budget",
    "budgetType",
    "minBudget",
    "maxBudget",
    "hourlyRateMin",
    "hourlyRateMax",
    "projectDuration",
    "experienceLevel",
    "duration",
    "attachments",
    "status",
    "visibility",
];

function get(i) {
    const x = Job.findById(i);

    if (!x) {
        throw Object.assign(
            new Error("Job not found"),
            { status: 404 }
        );
    }

    const proposalsCount = Proposal
        .all()
        .filter((proposal) => proposal.jobId === x.id)
        .length;

    return {
        ...x,
        proposalsCount,
    };
}
function create(b, userId) { if (!b.title || !b.description) throw Object.assign(new Error("Title and description are required"), { status: 400 }); return Job.create({ id: id(), ...pick(b, fields), clientId: userId, status: b.status || "open", views: 0, createdAt: now(), updatedAt: now() }); }
function update(i, b, userId) { const x = get(i); if (x.clientId !== userId) throw Object.assign(new Error("Only the job owner can edit it"), { status: 403 }); return Job.update(i, { ...pick(b, fields), updatedAt: now() }); }
function remove(i, userId) { const x = get(i); if (x.clientId !== userId) throw Object.assign(new Error("Only the job owner can delete it"), { status: 403 }); Job.delete(i); }
function view(i) { const x = get(i); return Job.update(i, { views: Number(x.views || 0) + 1, updatedAt: now() }); }
module.exports = { list, get, create, update, remove, view };
