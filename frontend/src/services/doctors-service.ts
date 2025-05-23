import api from "@commons/lib/api";

export interface IDoctor {
  userId: string;
  name: string;
  crm: string;
  phone: string;
  specialties: string[];
}

const list = () => {
  return api.get<IDoctor[]>("/doctors");
};

export const doctorsService = {
  list,
};
