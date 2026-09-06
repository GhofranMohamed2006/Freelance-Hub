import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layouts/PublicLayout";
import ClientLayout from "./components/layouts/ClientLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import PostJob from "./components/client/PostJob";
import ClientDashboard from "./components/client/ClientDashboard";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/public/Home";

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected pages - client role only */}
      <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
        <Route element={<ClientLayout />}>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/post-job" element={<PostJob />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;