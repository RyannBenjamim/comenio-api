import { forwardRef, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core'; 
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuariosRepository } from './usuarios.repository';

import { AlunosModule } from './submodules/alunos/alunos.module';
import { InstituicoesModule } from '../instituicoes/instituicoes.module';
import { ModeradoresModule } from './submodules/moderadores/moderadores.module';
import { ResponsaveisModule } from './submodules/responsaveis/responsaveis.module';
import { ProfessoresModule } from './submodules/professores/professores.module';
import { AlunosResponsavelModule } from './submodules/alunos-responsavel/alunos-responsavel.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuariosRepository],
  imports: [
    forwardRef(() => AlunosModule), 
    forwardRef(() => ProfessoresModule),
    forwardRef(() => ModeradoresModule), 
    forwardRef(() => ResponsaveisModule),
    InstituicoesModule,
    RouterModule.register([
      {
        path: 'usuarios', 
        children: [
          {
            path: 'alunos', 
            module: AlunosModule,
          },
          {
            path: 'professores', 
            module: ProfessoresModule,
          },
          {
            path: 'moderadores', 
            module: ModeradoresModule,
          },
          {
            path: 'responsaveis', 
            module: ResponsaveisModule,
          },
          {
            path: 'alunos-responsavel',
            module: AlunosResponsavelModule,
          },
          {
            path: '',
            module: UsuariosModule,
          },
        ],
      },
    ]),
  ],
  exports: [UsuariosService, UsuariosRepository]
})
export class UsuariosModule {}
