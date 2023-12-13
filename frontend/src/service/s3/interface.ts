interface S3ServiceInterface {
  uploadJpgPhoto(key: string, body: Buffer): Promise<string>;
  getUrl(key: string): string;
}

export default S3ServiceInterface;
