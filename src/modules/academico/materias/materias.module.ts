import { Module } from '@nestjs/common';
import { MateriasController } from './materias.controller';
import { MateriasService } from './materias.service';
import { MateriasRepository } from './materias.repository';
import { UsuariosModule } from '../../usuarios/usuarios.module';

@Module({
  controllers: [MateriasController],
  providers: [MateriasService, MateriasRepository],
  exports: [MateriasService],
  imports: [UsuariosModule]
})
export class MateriasModule {}
