interface S3ServiceInterface {
  uploadJpgPhoto(key: string, body: Buffer): Promise<string>;
  getObjectUrl(key: string): Promise<string | null>;
}

export default S3ServiceInterface;
