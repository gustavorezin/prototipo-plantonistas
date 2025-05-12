import { dateUtil } from "@commons/utils/date-util";
import { JobStatus } from "@services/jobs-service";
import { ISpecialty } from "@services/specialties-service";

interface CardJobProps {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  slots: number;
  filledSlots: number;
  status: JobStatus;
  specialties: ISpecialty[];
}

const STATUS_JOB_MAP = {
  OPEN: { label: "Aberto", bg: "bg-green-100", text: "text-green-700" },
  CLOSED: { label: "Fechado", bg: "bg-yellow-100", text: "text-yellow-700" },
  CANCELLED: { label: "Cancelado", bg: "bg-gray-200", text: "text-gray-700" },
  COMPLETED: {
    label: "Completado",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
} as const;

export const CardJob = ({
  id,
  title,
  description = "",
  startTime,
  endTime,
  slots,
  filledSlots,
  status,
  specialties,
}: CardJobProps) => {
  return (
    <div
      key={id}
      onClick={() => {}}
      className="flex flex-col justify-between bg-white rounded-2xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex flex-col gap-2 relative">
        <div
          className={`absolute top-0 right-0 rounded-full px-2 py-1 text-xs font-semibold ${STATUS_JOB_MAP[status].bg} ${STATUS_JOB_MAP[status].text}`}
        >
          {status}
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
        </div>
      </div>
    </div>
  );
};
