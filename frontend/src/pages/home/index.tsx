import { JobsSection } from "./sections/jobs-section";
import { ListUsersSection } from "./sections/list-users-section";

export const Home = () => {
  return (
    <div className="flex flex-row h-screen bg-white p-4 gap-4">
      <ListUsersSection />
      <JobsSection />
    </div>
  );
};
