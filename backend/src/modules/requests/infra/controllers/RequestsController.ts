import { ListRequestsByDoctorService } from "@modules/requests/services/ListRequestsByDoctorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class RequestsController {
  async listByDoctor(req: Request, res: Response) {
    const { doctorId } = req.params;
    const listByDoctor = container.resolve(ListRequestsByDoctorService);
    const requests = await listByDoctor.execute(doctorId);
    res.status(200).json(requests);
  }
}
