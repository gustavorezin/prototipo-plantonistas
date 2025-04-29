import { FakeDoctorsRepository } from "@modules/doctors/domain/repositories/fakes/FakeDoctorsRepository";
import { CreateUserService } from "../CreateUserService";
import { FakeUsersRepository } from "@modules/users/domain/repositories/fakes/FakeUsersRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { AppError } from "@commons/error/AppError";
import { HashProvider } from "@commons/providers/HashProvider";

let usersRepository: FakeUsersRepository;
let doctorsRepository: FakeDoctorsRepository;
let service: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    doctorsRepository = new FakeDoctorsRepository();
    service = new CreateUserService(usersRepository, doctorsRepository);
  });

  it("should be able to create a user", async () => {
    // arrange
    const newUser: ICreateUser = {
      email: "email@email.com",
      password: "1234",
      name: "name",
      userType: "HOSPITAL",
    };
    // act
    const user = await service.execute(newUser);
    // assert
    expect(user.id).toBe("1");
  });

  it("should not be able to create new user with same email", async () => {
    // arrange
    await usersRepository.create({
      email: "email@email.com",
      name: "name",
      password: "1234",
      userType: "HOSPITAL",
    });
    const newUser: ICreateUser = {
      email: "email@email.com",
      name: "name",
      password: "1234",
      userType: "HOSPITAL",
    };
    // act
    const user = service.execute(newUser);
    // assert
    await expect(user).rejects.toBeInstanceOf(AppError);
    await expect(user).rejects.toHaveProperty(
      "message",
      "Email already in use"
    );
  });

  it("should not be able to create new user with same crm", async () => {
    // arrange
    doctorsRepository.addDoctor({
      name: "name",
      crm: "123456",
      userId: "1",
      available: true,
      phone: "phone",
      specialty: "specialty",
    });
    const newUser: ICreateUser = {
      email: "email@email.com",
      name: "name",
      password: "1234",
      userType: "DOCTOR",
      crm: "123456",
    };
    // act
    const user = service.execute(newUser);
    // assert
    await expect(user).rejects.toBeInstanceOf(AppError);
    await expect(user).rejects.toHaveProperty("message", "CRM already in use");
  });

  it("should hash the password before saving", async () => {
    // arrange
    const newUser: ICreateUser = {
      email: "email@email.com",
      name: "name",
      password: "1234",
      userType: "DOCTOR",
      crm: "123456",
    };
    // act
    const user = await service.execute(newUser);
    // assert
    const hashProvider = new HashProvider(); // Considerar fazer um fake depois
    expect(await hashProvider.compareHash("1234", user.password)).toBeTruthy();
  });
});
