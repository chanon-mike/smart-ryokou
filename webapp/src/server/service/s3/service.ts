import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { AWS_BUCKET_NAME, AWS_REGION } from '@/libs/envValues';
import type S3ServiceInterface from '@/server/service/s3/interface';

const client: S3Client = new S3Client({
  region: AWS_REGION,
});

class S3Service implements S3ServiceInterface {
  private client: S3Client;

  constructor(client: S3Client) {
    this.client = client;
  }

  private getUrl(key: string): string {
    return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
  }

  /**
   * Upload a jpeg image to S3 bucket
   * @param key The name of the object end with .jpg
   * @param body The image in base64 in buffer type
   * @returns The url of the uploaded image
   */
  async uploadJpgPhoto(key: string, body: Buffer): Promise<string> {
    const commands = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: 'image/jpeg',
      ContentEncoding: 'base64',
    });

    try {
      await this.client.send(commands);
      return this.getUrl(key);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Get the url of the object (check first if the object exists)
   * @param key The name of the object
   * @returns The url of the object
   */
  async getObjectUrl(key: string): Promise<string | null> {
    const commands = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    });

    try {
      await this.client.send(commands);
      return this.getUrl(key);
    } catch (error) {
      return null;
    }
  }
}

const s3Service = new S3Service(client);

export default s3Service;
