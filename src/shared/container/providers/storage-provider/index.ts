import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import DiskStorageProvider from './implementations/disk-storage-provider';
import IStorageProvider from './models/istorage-provider';
import S3StorageProvider from './implementations/s3-storage-provider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>('StorageProvider', providers[uploadConfig.driver]);
