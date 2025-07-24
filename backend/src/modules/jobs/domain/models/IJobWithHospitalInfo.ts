import { IJob } from "./IJob";

export interface IJobWithHospitalInfo extends IJob {
  hospital: {
    name: string;
  };
}
