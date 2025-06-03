import { dateUtil } from "@commons/utils/date-util";
import { ApplicationStatus } from "@services/applications-service";
import { JobStatus } from "@services/jobs-service";
import { ISpecialty } from "@services/specialties-service";

const STATUS_JOB_MAP = {
  OPEN: { label: "Aberta", bg: "bg-green-100", text: "text-green-700" },
  CLOSED: { label: "Fechada", bg: "bg-yellow-100", text: "text-yellow-700" },
  CANCELLED: { label: "Cancelada", bg: "bg-red-100", text: "text-red-700" },
  COMPLETED: {
    label: "Concluída",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
} as const;

const APPLICATION_STATUS_MAP = {
  PENDING: {
    label: "Pendente",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  ACCEPTED: {
    label: "Aceito",
    bg: "bg-green-100",
    text: "text-green-700",
  },
  REJECTED: {
    label: "Recusado",
    bg: "bg-red-100",
    text: "text-red-700",
  },
} as const;

interface CardJobProps {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  slots: number;
  filledSlots: number;
  status: JobStatus;
  specialties: ISpecialty[];
  onClick?: () => void;
  isUserDoctor: boolean;
  applicationStatus?: ApplicationStatus;
  applicationsCount?: number;
}

export const CardJob = ({
  title,
  description = "",
  startTime,
  endTime,
  slots,
  filledSlots,
  status,
  specialties,
  onClick,
  isUserDoctor,
  applicationStatus,
  applicationsCount = 0,
}: CardJobProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-between bg-white rounded-2xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex flex-col gap-2 relative">
        {isUserDoctor && applicationStatus && (
          <div
            className={`absolute -top-6 -left-2 rounded-full px-2 py-1 text-xs font-semibold ${APPLICATION_STATUS_MAP[applicationStatus].bg} ${APPLICATION_STATUS_MAP[applicationStatus].text}`}
          >
            {APPLICATION_STATUS_MAP[applicationStatus].label}
          </div>
        )}

        <div
          className={`absolute top-0 right-0 rounded-full px-2 py-1 text-xs font-semibold ${STATUS_JOB_MAP[status].bg} ${STATUS_JOB_MAP[status].text}`}
        >
          {STATUS_JOB_MAP[status].label}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          <div className="line-clamp-1 -mx-2">
            {specialties.map((spec, i) => (
              <span
                key={i}
                className="text-xs text-sky-900 bg-sky-100 px-2 rounded-full mr-1"
              >
                {spec.name}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <p className="text-sm text-gray-500 font-bold">
          {dateUtil.formatDateTimeIsoString(startTime)} -{" "}
          {dateUtil.formatDateTimeIsoString(endTime)}
        </p>
        {!isUserDoctor && (
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Vagas:{" "}
                <span className="font-bold bg-gray-300 px-2 rounded-full">
                  {slots}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Preenchido:{" "}
                <span className="font-bold bg-green-100 text-green-700 px-2 rounded-full">
                  {filledSlots}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Candidatos:{" "}
                <span className="font-bold bg-blue-100 text-blue-700 px-2 rounded-full">
                  {applicationsCount}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
