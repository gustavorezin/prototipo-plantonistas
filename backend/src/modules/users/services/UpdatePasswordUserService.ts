import { AppError } from "@commons/error/AppError";
import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { HashProvider } from "@commons/infra/providers/HashProvider";

@injectable()
export class UpdatePasswordUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, newPassword }: { id: string; newPassword: string }) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const hashProvider = new HashProvider();
    const passwordMatched = await hashProvider.compareHash(
      newPassword,
      user.password
    );

    if (passwordMatched) {
      throw new AppError("A nova senha não pode ser igual a atual");
    }

    const hashedPassword = await hashProvider.generateHash(newPassword);

    await this.usersRepository.updatePassword(id, hashedPassword);
  }
}
