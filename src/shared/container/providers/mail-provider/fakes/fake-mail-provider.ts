import IMailProvider from '../models/imail-provider';

interface IMEssage {
  email: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMEssage[] = [];

  public async sendMail(email: string, body: string): Promise<void> {
    this.messages.push({
      email,
      body,
    });
  }
}
