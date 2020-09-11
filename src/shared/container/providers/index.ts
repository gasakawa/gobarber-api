import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import IStorageProvider from './storage-provider/models/istorage-provider';
import DiskStorageProvider from './storage-provider/implementations/disk-storage-provider';
import IMailProvider from './mail-provider/models/imail-provider';
import EtherealMailProvider from './mail-provider/implementations/ethereal-mail-provider';
import IMailTemplateProvider from './mail-template-provider/models/imail-template-provider';
import HandlebarsMailtemplateProvider from './mail-template-provider/implementations/handlebars-mail-template-provider';
import SESMailProvider from './mail-provider/implementations/ses-mail-provider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailtemplateProvider);

if (mailConfig.driver === 'ses') {
  container.registerInstance<IMailProvider>('MailProvider', container.resolve(SESMailProvider));
} else {
  container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));
}
