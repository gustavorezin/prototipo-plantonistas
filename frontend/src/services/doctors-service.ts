import api from "@commons/lib/api";

export interface IDoctor {
  userId: string;
  name: string;
  crm: string;
  phone: string;
  specialty: string;
  available: boolean;
}

const updateAvailable = (userId: string, available: boolean) => {
  api.put(`/doctors/${userId}/available`, { available });
};

const list = () => {
  return api.get<IDoctor[]>("/doctors");
};

export const doctorsService = {
  updateAvailable,
  list,
};
