import { FakeMailProvider } from "@commons/domain/providers/fakes/FakeMailProvider";
import { FakeUsersRepository } from "@modules/users/domain/repositories/fakes/FakeUsersRepository";
import { SendMailToUserService } from "../SendMailToUserService";

let usersRepository: FakeUsersRepository;
let mailProvider: FakeMailProvider;
let service: SendMailToUserService;

describe("SendMailToUser", () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    mailProvider = new FakeMailProvider();
    service = new SendMailToUserService(usersRepository, mailProvider);
  });

  it("should be able to send an email from one user to another", async () => {
    // Arrange
    const sender = await usersRepository.create({
      email: "sender@example.com",
      password: "1234",
      name: "Hospital Santa Saúde",
      userType: "HOSPITAL",
      phone: "99999999",
    });

    const recipient = await usersRepository.create({
      email: "doctor@example.com",
      password: "5678",
      name: "Dr. João",
      userType: "DOCTOR",
      phone: "88888888",
    });

    // Act
    await service.execute({
      fromUserId: sender.id,
      toUserId: recipient.id,
    });

    // Assert
    const messages = mailProvider.getSentMessages();
    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatchObject({
      from: { name: sender.hospital!.name, email: sender.email },
      to: { name: recipient.doctor!.name, email: recipient.email },
    });
  });
});
