import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layouts/PublicLayout";
import ClientLayout from "./components/layouts/ClientLayout";
import FreelancerLayout from "./components/layouts/FreelancerLayout";
import RoleSettingsLayout from "./components/layouts/RoleSettingsLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import PostJob from "./pages/client/PostJob";
import ClientDashboard from "./pages/client/ClientDashboard";
import FindTalent from "./pages/client/FindTalent";
import MyJobs from "./pages/client/MyJobs";
import OngoingProjects from "./pages/client/OngoingProjects";
import ProjectDetails from "./pages/client/ProjectDetails";
import JobDetails from "./pages/client/JobDetails";
import ClientMessages from "./pages/client/ClientMessages";
import ProposalsPage from "./pages/public/freelancer/ProposalsPage";

import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard";
import FreelancerProjects from "./pages/freelancer/FreelancerProjects";
import FreelancerProjectWorkspace from "./pages/freelancer/FreelancerProjectWorkspace";
import FreelancerProfile from "./components/freelancer/FreelancerProfile";
import FreelancerMyProfile from "./pages/freelancer/FreelancerMyProfile";
import FreelancerEarnings from "./pages/freelancer/FreelancerEarnings";
import FreelancerProposals from "./pages/freelancer/FreelancerProposals";
import SubmitProposalPage from "./pages/public/freelancer/ProposalForm";
import FindWork from "./pages/freelancer/FindWork";
import FreelancerMessages from "./pages/freelancer/FreelancerMessages";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/public/Home";
import PublicFreelancers from "./pages/public/Freelancers";
import PublicProjects from "./pages/public/Projects";
import AccountSettings from "./pages/shared/AccountSettings";
import Notifications from "./pages/shared/Notifications";
import NotFound from "./components/errors/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/freelancer/:id" element={<FreelancerProfile />} />
        <Route path="/freelancers" element={<PublicFreelancers />} />
        <Route path="/projects" element={<PublicProjects />} />
        <Route path="/find-work" element={<PublicProjects />} />
        <Route path="/find-talent" element={<PublicFreelancers />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
        <Route element={<ClientLayout />}>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/find-talents" element={<FindTalent />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/ongoingProjects" element={<OngoingProjects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/jobs/:jobId/proposals" element={<ProposalsPage />} />
          <Route path="/proposals" element={<ProposalsPage />} />
          <Route path="/messages" element={<ClientMessages />} />
          <Route path="/client-settings" element={<AccountSettings />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["freelancer"]} />}>
        <Route element={<FreelancerLayout />}>
          <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
          <Route path="/freelancer/projects" element={<FreelancerProjects />} />
          <Route path="/freelancer/projects/:id" element={<FreelancerProjectWorkspace />} />
          <Route path="/jobs/:jobId/apply" element={<SubmitProposalPage />} />
          <Route path="/freelancer/proposals" element={<FreelancerProposals />} />
          <Route path="/freelancer/find-work" element={<FindWork />} />
          <Route path="/freelancer/messages" element={<FreelancerMessages />} />
          <Route path="/freelancer/earnings" element={<FreelancerEarnings />} />
          <Route path="/freelancer/profile" element={<FreelancerMyProfile />} />
          <Route path="/freelancer/settings" element={<AccountSettings />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["client", "freelancer"]} />}>
        <Route element={<RoleSettingsLayout />}>
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
