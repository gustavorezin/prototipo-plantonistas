import { Button } from "@commons/components/ui/button";
import { dateUtil } from "@commons/utils/date-util";
import {
  applicationService,
  ApplicationStatus,
} from "@services/applications-service";
import { IJob } from "@services/jobs-service";
import { toast } from "sonner";

const STATUS_MAP = {
  PENDING: {
    label: "Pendente",
    text: "text-yellow-700",
    bg: "bg-yellow-100",
  },
  ACCEPTED: {
    label: "Aceito",
    text: "text-green-700",
    bg: "bg-green-100",
  },
  REJECTED: {
    label: "Recusado",
    text: "text-red-700",
    bg: "bg-red-100",
  },
  CANCELLED: {
    label: "Cancelado",
    text: "text-red-700",
    bg: "bg-red-100",
  },
} as const;

interface ApplyJobModalProps {
  job: IJob | null;
  isOpen: boolean;
  onClose: () => void;
  applicationStatus?: ApplicationStatus;
}

export const ApplyJobModal = ({
  job,
  isOpen,
  onClose,
  applicationStatus,
}: ApplyJobModalProps) => {
  const handleClickApply = async () => {
    await applicationService.create(job!.id);
    toast.success("Candidatura enviada com sucesso!");
    onClose();
  };

  if (!isOpen || !job) return null;

  const status = job.status === "CANCELLED" ? job.status : applicationStatus;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl max-h-[calc(100vh-2rem)] overflow-auto"
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
            <strong>Especialidades:</strong>{" "}
            {job.specialties.map((s) => s.name).join(", ") || "Nenhuma"}
          </p>
          <p>
            <strong>Hospital:</strong> {job.hospital?.name}
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

        {status && (
          <div
            className={`px-6 py-3 rounded-2xl font-medium text-lg text-center ${STATUS_MAP[status].bg} ${STATUS_MAP[status].text}`}
          >
            {STATUS_MAP[status].label}
          </div>
        )}

        {!status && <Button onClick={handleClickApply} title="Candidatar-se" />}
      </div>
    </div>
  );
};
