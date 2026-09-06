const Job = require("../models/Job");
const Proposal = require("../models/Proposal");
const Project = require("../models/Project");

function getDashboard(userId) {
    // -------------------------
    // Client Jobs
    // -------------------------
    const clientJobs = Job.all().filter(
        (job) => job.clientId === userId
    );

    const activeJobs = clientJobs.filter(
        (job) => job.status === "open"
    );

    // -------------------------
    // Client Proposals
    // -------------------------
    const clientJobIds = new Set(
        clientJobs.map((job) => job.id)
    );

    const clientProposals = Proposal.all().filter(
        (proposal) => clientJobIds.has(proposal.jobId)
    );

    // -------------------------
    // Client Projects
    // -------------------------
    const clientProjects = Project.all().filter(
        (project) => project.clientId === userId
    );

    const ongoingProjects = clientProjects.filter(
        (project) => project.status === "active"
    );

    const completedProjects = clientProjects.filter(
        (project) => project.status === "completed"
    );

    // -------------------------
    // Milestone Approval Requests
    // -------------------------
    const milestoneRequests = [];

    clientProjects.forEach((project) => {
        (project.milestones || []).forEach((milestone) => {
            if (milestone.status === "pending") {
                milestoneRequests.push({
                    ...milestone,
                    projectId: project.id,
                    projectTitle: project.title,
                });
            }
        });
    });

    return {
        stats: {
            activeJobs: activeJobs.length,
            proposalsReceived: clientProposals.length,
            ongoingProjects: ongoingProjects.length,
            completedProjects: completedProjects.length,
        },

        activeJobs,

        milestoneRequests,

        recentProposals: clientProposals
            .sort(
                (a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
            )
            .slice(0, 5),
    };
}

module.exports = {
    getDashboard,
};