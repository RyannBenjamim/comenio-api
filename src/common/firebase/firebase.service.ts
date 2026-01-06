import { Inject, Injectable } from '@nestjs/common';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE')
    private readonly bucket: Bucket,
  ) {}

  async uploadFile(
    path: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<string> {
    const file = this.bucket.file(path);

    await file.save(buffer, {
      metadata: {
        contentType,
      },
    });

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500', 
    });

    return url;
  }

  async deleteFile(path: string): Promise<void> {
    await this.bucket.file(path).delete().catch(() => null);
  }
}
