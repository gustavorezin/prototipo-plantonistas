import { ICreateUser } from "../../models/ICreateUser";
import { IUser } from "../../models/IUser";
import { IUsersRepository } from "../IUsersRepository";

export class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  async create(data: ICreateUser): Promise<IUser> {
    const user: IUser = {
      id: (this.users.length + 1).toString(),
      ...data,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}
