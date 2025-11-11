import { Module } from '@nestjs/common';
import { AulasController } from './aulas.controller';
import { AulasService } from './aulas.service';
import { AulasRepository } from './aulas.repository';
import { TurmasModule } from '../turmas/turmas.module';
import { MateriasModule } from '../materias/materias.module';
import { ProfessoresModule } from '../../usuarios/submodules/professores/professores.module';
import { UsuariosModule } from '../../usuarios/usuarios.module';

@Module({
  controllers: [AulasController],
  providers: [AulasService, AulasRepository],
  imports: [TurmasModule, MateriasModule, UsuariosModule],
  exports: [AulasService]
})
export class AulasModule {}
