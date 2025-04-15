import { IDoctor } from "@modules/doctors/domain/models/IDoctor";
import { IRequest } from "./IRequest";

export interface IRequestWithDoctor extends IRequest {
  doctor: IDoctor;
}
