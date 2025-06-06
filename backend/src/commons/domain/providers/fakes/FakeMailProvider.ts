import {
  IMailProvider,
  ISendMail,
} from "@commons/domain/providers/IMailProvider";

export class FakeMailProvider implements IMailProvider {
  private messages: ISendMail[] = [];

  async sendMail({ to, from, subject, content }: ISendMail): Promise<void> {
    this.messages.push({ to, from, subject, content });
  }

  getSentMessages(): ISendMail[] {
    return this.messages;
  }

  clear(): void {
    this.messages = [];
  }
}
