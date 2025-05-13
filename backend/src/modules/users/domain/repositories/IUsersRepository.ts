import { IUser } from "../models/IUser";
import { CreateUserSchema } from "../models/schemas/CreateUserSchema";
import { UpdateUserSchema } from "../models/schemas/UpdateUserSchema";

export interface IUsersRepository {
  create(data: CreateUserSchema): Promise<IUser>;
  update(data: UpdateUserSchema): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  updatePassword(id: string, password: string): Promise<void>;
}
