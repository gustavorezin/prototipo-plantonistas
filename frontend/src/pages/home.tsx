import { useEffect, useState } from "react";
import { IHospital, hospitalsService } from "../services/hospitals-service";
import { CardUser } from "../components/card-user";
import { useAuth } from "../hooks/use-auth";
import { doctorsService, IDoctor } from "../services/doctors-service";
import { RequestModal } from "../components/request-modal";

export const Home = () => {
  const { user } = useAuth();
  const userType = user?.userType;
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
      if (userType == "DOCTOR") {
        const response = await hospitalsService.list();
        setHospitals(response.data);
      } else {
        const response = await doctorsService.list();
        setDoctors(response.data);
      }
    };

    fetchUsers();
  }, [userType]);

  return (
    <div className="flex flex-row h-screen bg-white p-4 gap-4">
      <div className="basis-2/3 flex flex-col bg-white shadow-2xl/30 shadow-primary rounded-2xl p-4">
        <div className="flex flex-row gap-4 mb-4">
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
            <>
              <option value="">Todos</option>
              <option value="true">
                {userType === "DOCTOR" ? "Contratando" : "Disponível"}
              </option>
              <option value="false">
                {userType === "DOCTOR" ? "Não contratando" : "Indisponível"}
              </option>
            </>
          </select>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
          <div className="grid grid-cols-2 gap-4">
            {userType == "DOCTOR"
              ? filteredHospitals.map((hospital) => (
                  <CardUser
                    key={hospital.userId}
                    name={hospital.name}
                    phone={hospital.phone}
                    address={hospital.address}
                    available={hospital.hiring}
                    onClick={() => handleCardClick(hospital)}
                  />
                ))
              : filteredDoctors.map((doctor) => (
                  <CardUser
                    key={doctor.userId}
                    name={doctor.name}
                    phone={doctor.phone}
                    crm={doctor.crm}
                    specialty={doctor.specialty}
                    available={doctor.available}
                    onClick={() => handleCardClick(doctor)}
                  />
                ))}
          </div>
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
        </div>
      </div>

      <div className="basis-1/3 bg-white shadow-2xl/30 shadow-primary rounded-2xl"></div>
    </div>
  );
};
