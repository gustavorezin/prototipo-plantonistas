import { authConfig } from "@commons/config/authConfig";
import { AppError } from "@commons/error/AppError";
import { HashProvider } from "@commons/providers/HashProvider";
import type { IDoctorsRepository } from "@modules/doctors/domain/repositories/IDoctorsRepository";
import { sign, SignOptions } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { CreateUserSchema } from "../domain/schemas/usersSchemas";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository
  ) {}

  async execute(data: CreateUserSchema) {
    const userEmailExists = await this.usersRepository.findByEmail(data.email);
    if (userEmailExists) {
      throw new AppError("E-mail já cadastrado");
    }

    if (data.crm && data.userType === "DOCTOR") {
      const doctorCrmExists = await this.doctorsRepository.findByCrm(data.crm);
      if (doctorCrmExists) {
        throw new AppError("CRM já cadastrado");
      }
    }

    const hashProvider = new HashProvider();
    const hashedPassword = await hashProvider.generateHash(data.password);

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    } as SignOptions);

    return {
      user,
      token,
    };
  }
}
