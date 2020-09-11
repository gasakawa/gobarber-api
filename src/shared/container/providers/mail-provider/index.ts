import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import EtherealMailProvider from './implementations/ethereal-mail-provider';
import SESMailProvider from './implementations/ses-mail-provider';
import IMailProvider from './models/imail-provider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>('MailProvider', providers[mailConfig.driver]);
