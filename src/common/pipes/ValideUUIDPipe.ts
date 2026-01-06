import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateUUIDPipe implements PipeTransform<string> {
  transform(value: any) {
    console.log('no pipe: ' + value)
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      value === ' ' ||
      value === 'null' ||
      value === 'undefined'
    ) {
      return undefined;
    }

    if (!isUUID(value)) {
      throw new BadRequestException('Error: formato de UUID inválido.');
    }

    return value;
  }
}
