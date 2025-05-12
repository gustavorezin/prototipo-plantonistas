import { SectionCard } from "@commons/components/section-card";
import { Button } from "@commons/components/ui/button";
import { CardJob } from "../components/card-job";
import { IJob, jobsService } from "@services/jobs-service";
import { useCallback, useEffect, useState } from "react";

export const JobsSection = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);

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
            <CardJob {...job} />
          ))}
        </div>
        <Button title="Cadastrar nova vaga" />
      </SectionCard.Content>
    </SectionCard.Root>
  );
};
