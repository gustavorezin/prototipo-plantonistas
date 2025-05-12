import { ICreateUser } from "../models/ICreateUser";
import { IUpdateUser } from "../models/IUpdateUser";
import { IUser } from "../models/IUser";

export interface IUsersRepository {
  create(data: ICreateUser): Promise<IUser>;
  update(data: IUpdateUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  updatePassword(id: string, password: string): Promise<void>;
}
