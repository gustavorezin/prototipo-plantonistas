import type { ITokenProvider } from "@commons/domain/providers/ITokenProvider";
import { AppError } from "@commons/error/AppError";
import { HashProvider } from "@commons/infra/providers/HashProvider";
import type { IDoctorsRepository } from "@modules/doctors/domain/repositories/IDoctorsRepository";
import { inject, injectable } from "tsyringe";
import { CreateUserSchema } from "../domain/models/schemas/CreateUserSchema";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DoctorsRepository")
    private doctorsRepository: IDoctorsRepository,
    @inject("TokenProvider")
    private tokenProvider: ITokenProvider
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

    const token = this.tokenProvider.generateToken({}, user.id);

    return {
      user,
      token,
    };
  }
}
