import { AppError } from "@commons/error/AppError";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
export class SessionUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userName =
      user.userType === "DOCTOR" ? user.doctor?.name : user.hospital?.name;

    return {
      id: user.id,
      name: userName,
      email: user.email,
      userType: user.userType,
    };
  }
}
