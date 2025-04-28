import { inject, injectable } from "tsyringe";
import type { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { ILoginUser } from "../domain/models/ILoginUser";
import { AppError } from "@commons/error/AppError";
import { HashProvider } from "@commons/providers/HashProvider";
import { sign, SignOptions } from "jsonwebtoken";
import { authConfig } from "@commons/config/authConfig";

@injectable()
export class LoginUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: ILoginUser) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found");
    }

    const hashProvider = new HashProvider();
    const passwordMatched = await hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("Incorrect password", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    } as SignOptions);

    const userName =
      user.userType === "DOCTOR" ? user.doctor?.name : user.hospital?.name;

    const status =
      user.userType === "DOCTOR"
        ? user.doctor?.available
        : user.hospital?.hiring;

    return {
      user: {
        id: user.id,
        name: userName,
        status,
        email: user.email,
        userType: user.userType,
      },
      token,
    };
  }
}
