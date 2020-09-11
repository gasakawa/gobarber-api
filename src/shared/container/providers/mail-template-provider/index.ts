import { container } from 'tsyringe';

import IMailTemplateProvider from './models/imail-template-provider';
import HandlebarsMailtemplateProvider from './implementations/handlebars-mail-template-provider';

const providers = {
  handlebars: HandlebarsMailtemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', providers.handlebars);
