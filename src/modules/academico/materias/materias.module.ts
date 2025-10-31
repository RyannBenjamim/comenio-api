import { Module } from '@nestjs/common';
import { MateriasController } from './materias.controller';
import { MateriasService } from './materias.service';
import { MateriasRepository } from './materias.repository';

@Module({
  controllers: [MateriasController],
  providers: [MateriasService, MateriasRepository],
  exports: [MateriasService]
})
export class MateriasModule {}
