export default interface IMailProvider {
  sendMail: (email: string, body: string) => Promise<void>;
}
