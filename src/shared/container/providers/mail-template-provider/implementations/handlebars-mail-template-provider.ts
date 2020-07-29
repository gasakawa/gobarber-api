import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '../models/imail-template-provider';
import IParseMailTemplateDTO from '../dtos/iparse-mail-template-dto';

export default class HandlebarsMailtemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}
