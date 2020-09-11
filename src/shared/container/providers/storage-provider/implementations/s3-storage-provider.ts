import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/istorage-provider';

export default class S3StorageProvider implements IStorageProvider {
  private readonly client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalFilePath = path.resolve(uploadConfig.uploadsFolder, file);

    const fileContent = await fs.promises.readFile(originalFilePath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: 'image/png',
      })
      .promise();

    await fs.promises.unlink(originalFilePath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'ga-app-gobarber',
        Key: file,
      })
      .promise();
  }
}
