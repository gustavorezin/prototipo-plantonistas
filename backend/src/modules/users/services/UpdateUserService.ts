import { AppError } from "@commons/error/AppError";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { UpdateUserSchema } from "../domain/models/schemas/UpdateUserSchema";

@injectable()
export class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: UpdateUserSchema) {
    const userEmailExists = await this.usersRepository.findByEmail(data.email);
    if (userEmailExists?.id != data.id && userEmailExists) {
      throw new AppError("E-mail já cadastrado");
    }

    const user = await this.usersRepository.update(data);

    return user;
  }
}
