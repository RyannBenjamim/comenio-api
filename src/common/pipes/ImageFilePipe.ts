import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const ImageFilePipe = (
  options?: {
    required?: boolean;
    maxSizeMB?: number;
  }
): ParseFilePipe =>
  new ParseFilePipe({
    fileIsRequired: options?.required ?? false,
    validators: [
      new FileTypeValidator({
        fileType: /image\/(jpeg|jpg|png|webp)$/,
      }),
      new MaxFileSizeValidator({
        maxSize: (options?.maxSizeMB ?? 5) * 1024 * 1024,
      }),
    ],
  });
