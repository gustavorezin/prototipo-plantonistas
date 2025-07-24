import { AppError } from "@commons/error/AppError";
import type { IUsersRepository } from "./../domain/repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";
import type { IMailProvider } from "@commons/domain/providers/IMailProvider";

interface ISendMailToUserRequest {
  fromUserId: string;
  toUserId: string;
  content?: string;
}

@injectable()
export class SendMailToUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute({
    fromUserId,
    toUserId,
    content,
  }: ISendMailToUserRequest): Promise<void> {
    const fromUser = await this.usersRepository.findById(fromUserId);
    const toUser = await this.usersRepository.findById(toUserId);

    if (!fromUser || !toUser) throw new AppError("Usuário não encontrado");

    const isFromUserDoctor = fromUser.userType === "DOCTOR";

    const fromName = isFromUserDoctor
      ? fromUser.doctor?.name
      : fromUser.hospital?.name;
    const toName = isFromUserDoctor
      ? toUser.hospital?.name
      : toUser.doctor?.name;

    if (!fromName || !toName)
      throw new AppError("Nome do usuário não encontrado");

    this.mailProvider.sendMail({
      from: {
        name: fromName,
        email: fromUser.email,
      },
      to: {
        name: toName,
        email: toUser.email,
      },
      subject: `Mensagem de ${fromName}`,
      content,
    });
  }
}
