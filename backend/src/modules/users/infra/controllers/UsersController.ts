import { CreateUserService } from "@modules/users/services/CreateUserService";
import { LoginUserService } from "@modules/users/services/LoginUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UsersController {
  async create(req: Request, res: Response) {
    const { email, password, name, userType, address, phone, crm, specialty } =
      req.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password,
      userType,
      address,
      phone,
      crm,
      specialty,
    });
    res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginUser = container.resolve(LoginUserService);
    const { user, token } = await loginUser.execute({ email, password });
    res.status(200).json({ user, token });
  }
}
