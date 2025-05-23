import { SectionCard } from "@commons/components/section-card";
import { Button } from "@commons/components/ui/button";
import { CardJob } from "../components/card-job";
import { IJob, jobsService } from "@services/jobs-service";
import { useCallback, useEffect, useState } from "react";
import { NewJobModal } from "../components/new-job-modal";

export const JobsSection = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchJobs = useCallback(async () => {
    const response = await jobsService.listByHospital();
    setJobs(response.data);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  return (
    <SectionCard.Root className="basis-1/3">
      <SectionCard.Header>Vagas cadastradas</SectionCard.Header>
      <SectionCard.Content>
        <div className="flex flex-1 flex-col gap-4 my-4">
          {jobs.map((job) => (
            <CardJob {...job} key={job.id} />
          ))}
        </div>
      </SectionCard.Content>
      <SectionCard.Footer>
        <Button
          title="Cadastrar nova vaga"
          onClick={() => setIsModalOpen(true)}
        />
        <NewJobModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            fetchJobs();
          }}
        />
      </SectionCard.Footer>
    </SectionCard.Root>
  );
};
