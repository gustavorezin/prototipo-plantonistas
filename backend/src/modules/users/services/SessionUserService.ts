import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { ILoginUser } from "../domain/models/ILoginUser";
import { AppError } from "@commons/error/AppError";
import { HashProvider } from "@commons/providers/HashProvider";
import { sign, SignOptions } from "jsonwebtoken";
import { authConfig } from "@commons/config/authConfig";

@injectable()
export class SessionUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found");
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
