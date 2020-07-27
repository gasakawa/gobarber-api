import { container } from 'tsyringe';
import IStorageProvider from './storage-provider/models/istorage-provider';
import DiskStorageProvider from './storage-provider/implementations/disk-storage-provider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
