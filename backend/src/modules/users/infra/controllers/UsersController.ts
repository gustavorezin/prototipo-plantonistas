import { CreateUserSchema } from "@modules/users/domain/schemas/usersSchemas";
import { CreateUserService } from "@modules/users/services/CreateUserService";
import { LoginUserService } from "@modules/users/services/LoginUserService";
import { SessionUserService } from "@modules/users/services/SessionUserService";
import { ShowUserService } from "@modules/users/services/ShowUserService";
import { UpdatePasswordUserService } from "@modules/users/services/UpdatePasswordUserService";
import { UpdateUserService } from "@modules/users/services/UpdateUserService";
import { Request, Response } from "express";
import { TypedRequestBody } from "src/@types/express/typed-request-body";
import { container } from "tsyringe";

export class UsersController {
  async create(req: TypedRequestBody<CreateUserSchema>, res: Response) {
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

  async update(req: Request, res: Response) {
    const userId = req.user.id;
    const data = req.body;

    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({ ...data, id: userId });
    res.status(200).json(user);
  }

  async updatePassword(req: Request, res: Response) {
    const userId = req.user.id;
    const { password } = req.body;

    const updatePassword = container.resolve(UpdatePasswordUserService);
    await updatePassword.execute({ id: userId, newPassword: password });
    res.sendStatus(204);
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

  async show(req: Request, res: Response) {
    const userId = req.user.id;
    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute(userId);
    res.status(200).json(user);
  }
}
