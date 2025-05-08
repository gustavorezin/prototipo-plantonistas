import { AppError } from "@commons/error/AppError";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
export class ShowUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found");
    }

    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
