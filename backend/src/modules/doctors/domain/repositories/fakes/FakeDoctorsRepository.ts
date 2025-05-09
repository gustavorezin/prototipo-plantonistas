import { IDoctor } from "../../models/IDoctor";
import { IDoctorMail } from "../../models/IDoctorMail";
import { IDoctorsRepository } from "../IDoctorsRepository";

export class FakeDoctorsRepository implements IDoctorsRepository {
  private doctors: IDoctor[] = [];

  async findByCrm(crm: string): Promise<IDoctor | null> {
    return this.doctors.find((d) => d.crm === crm) || null;
  }

  async findAll(): Promise<IDoctor[]> {
    return this.doctors;
  }

  async findById(id: string): Promise<IDoctor | null> {
    return this.doctors.find((d) => d.userId === id) || null;
  }

  async findNameAndEmailById(id: string): Promise<IDoctorMail | null> {
    const doctor = this.doctors.find((d) => d.userId === id);
    if (!doctor) return null;
    return {
      name: doctor.name,
      email: "email@email.com",
    };
  }

  addDoctor(doctor: IDoctor): void {
    this.doctors.push(doctor);
  }
}
