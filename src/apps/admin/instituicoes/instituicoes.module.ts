import { forwardRef, Module } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { InstituicoesController } from './instituicoes.controller';
import { InstituicoesRepository } from './instituicoes.repository';
import { UsuariosModule } from '../../school/usuarios/usuarios.module';

@Module({
  controllers: [InstituicoesController],
  providers: [InstituicoesService, InstituicoesRepository],
  exports: [InstituicoesService],
  imports: [forwardRef(() => UsuariosModule)]
})
export class InstituicoesModule {}
