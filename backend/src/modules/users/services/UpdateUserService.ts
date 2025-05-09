import { AppError } from "@commons/error/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateUser } from "../domain/models/IUpdateUser";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
export class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IUpdateUser) {
    const userEmailExists = await this.usersRepository.findByEmail(data.email);
    if (userEmailExists?.id != data.id && userEmailExists) {
      throw new AppError("E-mail já cadastrado");
    }

    const user = await this.usersRepository.update(data);

    return user;
  }
}
