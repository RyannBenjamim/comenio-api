import { forwardRef, Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { AlunosRepository } from './alunos.repository'; 
import { UsuariosModule } from '../../usuarios.module';
import { TurmasModule } from '../../../academico/turmas/turmas.module';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService, AlunosRepository],
  imports: [forwardRef(() => UsuariosModule), TurmasModule]
})
export class AlunosModule {}