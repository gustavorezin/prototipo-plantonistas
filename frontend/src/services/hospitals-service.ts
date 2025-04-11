import api from "@commons/lib/api";

export interface IHospital {
  userId: string;
  name: string;
  address: string;
  phone: string;
  hiring: boolean;
}

const list = () => {
  return api.get<IHospital[]>("/hospitals");
};

export const hospitalsService = {
  list,
};
