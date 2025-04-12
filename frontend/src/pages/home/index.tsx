import { SectionCard } from "@commons/components/section-card";
import { useAuth } from "@commons/hooks/use-auth";
import { doctorsService, IDoctor } from "@services/doctors-service";
import { hospitalsService, IHospital } from "@services/hospitals-service";
import { useEffect, useState } from "react";
import { HospitalOrDoctorList } from "./components/hospital-or-doctor-list";
import { RequestModal } from "./components/request-modal";

export const Home = () => {
  const { user } = useAuth();
  const userType = user?.userType;
  const isUserDoctor = userType === "DOCTOR";
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceiver, setSelectedReceiver] = useState<
    IHospital | IDoctor | null
  >(null);

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

    fetchUsers();
  }, [isUserDoctor]);

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
      </SectionCard.Root>
    </div>
  );
};
