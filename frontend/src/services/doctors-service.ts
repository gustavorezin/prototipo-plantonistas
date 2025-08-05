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

const listHiredByHospital = () => {
  console.log("fetching last hired doctors");
  return api.get<IDoctor[]>("/doctors/hired-by-hospital");
};

export const doctorsService = {
  list,
  listHiredByHospital,
};
