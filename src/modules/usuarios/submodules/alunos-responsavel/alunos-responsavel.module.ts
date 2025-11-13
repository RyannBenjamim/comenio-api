import { forwardRef, Module } from '@nestjs/common';
import { UsuariosModule } from '../../usuarios.module';
import { AlunosResponsavelController } from './alunos-responsavel.controller';
import { AlunosResponsavelRepository } from './alunos-responsavel.repository';
import { AlunosResponsavelService } from './alunos-responsavel.service';

@Module({
  controllers: [AlunosResponsavelController],
  providers: [AlunosResponsavelRepository, AlunosResponsavelService],
  imports: [forwardRef(() => UsuariosModule)]
})
export class AlunosResponsavelModule {}