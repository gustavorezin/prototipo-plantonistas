import { IApplication } from "./IApplication";

export interface IApplicationWithDoctorInfo extends IApplication {
  doctor: {
    name: string;
    crm: string;
  };
}
