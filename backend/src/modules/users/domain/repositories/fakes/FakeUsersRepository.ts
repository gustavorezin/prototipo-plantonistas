import { IUpdateUser } from "../../models/IUpdateUser";
import { IUser } from "../../models/IUser";
import { CreateUserSchema } from "../../schemas/usersSchemas";
import { IUsersRepository } from "../IUsersRepository";

export class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  async create(data: CreateUserSchema): Promise<IUser> {
    const user: IUser = {
      id: (this.users.length + 1).toString(),
      ...data,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async update(data: IUpdateUser): Promise<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === data.id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    const updatedUser = {
      ...this.users[userIndex],
      ...data,
      updatedAt: new Date(),
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findById(id: string): Promise<IUser | null> {
    return this.users.find((user) => user.id === id) || null;
  }
}
