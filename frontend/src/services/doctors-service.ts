import api from "@commons/lib/api";

export interface IDoctor {
  userId: string;
  name: string;
  crm: string;
  phone: string;
  specialty: string;
  available: boolean;
}

const list = () => {
  return api.get<IDoctor[]>("/doctors");
};

export const doctorsService = {
  list,
};
