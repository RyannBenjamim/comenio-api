import { Module } from '@nestjs/common';
import { AtividadesModule } from './modules/atividades/atividades.module';
import { ResolucoesModule } from './modules/resolucoes/resolucoes.module';
import { CorrecoesModule } from './modules/correcoes/correcoes.module';

@Module({
  imports: [
    AtividadesModule,
    ResolucoesModule,
    CorrecoesModule
  ]
})
export class AvaliativoModule {}