import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/models/ICreateUser";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { HashProvider } from "@commons/providers/HashProvider";
import { AppError } from "@commons/error/AppError";
import type { IDoctorsRepository } from "@modules/doctors/domain/repositories/IDoctorsRepository";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository
  ) {}

  async execute(data: ICreateUser) {
    console.log("CreateUserService", data);
    const userEmailExists = await this.usersRepository.findByEmail(data.email);
    if (userEmailExists) {
      throw new AppError("Email already in use");
    }

    if (data.crm && data.userType === "DOCTOR") {
      const doctorCrmExists = await this.doctorsRepository.findByCrm(data.crm);
      if (doctorCrmExists) {
        throw new AppError("CRM already in use");
      }
    }

    const hashProvider = new HashProvider();
    const hashedPassword = await hashProvider.generateHash(data.password);
    return this.usersRepository.create({ ...data, password: hashedPassword });
  }
}
