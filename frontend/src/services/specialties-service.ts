import api from "@commons/lib/api";

export interface ISpecialty {
  id: string;
  name: string;
}

const list = () => {
  return api.get<ISpecialty[]>("/specialties");
};

export const specialtiesService = {
  list,
};
