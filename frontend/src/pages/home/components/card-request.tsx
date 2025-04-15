import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { IRequestStatus } from "@services/requests-service";

interface CardRequestProps {
  name: string;
  message?: string;
  status: IRequestStatus;
  onStatusChange?: (newStatus: IRequestStatus) => void;
}

const STATUS_MAP = {
  PENDING: { label: "Pendente", bg: "bg-yellow-100", text: "text-yellow-700" },
  ACCEPTED: { label: "Aceito", bg: "bg-blue-100", text: "text-blue-700" },
  REJECTED: { label: "Rejeitado", bg: "bg-red-100", text: "text-red-700" },
  CANCELLED: { label: "Cancelado", bg: "bg-gray-200", text: "text-gray-700" },
  CONTRACTED: {
    label: "Contratado",
    bg: "bg-green-100",
    text: "text-green-700",
  },
} as const;

export const CardRequest = ({
  name,
  message = "",
  status,
  onStatusChange,
}: CardRequestProps) => {
  const [currentStatus, setCurrentStatus] = useState<IRequestStatus>(status);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as IRequestStatus;
    setCurrentStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const { bg, text } = STATUS_MAP[currentStatus] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  return (
    <div className="flex flex-col mb-4 justify-between bg-white rounded-2xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
        <div className="relative">
          <select
            value={currentStatus}
            onChange={handleChange}
            className={`${bg} ${text} pr-6 pl-2 py-0.5 text-xs font-medium rounded-full appearance-none border-none focus:outline-none cursor-pointer`}
          >
            {Object.entries(STATUS_MAP).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-white text-gray-800">
                {label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className={`absolute right-1 top-3.5 -translate-y-1/2 pointer-events-none ${text}`}
          />
        </div>
      </div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};
