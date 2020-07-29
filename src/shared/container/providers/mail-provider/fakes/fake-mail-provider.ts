import IMailProvider from '../models/imail-provider';
import ISendMailDTO from '../dtos/isend-mail-dto';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
