import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  config: {
    aws: {
      bucket: string;
    };
  };
  multer: {
    storage: StorageEngine;
  };
  tempFolder: string;
  uploadsFolder: string;
}

export default {
  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: path.resolve(tempFolder, 'uploads'),
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    aws: {
      bucket: 'ga-app-gobarber',
    },
  },

  driver: process.env.STORAGE_DRIVER,
} as IUploadConfig;
