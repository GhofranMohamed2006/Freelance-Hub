import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layouts/PublicLayout";
import ClientLayout from "./components/layouts/ClientLayout";
import FreelancerLayout from "./components/layouts/FreelancerLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";

// Client Pages
import PostJob from "./pages/client/PostJob";
import ClientDashboard from "./pages/client/ClientDashboard";
import FindTalent from "./pages/client/FindTalent";
import ProposalsPage from "./pages/public/freelancer/ProposalsPage";

// Freelancer Pages
import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard";
import FreelancerProjects from "./pages/freelancer/FreelancerProjects";
import FreelancerProjectWorkspace from "./pages/freelancer/FreelancerProjectWorkspace";
import FreelancerProfile from "./components/freelancer/FreelancerProfile";
import SubmitProposalPage from "./pages/public/freelancer/ProposalForm";
import FindWork from "./pages/freelancer/FindWork";
import WorkDetails from "./pages/freelancer/workDetails";

// Auth & Public Pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/public/Home";
import AccountSettings from "./pages/auth/AccountSettings";

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/freelancer/:id"
          element={<FreelancerProfile />}
        />
        <Route path="/settings" element={<AccountSettings />} />
      </Route>

      {/* Protected pages - client role only */}
      <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
        <Route element={<ClientLayout />}>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/find-talents" element={<FindTalent />} />

          {/* Client View Proposals */}
          <Route path="/jobs/:jobId/proposals" element={<ProposalsPage />} />
          <Route path="/proposals" element={<ProposalsPage />} />
        </Route>
      </Route>

      {/* Protected pages - freelancer role only */}
      <Route element={<ProtectedRoute allowedRoles={["freelancer"]} />}>
        <Route element={<FreelancerLayout />}>
          <Route
            path="/freelancer/dashboard"
            element={<FreelancerDashboard />}
          />
          <Route
            path="/freelancer/projects/:id"
            element={<FreelancerProjectWorkspace />}
          />
          <Route path="/freelancer/projects" element={<FreelancerProjects />} />

          {/* Freelancer Proposals Management & Submission */}
          <Route path="/jobs/:jobId/apply" element={<SubmitProposalPage />} />
          <Route path="/freelancer/proposals" element={<SubmitProposalPage />} />

          <Route path="/freelancer/find-work" element={<FindWork />} />
          <Route path="/jobs/:jobId" element={<WorkDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;