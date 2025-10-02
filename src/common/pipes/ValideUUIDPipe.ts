import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateUUIDPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!value) return undefined;

    if (!isUUID(value)) {
      throw new BadRequestException('Error: formato de UUID inválido.');
    }

    return value;
  }
}