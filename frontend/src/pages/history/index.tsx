import { useAuth } from "@commons/hooks/use-auth";

export const History = () => {
  const { user } = useAuth();
  const userType = user?.userType;
  const isUserDoctor = userType === "DOCTOR";

  return (
    <div className="flex flex-row h-screen bg-white p-4 gap-4">
      {/* <ListUsersSection isUserDoctor={isUserDoctor} />
      <JobsSection /> */}
    </div>
  );
};
