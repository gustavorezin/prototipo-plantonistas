import { useAuth } from "@commons/hooks/use-auth";
import { LastUsersSection } from "./sections/last-users-section";
import { LastJobsSection } from "./sections/last-jobs-section";

export const History = () => {
  const { user } = useAuth();
  const userType = user?.userType;
  const isUserDoctor = userType === "DOCTOR";

  return (
    <div className="flex flex-col md:flex-row md:h-screen bg-white p-4 gap-4">
      <LastUsersSection isUserDoctor={isUserDoctor} />
      <LastJobsSection />
    </div>
  );
};
