import { ListSpecialtiesByDoctorService } from "@modules/specialties/services/ListSpecialtiesByDoctorService";
import { ListSpecialtiesService } from "@modules/specialties/services/ListSpecialtiesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class SpecialtiesController {
  async list(_req: Request, res: Response) {
    const listSpecialties = container.resolve(ListSpecialtiesService);
    const specialties = await listSpecialties.execute();
    res.status(200).json(specialties);
  }

  async listByDoctor(req: Request, res: Response) {
    const { doctorId } = req.params;
    const listSpecialtiesByDoctor = container.resolve(
      ListSpecialtiesByDoctorService
    );
    const specialties = await listSpecialtiesByDoctor.execute(doctorId);
    res.status(200).json(specialties);
  }
}
