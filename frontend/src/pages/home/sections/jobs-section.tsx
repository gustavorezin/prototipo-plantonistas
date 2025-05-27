import { SectionCard } from "@commons/components/section-card";
import { Button } from "@commons/components/ui/button";
import { CardJob } from "../components/card-job";
import { IJob, jobsService } from "@services/jobs-service";
import { useCallback, useEffect, useState } from "react";
import { NewJobModal } from "../components/new-job-modal";
import { EditJobModal } from "../components/edit-job-modal";

interface JobsSectionProps {
  isUserDoctor: boolean;
}

export const JobsSection = ({ isUserDoctor }: JobsSectionProps) => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [editJob, setEditJob] = useState<IJob | null>(null);
  const [isModalNewJobOpen, setIsModalNewJobOpen] = useState(false);
  const [isModalEditJobOpen, setIsModalEditJobOpen] = useState(false);

  const handleCardClick = (job: IJob) => {
    setEditJob(job);
    setIsModalEditJobOpen(true);
  };

  const fetchJobs = useCallback(async () => {
    const response = isUserDoctor
      ? await jobsService.list()
      : await jobsService.listByHospital();
    setJobs(response.data);
  }, [isUserDoctor]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <SectionCard.Root className="basis-1/3">
      <SectionCard.Header>
        Vagas {isUserDoctor ? "disponíveis" : "cadastradas"}
      </SectionCard.Header>
      <SectionCard.Content>
        <div className="flex flex-1 flex-col gap-4 my-4">
          {jobs.map((job) => (
            <CardJob
              {...job}
              key={job.id}
              onClick={() => handleCardClick(job)}
            />
          ))}
        </div>
      </SectionCard.Content>
      <SectionCard.Footer>
        <Button
          title="Cadastrar nova vaga"
          onClick={() => setIsModalNewJobOpen(true)}
        />
      </SectionCard.Footer>
      <NewJobModal
        isOpen={isModalNewJobOpen}
        onClose={() => {
          setIsModalNewJobOpen(false);
          fetchJobs();
        }}
      />
      <EditJobModal
        isOpen={isModalEditJobOpen}
        onClose={() => {
          setIsModalEditJobOpen(false);
          fetchJobs();
        }}
        job={editJob}
      />
    </SectionCard.Root>
  );
};
