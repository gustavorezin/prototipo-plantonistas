import { IDoctor } from "@services/doctors-service";
import { IHospital } from "@services/hospitals-service";
import { specialtiesService } from "@services/specialties-service";
import { usersService } from "@services/users-service";
import { useCallback, useEffect, useState } from "react";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSend: (message: string) => void;
}

export const UserModal = ({
  isOpen,
  onClose,
  userId,
  onSend,
}: UserModalProps) => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<IDoctor | IHospital | null>(null);

  const fetchUser = useCallback(async () => {
    const response = await usersService.show(userId);
    const userData = response.data;
    if (userData.userType === "DOCTOR") {
      const specialties = await specialtiesService.listByDoctorId(userData.id);
      userData.doctor!.specialties = specialties.data.map((s) => s.name);
      setUser(userData.doctor!);
    } else {
      setUser(userData.hospital!);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!isOpen || !user) return null;
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-primary">{user.name}</h2>

        <div className="mb-3 text-sm text-gray-700 space-y-1">
          {"specialties" in user && (
            <p>
              <strong>Especialidade:</strong>{" "}
              {user.specialties.length > 0
                ? user.specialties.join(", ")
                : "Sem especialidade"}
            </p>
          )}
          {"crm" in user && (
            <p>
              <strong>CRM:</strong> {user.crm}
            </p>
          )}
          <p>
            <strong>Telefone:</strong> {user.phone}
          </p>
          {"address" in user && (
            <p>
              <strong>Endereço:</strong> {user.address}
            </p>
          )}
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
