import { LastDoctorsHiredService } from "@modules/doctors/services/LastDoctorsHiredService";
import { ListDoctorsService } from "@modules/doctors/services/ListDoctorsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DoctorsController {
  /* async show(req: Request, res: Response) {
    const { id } = req.params;
    const showDoctor = container.resolve(ShowDoctorService);
    const doctor = await showDoctor.execute(id);
    res.status(200).json(doctor);
  } */

  async list(req: Request, res: Response) {
    const listDoctors = container.resolve(ListDoctorsService);
    const doctors = await listDoctors.execute();
    res.status(200).json(doctors);
  }

  async listHiredByHospital(req: Request, res: Response) {
    const { id } = req.user;
    console.log("Hospital ID:", id);
    const lastDoctorsHired = container.resolve(LastDoctorsHiredService);
    const doctors = await lastDoctorsHired.execute(id);
    res.status(200).json(doctors);
  }
}
