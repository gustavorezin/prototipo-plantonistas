import api from "@commons/lib/api";

export interface ISpecialty {
  id: string;
  name: string;
}

const list = () => {
  return api.get<ISpecialty[]>("/specialties");
};

const listByDoctorId = (doctorId: string) => {
  return api.get<ISpecialty[]>(`/specialties/doctor/${doctorId}`);
};

export const specialtiesService = {
  list,
  listByDoctorId,
};
