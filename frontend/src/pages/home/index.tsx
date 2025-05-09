import { SectionCard } from "@commons/components/section-card";
import { useAuth } from "@commons/hooks/use-auth";
import { doctorsService, IDoctor } from "@services/doctors-service";
import { hospitalsService, IHospital } from "@services/hospitals-service";
import { useCallback, useEffect, useState } from "react";
import { HospitalOrDoctorList } from "./components/hospital-or-doctor-list";
import { RequestModal } from "./components/request-modal";
import {
  IRequest,
  IRequestStatus,
  requestsService,
} from "@services/requests-service";
import { CardRequest } from "./components/card-request";
import { specialtiesService } from "@services/specialties-service";

export const Home = () => {
  const { user } = useAuth();
  const userType = user?.userType;
  const isUserDoctor = userType === "DOCTOR";
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterSpecialtyItens, setFilterSpecialtyItens] = useState<string[]>(
    []
  );
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
    const matchesFilter = filterSpecialty
      ? doctor.specialties?.includes(filterSpecialty)
      : true;
    return matchesName && matchesFilter;
  });

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesName = hospital.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesName;
  });

  const filteredRequests = requests.filter((request) => {
    const matchesStatus =
      filterRequest != "" ? request.status == filterRequest : true;
    return matchesStatus;
  });

  const handleOnSendRequest = async (message: string) => {
    if (!selectedReceiver || !user) return;

    await requestsService.create({
      message,
      sender: isUserDoctor ? "DOCTOR" : "HOSPITAL",
      doctorId: isUserDoctor ? user.id : selectedReceiver.userId,
      hospitalId: isUserDoctor ? selectedReceiver.userId : user.id,
    });

    fetchRequests();
  };

  const handleOnStatusRequestChange = async (
    id: string,
    status: IRequestStatus
  ) => {
    await requestsService.updateStatus({
      id,
      status,
    });
    fetchRequests();
  };

  const fetchUsers = useCallback(async () => {
    const response = isUserDoctor
      ? await hospitalsService.list()
      : await doctorsService.list();
    if (isUserDoctor) {
      setHospitals(response.data as IHospital[]);
    } else {
      setDoctors(response.data as IDoctor[]);
    }
  }, [isUserDoctor]);

  const fetchRequests = useCallback(async () => {
    const response = isUserDoctor
      ? await requestsService.listByDoctor(user?.id || "")
      : await requestsService.listByHospital(user?.id || "");
    setRequests(response.data);
  }, [isUserDoctor, user?.id]);

  const fetchSpecialtyItems = useCallback(async () => {
    const response = await specialtiesService.list();
    const specialties = response.data.map((item) => item.name);
    setFilterSpecialtyItens(specialties);
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchRequests();
    fetchSpecialtyItems();
  }, [fetchUsers, fetchRequests, fetchSpecialtyItems]);

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
          {!isUserDoctor && (
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Todos</option>
              {filterSpecialtyItens.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
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
              onSend={(message) => handleOnSendRequest(message)}
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
              name={
                isUserDoctor ? request.hospital!.name : request.doctor!.name
              }
              message={request.message}
              status={request.status}
              onStatusChange={async (newStatus) =>
                handleOnStatusRequestChange(request.id, newStatus)
              }
            />
          ))}
        </SectionCard.Content>
      </SectionCard.Root>
    </div>
  );
};
