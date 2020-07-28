import { container } from 'tsyringe';
import IStorageProvider from './storage-provider/models/istorage-provider';
import DiskStorageProvider from './storage-provider/implementations/disk-storage-provider';
import IMailProvider from './mail-provider/models/imail-provider';
import EtherealMailProvider from './mail-provider/implementations/ethereal-mail-provider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerInstance<IMailProvider>('MailProvider', new EtherealMailProvider());
