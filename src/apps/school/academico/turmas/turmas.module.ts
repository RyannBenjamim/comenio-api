import { Module } from '@nestjs/common';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';
import { TurmasRepository } from './turmas.repository';

@Module({
  controllers: [TurmasController],
  providers: [TurmasService, TurmasRepository],
  exports: [TurmasService]
})
export class TurmasModule {}