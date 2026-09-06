const API_URL = "http://localhost:5000/api";

export const getClientDashboard = async () => {
    const token = localStorage.getItem("lynk_token");

    const response = await fetch(`${API_URL}/client/dashboard`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to load dashboard"
        );
    }

    return data;
};

export const updateMilestone = async (
    projectId,
    milestoneId,
    status
) => {
    const token = localStorage.getItem("lynk_token");

    const response = await fetch(
        `${API_URL}/projects/${projectId}/milestones/${milestoneId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                status,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update milestone"
        );
    }

    return data;
};