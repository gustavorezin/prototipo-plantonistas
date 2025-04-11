import { useState } from "react";
import { IHospital } from "../services/hospitals-service";
import { IDoctor } from "../services/doctors-service";

type RequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userType: "DOCTOR" | "HOSPITAL";
  receiver: IHospital | IDoctor;
  onSend: (message: string) => void;
};

export const RequestModal = ({
  isOpen,
  onClose,
  userType,
  receiver,
  onSend,
}: RequestModalProps) => {
  const [message, setMessage] = useState("");

  if (!isOpen || !receiver) return null;

  const isDoctorRequesting = userType === "DOCTOR";

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">
          {isDoctorRequesting
            ? "Solicitar vínculo com hospital"
            : "Convidar médico para o hospital"}
        </h2>

        <div className="mb-3 text-sm text-gray-700 space-y-1">
          <p>
            <strong>Nome:</strong> {receiver.name}
          </p>
          {"crm" in receiver && (
            <p>
              <strong>CRM:</strong> {receiver.crm}
            </p>
          )}
          {"specialty" in receiver && (
            <p>
              <strong>Especialidade:</strong> {receiver.specialty}
            </p>
          )}
          <p>
            <strong>Telefone:</strong> {receiver.phone}
          </p>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensagem opcional..."
          className="w-full border border-gray-300 rounded-md p-2 text-sm mb-4"
          rows={4}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSend(message);
              setMessage("");
              onClose();
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
          >
            Enviar solicitação
          </button>
        </div>
      </div>
    </div>
  );
};
