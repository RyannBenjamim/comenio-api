import { FirebaseService } from '../firebase/firebase.service';
import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

type SaveFileOptions = {
  allowedExtensions?: string[];
  allowedMimeTypes?: string[];
};

type SaveFileReturn = {
  filePath: string,
  fileUrl: string
}

export const saveFile = async (
  firebase: FirebaseService,
  filePath: string,
  file?: Express.Multer.File,
  options?: SaveFileOptions,
): Promise<SaveFileReturn | null> => {
  if (!file) return null;

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (
    options?.allowedExtensions?.length &&
    !options.allowedExtensions.includes(ext)
  ) {
    throw new BadRequestException(
      `Extensão inválida. Permitidas: ${options.allowedExtensions.join(', ')}`,
    );
  }

  if (
    options?.allowedMimeTypes?.length &&
    !options.allowedMimeTypes.includes(mime)
  ) {
    throw new BadRequestException(
      `Tipo de arquivo inválido (${mime}).`,
    );
  }

  const fileUrl = await firebase.uploadFile(
    filePath,
    file.buffer,
    file.mimetype,
  );

  return { filePath, fileUrl };
};
