interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMail {
  to: IMailContact;
  from: IMailContact;
  subject: string;
  content?: string;
}

export interface IMailProvider {
  sendMail({ to, from, subject, content }: ISendMail): Promise<void>;
}
