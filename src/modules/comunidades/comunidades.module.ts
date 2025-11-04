import { Module } from '@nestjs/common';
import { ComunidadesController } from './comunidades.controller';
import { ComunidadesService } from './comunidades.service';
import { ComunidadesRepository } from './comunidades.repository';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { MateriasModule } from '../academico/materias/materias.module';
import { TurmasModule } from '../academico/turmas/turmas.module';

@Module({
  controllers: [ComunidadesController],
  providers: [ComunidadesService, ComunidadesRepository],
  exports: [ComunidadesService],
  imports: [
    UsuariosModule,
    MateriasModule,
    TurmasModule
  ]
})
export class ComunidadesModule {}
