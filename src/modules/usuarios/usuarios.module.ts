import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuariosRepository } from './usuarios.repository';
import { AlunosModule } from './submodules/alunos/alunos.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuariosRepository],
  imports: [forwardRef(() => AlunosModule)],
  exports: [UsuariosRepository]
})
export class UsuariosModule {}
