import type { ITokenProvider } from "@commons/domain/providers/ITokenProvider";
import { AppError } from "@commons/error/AppError";
import { HashProvider } from "@commons/infra/providers/HashProvider";
import { inject, injectable } from "tsyringe";
import { LoginUserSchema } from "../domain/models/schemas/LoginUserSchema";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
export class LoginUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TokenProvider")
    private tokenProvider: ITokenProvider
  ) {}

  async execute({ email, password }: LoginUserSchema) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const hashProvider = new HashProvider();
    const passwordMatched = await hashProvider.compareHash(
      password,
      user.password!
    );

    if (!passwordMatched) {
      throw new AppError("Senha incorreta", 401);
    }

    const token = this.tokenProvider.generateToken({}, user.id);

    const userName =
      user.userType === "DOCTOR" ? user.doctor?.name : user.hospital?.name;

    return {
      user: {
        id: user.id,
        name: userName,
        email: user.email,
        userType: user.userType,
      },
      token,
    };
  }
}
