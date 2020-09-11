import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/disk-storage-provider';
import IStorageProvider from './models/istorage-provider';

const providers = {
  diskStorage: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>('StorageProvider', providers.diskStorage);
