import ISendMailDTO from '../dtos/isend-mail-dto';

export default interface IMailProvider {
  sendMail: (data: ISendMailDTO) => Promise<void>;
}
