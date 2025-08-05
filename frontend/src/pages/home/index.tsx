import { useAuth } from "@commons/hooks/use-auth";
import { JobsSection } from "./sections/jobs-section";
import { ListUsersSection } from "./sections/list-users-section";

export const Home = () => {
  const { user } = useAuth();
  const userType = user?.userType;
  const isUserDoctor = userType === "DOCTOR";

  return (
    <div className="flex flex-col md:flex-row md:h-screen bg-white p-4 gap-4">
      <ListUsersSection isUserDoctor={isUserDoctor} />
      <JobsSection />
    </div>
  );
};
