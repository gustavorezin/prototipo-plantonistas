import { SectionCard } from "@commons/components/section-card";
import { useAuth } from "@commons/hooks/use-auth";
import { doctorsService, IDoctor } from "@services/doctors-service";
import { hospitalsService, IHospital } from "@services/hospitals-service";
import { specialtiesService } from "@services/specialties-service";
import { useCallback, useEffect, useState } from "react";
import { HospitalOrDoctorList } from "./components/hospital-or-doctor-list";
import { RequestModal } from "./components/request-modal";
import { IJob, jobsService } from "@services/jobs-service";
import { CardJob } from "./components/card-job";
import { Button } from "@commons/components/ui/button";

export const Home = () => {
  const { user } = useAuth();
  const userType = user?.userType;
  const isUserDoctor = userType === "DOCTOR";
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterSpecialtyItens, setFilterSpecialtyItens] = useState<string[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceiver, setSelectedReceiver] = useState<
    IHospital | IDoctor | null
  >(null);
  const [jobs, setJobs] = useState<IJob[]>([]);

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

  const fetchSpecialtyItems = useCallback(async () => {
    const response = await specialtiesService.list();
    const specialties = response.data.map((item) => item.name);
    setFilterSpecialtyItens(specialties);
  }, []);

  const fetchJobs = useCallback(async () => {
    const response = await jobsService.listByHospital();
    setJobs(response.data);
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchSpecialtyItems();
    fetchJobs();
  }, [fetchUsers, fetchSpecialtyItems, fetchJobs]);

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
              onSend={(message) => console.log(message)}
            />
          )}
        </SectionCard.Content>
      </SectionCard.Root>

      <SectionCard.Root className="basis-1/3">
        <SectionCard.Header>Vagas cadastradas</SectionCard.Header>
        <SectionCard.Content>
          <div className="flex flex-1 flex-col gap-4 my-4">
            {jobs.map((job) => (
              <CardJob {...job} />
            ))}
          </div>
          <Button title="Cadastrar nova vaga" />
        </SectionCard.Content>
      </SectionCard.Root>
    </div>
  );
};
