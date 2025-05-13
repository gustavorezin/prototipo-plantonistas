import { IUpdateUser } from "../models/IUpdateUser";
import { IUser } from "../models/IUser";
import { CreateUserSchema } from "../schemas/usersSchemas";

export interface IUsersRepository {
  create(data: CreateUserSchema): Promise<IUser>;
  update(data: IUpdateUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  updatePassword(id: string, password: string): Promise<void>;
}
