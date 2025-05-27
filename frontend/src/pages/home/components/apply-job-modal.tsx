import { Button } from "@commons/components/ui/button";
import { dateUtil } from "@commons/utils/date-util";
import { applicationService } from "@services/applications-service";
import { IJob } from "@services/jobs-service";
import { toast } from "sonner";

interface ApplyJobModalProps {
  job: IJob | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyJobModal = ({ job, isOpen, onClose }: ApplyJobModalProps) => {
  const handleClickApply = async () => {
    await applicationService.create(job!.id);
    toast.success("Candidatura enviada com sucesso!");
    onClose();
  };

  if (!isOpen || !job) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-primary">
          Candidatar-se à vaga
        </h2>

        <div className="mb-4 text-sm text-gray-700 space-y-1">
          <p>
            <strong>Vaga:</strong> {job.title}
          </p>
          <p>
            <strong>Descrição:</strong> {job.description || "Sem descrição"}
          </p>
          <p>
            <strong>Início:</strong>{" "}
            {dateUtil.formatDateTimeIsoString(job.startTime)}
          </p>
          <p>
            <strong>Término:</strong>{" "}
            {dateUtil.formatDateTimeIsoString(job.endTime)}
          </p>
        </div>

        <Button onClick={handleClickApply} title="Candidatar-se" />
      </div>
    </div>
  );
};
