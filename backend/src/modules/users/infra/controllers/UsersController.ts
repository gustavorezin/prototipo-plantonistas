import { CreateUserService } from "@modules/users/services/CreateUserService";
import { LoginUserService } from "@modules/users/services/LoginUserService";
import { SessionUserService } from "@modules/users/services/SessionUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UsersController {
  async create(req: Request, res: Response) {
    const {
      email,
      password,
      name,
      userType,
      address,
      phone,
      crm,
      specialties,
    } = req.body;

    const createUser = container.resolve(CreateUserService);
    const { user, token } = await createUser.execute({
      name,
      email,
      password,
      userType,
      address,
      phone,
      crm,
      specialties,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });

    res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginUser = container.resolve(LoginUserService);
    const { user, token } = await loginUser.execute({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });

    res.status(200).json(user);
  }

  async logout(_req: Request, res: Response) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    res.sendStatus(204);
  }

  async session(req: Request, res: Response) {
    const userId = req.user.id;
    const sessionUser = container.resolve(SessionUserService);
    const user = await sessionUser.execute(userId);
    res.status(200).json(user);
  }
}
