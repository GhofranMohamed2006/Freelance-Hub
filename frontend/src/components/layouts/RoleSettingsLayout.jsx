import { useAuth } from "../context/AuthContext";
import ClientLayout from "./ClientLayout";
import FreelancerLayout from "./FreelancerLayout";

const RoleSettingsLayout = () => {
  const { user } = useAuth();

  if (user?.role === "freelancer") return <FreelancerLayout />;
  return <ClientLayout />;
};

export default RoleSettingsLayout;
