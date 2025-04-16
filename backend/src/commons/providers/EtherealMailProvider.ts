import nodemailer from "nodemailer";

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from: IMailContact;
  subject: string;
  content?: string;
}

export class EtherealMailProvider {
  static async sendMail({ to, from, subject, content }: ISendMail) {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from.name,
        address: from.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: content || "Olá, estou te enviando uma solicitação!",
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
