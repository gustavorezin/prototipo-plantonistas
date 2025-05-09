import { ListHospitalsService } from "@modules/hospitals/services/ListHospitalsService";
import { ShowHospitalService } from "@modules/hospitals/services/ShowHospitalService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class HospitalsController {
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const showHospital = container.resolve(ShowHospitalService);
    const hospital = await showHospital.execute(id);
    res.status(200).json(hospital);
  }

  async list(_req: Request, res: Response) {
    const listHospitals = container.resolve(ListHospitalsService);
    const hospitals = await listHospitals.execute();
    res.status(200).json(hospitals);
  }
}
