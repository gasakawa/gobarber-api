import IParseMailTemplateDTO from '../dtos/iparse-mail-template-dto';

export default interface IMailTemplateProvider {
  parse: (data: IParseMailTemplateDTO) => Promise<string>;
}
