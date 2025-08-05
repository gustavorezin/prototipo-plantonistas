import { SectionCard } from "@commons/components/section-card";
import { IJob, jobsService } from "@services/jobs-service";
import { useCallback, useEffect, useState } from "react";
import {
  applicationService,
  IApplication,
} from "@services/applications-service";
import { useAuth } from "@commons/hooks/use-auth";
import { CardJob } from "@pages/home/components/card-job";
import { EditJobModal } from "@pages/home/components/edit-job-modal";

export const LastJobsSection = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [isModalEditJobOpen, setIsModalEditJobOpen] = useState(false);

  const { user } = useAuth();
  const userType = user?.userType;
  const isUserDoctor = userType === "DOCTOR";

  const handleCardClick = (job: IJob) => {
    if (isUserDoctor) return;
    setSelectedJob(job);
    setIsModalEditJobOpen(true);
  };

  const fetchJobs = useCallback(async () => {
    if (!userType) return;
    const response = isUserDoctor
      ? await jobsService.listByDoctor()
      : await jobsService.listByHospital();
    setJobs(response.data);

    const applicationsResponse = await applicationService.listByUser(userType);

    setApplications(applicationsResponse.data);
  }, [isUserDoctor, userType]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <SectionCard.Root className="w-full md:basis-1/3 h-full overflow-auto">
      <SectionCard.Header>Últimos plantões</SectionCard.Header>
      <SectionCard.Content>
        <div className="flex flex-1 flex-col gap-4 my-4">
          {jobs
            .filter((job) => job.status !== "OPEN")
            .sort(
              (a, b) =>
                new Date(b.startTime).getTime() -
                new Date(a.startTime).getTime()
            )
            .map((job) => {
              const application = applications.find(
                (app) => app.jobId === job.id
              );
              const applicationsCount = applications.filter(
                (app) => app.jobId === job.id
              ).length;
              return (
                <CardJob
                  {...job}
                  isUserDoctor={isUserDoctor}
                  key={job.id}
                  onClick={() => handleCardClick(job)}
                  applicationStatus={application?.status}
                  applicationsCount={applicationsCount}
                  hospitalName={job?.hospital?.name}
                />
              );
            })
            .sort()}
        </div>
      </SectionCard.Content>
      {selectedJob && (
        <EditJobModal
          isOpen={isModalEditJobOpen}
          onClose={() => {
            setIsModalEditJobOpen(false);
            fetchJobs();
            setSelectedJob(null);
          }}
          id={selectedJob.id}
        />
      )}
    </SectionCard.Root>
  );
};
