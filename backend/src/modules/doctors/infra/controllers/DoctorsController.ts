import { ListDoctorsService } from "@modules/doctors/services/ListDoctorsService";
import { ShowDoctorService } from "@modules/doctors/services/ShowDoctorService";
import { UpdateAvailableDoctorService } from "@modules/doctors/services/UpdateAvailableDoctorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DoctorsController {
  async updateAvailable(req: Request, res: Response) {
    const { id } = req.params;
    const { available } = req.body;
    const updateAvailableDoctor = container.resolve(
      UpdateAvailableDoctorService
    );
    await updateAvailableDoctor.execute(id, available);
    res.status(204).send();
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const showDoctor = container.resolve(ShowDoctorService);
    const doctor = await showDoctor.execute(id);
    res.status(200).json(doctor);
  }

  async list(req: Request, res: Response) {
    const listDoctors = container.resolve(ListDoctorsService);
    const doctors = await listDoctors.execute();
    res.status(200).json(doctors);
  }
}
