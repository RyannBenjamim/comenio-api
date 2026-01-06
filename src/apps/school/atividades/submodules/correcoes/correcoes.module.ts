import { forwardRef, Module } from '@nestjs/common';
import { CorrecoesController } from './correcoes.controller';
import { CorrecoesService } from './correcoes.service';
import { CorrecoesRepository } from './correcoes.repository';
import { ResolucoesModule } from '../resolucoes/resolucoes.module';
import { AtividadesModule } from '../../atividades.module';
import { UsuariosModule } from '../../../usuarios/usuarios.module';

@Module({
  controllers: [CorrecoesController],
  providers: [CorrecoesService, CorrecoesRepository],
  exports: [CorrecoesService],
  imports: [forwardRef(() => AtividadesModule), ResolucoesModule, UsuariosModule]
})
export class CorrecoesModule {}
