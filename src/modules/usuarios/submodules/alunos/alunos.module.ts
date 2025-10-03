import { forwardRef, Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { AlunosRepository } from './alunos.repository'; 
import { UsuariosModule } from '../../usuarios.module';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService, AlunosRepository],
  imports: [forwardRef(() => UsuariosModule)]
})
export class AlunosModule {}