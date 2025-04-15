import { IHospital } from "@modules/hospitals/domain/models/IHospital";
import { IRequest } from "./IRequest";

export interface IRequestWithHospital extends IRequest {
  hospital: IHospital;
}
