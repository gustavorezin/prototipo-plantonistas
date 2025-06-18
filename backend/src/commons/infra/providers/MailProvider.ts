import {
  IMailProvider,
  ISendMail,
} from "@commons/domain/providers/IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class MailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.HOST_SMTP,
      port: Number(process.env.PORT_SMTP),
      secure: process.env.SECURE_SMTP === "true",
      auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASSWORD_SMTP,
      },
    } as SMTPTransport.Options);
  }

  async sendMail({ to, from, subject, content }: ISendMail): Promise<void> {
    const message = await this.transporter.sendMail({
      from: {
        name: from.name,
        address: process.env.USER_SMTP!,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      //bcc: from.email,
      subject: subject + " | Plantonistas",
      text:
        (content || "Olá, estou te enviando uma solicitação!") +
        `\n\nAtenciosamente,\n${from.name}\n${from.email}`,
    });

    console.log("Message sent: %s", message.messageId);
  }
}
