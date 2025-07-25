import { SectionCard } from "@commons/components/section-card";
import { doctorsService, IDoctor } from "@services/doctors-service";
import { hospitalsService, IHospital } from "@services/hospitals-service";
import { specialtiesService } from "@services/specialties-service";
import { useCallback, useEffect, useState } from "react";
import { HospitalOrDoctorList } from "../components/hospital-or-doctor-list";
import { UserModal } from "../components/user-modal";

interface ListUsersSectionProps {
  isUserDoctor: boolean;
}

export const ListUsersSection = ({ isUserDoctor }: ListUsersSectionProps) => {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterSpecialtyItens, setFilterSpecialtyItens] = useState<string[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setUserId(id);
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

  useEffect(() => {
    fetchUsers();
    fetchSpecialtyItems();
  }, [fetchUsers, fetchSpecialtyItems]);

  return (
    <SectionCard.Root className="basis-2/3">
      <SectionCard.Header>
        Buscar {isUserDoctor ? "hospitais" : "médicos"}
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
          isUserDoctor={isUserDoctor}
          items={isUserDoctor ? filteredHospitals : filteredDoctors}
          onCardClick={handleCardClick}
        />
        {userId && (
          <UserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            userId={userId}
          />
        )}
      </SectionCard.Content>
    </SectionCard.Root>
  );
};
