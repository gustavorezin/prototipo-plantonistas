import { IRequestStatus } from "@services/requests-service";

interface CardRequestProps {
  name: string;
  message?: string;
  status: IRequestStatus;
  onClick?: () => void;
}

const STATUS_MAP = {
  PENDING: { label: "Pendente", bg: "bg-yellow-100", text: "text-yellow-700" },
  ACCEPTED: { label: "Aceito", bg: "bg-blue-100", text: "text-blue-700" },
  REJECTED: { label: "Rejeitado", bg: "bg-red-100", text: "text-red-700" },
  CANCELLED: { label: "Cancelado", bg: "bg-gray-100", text: "text-gray-700" },
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
  onClick,
}: CardRequestProps) => {
  const { label, bg, text } = STATUS_MAP[status] || {
    label: status,
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col mb-4 justify-between bg-white rounded-2xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
        <span
          className={`${bg} ${text} px-2 py-0.5 text-xs font-medium rounded-full`}
        >
          {label}
        </span>
      </div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};
