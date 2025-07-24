import { IUser } from "../../models/IUser";
import { CreateUserSchema } from "../../models/schemas/CreateUserSchema";
import { UpdateUserSchema } from "../../models/schemas/UpdateUserSchema";
import { IUsersRepository } from "../IUsersRepository";

export class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  async create(data: CreateUserSchema): Promise<IUser> {
    const id = (this.users.length + 1).toString();

    const baseUser: IUser = {
      id,
      email: data.email,
      password: data.password,
      userType: data.userType,
    };

    if (data.userType === "HOSPITAL") {
      baseUser.hospital = {
        userId: id,
        name: data.name,
        phone: data.phone,
        address: data.address || "Endereço Fictício",
      };
    } else if (data.userType === "DOCTOR") {
      baseUser.doctor = {
        userId: id,
        name: data.name,
        crm: data.crm || "123456",
        phone: data.phone,
        specialties: data.specialties || [],
      };
    }

    this.users.push(baseUser);
    return baseUser;
  }

  async update(data: UpdateUserSchema): Promise<IUser> {
    const userIndex = this.users.findIndex((user) => user.id === data.id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    const updatedUser = {
      ...this.users[userIndex],
      ...data,
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async updatePassword(id: string, password: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    this.users[userIndex].password = password;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findById(id: string): Promise<IUser | null> {
    return this.users.find((user) => user.id === id) || null;
  }
}
