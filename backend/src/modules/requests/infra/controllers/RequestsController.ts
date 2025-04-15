import { CreateRequestService } from "@modules/requests/services/CreateRequestService";
import { ListRequestsByDoctorService } from "@modules/requests/services/ListRequestsByDoctorService";
import { ListRequestsByHospitalService } from "@modules/requests/services/ListRequestsByHospitalService";
import { UpdateStatusRequestService } from "@modules/requests/services/UpdateStatusRequestService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class RequestsController {
  async create(req: Request, res: Response) {
    const { hospitalId, doctorId, message } = req.body;

    const createRequest = container.resolve(CreateRequestService);
    const request = await createRequest.execute({
      hospitalId,
      doctorId,
      message,
    });
    res.status(201).json(request);
  }

  async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    const updateStatus = container.resolve(UpdateStatusRequestService);
    const updatedRequest = await updateStatus.execute({
      id,
      status,
    });
    res.status(200).json(updatedRequest);
  }

  async listByDoctor(req: Request, res: Response) {
    const { doctorId } = req.params;
    const listByDoctor = container.resolve(ListRequestsByDoctorService);
    const requests = await listByDoctor.execute(doctorId);
    res.status(200).json(requests);
  }

  async listByHospital(req: Request, res: Response) {
    const { hospitalId } = req.params;
    const listByHospital = container.resolve(ListRequestsByHospitalService);
    const requests = await listByHospital.execute(hospitalId);
    res.status(200).json(requests);
  }
}
