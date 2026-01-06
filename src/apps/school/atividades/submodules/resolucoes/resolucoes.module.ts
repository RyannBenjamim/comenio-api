import { forwardRef, Module } from '@nestjs/common';
import { ResolucoesController } from './resolucoes.controller';
import { ResolucoesService } from './resolucoes.service';
import { ResolucoesRepository } from './resolucoes.repository';
import { AtividadesModule } from '../../atividades.module';
import { UsuariosModule } from '../../../usuarios/usuarios.module';

@Module({
  controllers: [ResolucoesController],
  providers: [ResolucoesService, ResolucoesRepository],
  exports: [ResolucoesService],
  imports: [forwardRef(() => AtividadesModule), UsuariosModule]
})
export class ResolucoesModule {}
