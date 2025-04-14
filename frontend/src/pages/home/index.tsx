import { SectionCard } from "@commons/components/section-card";
import { useAuth } from "@commons/hooks/use-auth";
import { doctorsService, IDoctor } from "@services/doctors-service";
import { hospitalsService, IHospital } from "@services/hospitals-service";
import { useEffect, useState } from "react";
import { HospitalOrDoctorList } from "./components/hospital-or-doctor-list";
import { RequestModal } from "./components/request-modal";
import {
  IRequest,
  IRequestStatus,
  requestsService,
} from "@services/requests-service";
import { CardRequest } from "./components/card-request";

export const Home = () => {
  const { user } = useAuth();
  const userType = user?.userType;
  const isUserDoctor = userType === "DOCTOR";
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceiver, setSelectedReceiver] = useState<
    IHospital | IDoctor | null
  >(null);
  const [filterRequest, setFilterRequest] = useState<IRequestStatus | "">("");

  const handleCardClick = (receiver: IHospital | IDoctor) => {
    setSelectedReceiver(receiver);
    setIsModalOpen(true);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName = doctor.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter
      ? doctor.available?.toString() === filter
      : true;
    return matchesName && matchesFilter;
  });

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesName = hospital.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter
      ? hospital.hiring?.toString() === filter
      : true;
    return matchesName && matchesFilter;
  });

  const filteredRequests = requests.filter((request) => {
    const matchesStatus =
      filterRequest != "" ? request.status == filterRequest : true;
    return matchesStatus;
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = isUserDoctor
        ? await hospitalsService.list()
        : await doctorsService.list();
      if (isUserDoctor) {
        setHospitals(response.data as IHospital[]);
      } else {
        setDoctors(response.data as IDoctor[]);
      }
    };

    const fetchRequests = async () => {
      const response = isUserDoctor
        ? await requestsService.listByDoctor(user?.id || "")
        : await requestsService.listByHospital(user?.id || "");
      setRequests(response.data);
    };

    fetchUsers();
    fetchRequests();
  }, [isUserDoctor, user?.id]);

  return (
    <div className="flex flex-row h-screen bg-white p-4 gap-4">
      <SectionCard.Root className="basis-2/3">
        <SectionCard.Header>
          Solicitar {isUserDoctor ? "hospital" : "médico"}
        </SectionCard.Header>
        <div className="flex flex-row gap-4 my-4">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todos</option>
            <option value="true">
              {isUserDoctor ? "Contratando" : "Disponível"}
            </option>
            <option value="false">
              {isUserDoctor ? "Não contratando" : "Indisponível"}
            </option>
          </select>
        </div>
        <SectionCard.Content>
          <HospitalOrDoctorList
            userType={userType}
            items={isUserDoctor ? filteredHospitals : filteredDoctors}
            onCardClick={handleCardClick}
          />
          {selectedReceiver && userType && (
            <RequestModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              userType={userType}
              receiver={selectedReceiver}
              onSend={(message) => {
                console.log("Mensagem enviada:", message);
              }}
            />
          )}
        </SectionCard.Content>
      </SectionCard.Root>

      <SectionCard.Root className="basis-1/3">
        <SectionCard.Header>Solicitações realizadas</SectionCard.Header>
        <div className="my-4">
          <select
            value={filterRequest}
            onChange={(e) => setFilterRequest(e.target.value as IRequestStatus)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todos</option>
            <option value="PENDING">Pendentes</option>
            <option value="ACCEPTED">Aceitos</option>
            <option value="REJECTED">Rejeitados</option>
            <option value="CANCELLED">Cancelados</option>
            <option value="CONTRACTED">Contratados</option>
          </select>
        </div>
        <SectionCard.Content>
          {filteredRequests.map((request) => (
            <CardRequest
              key={request.id}
              name="Nome do médico ou hospital"
              message={request.message}
              status={request.status}
              onClick={() => console.log("clicou")}
            />
          ))}
        </SectionCard.Content>
      </SectionCard.Root>
    </div>
  );
};
