import { Module } from '@nestjs/common';
import { ResolucoesController } from './resolucoes.controller';
import { ResolucoesService } from './resolucoes.service';
import { ResolucoesRepository } from './resolucoes.repository';
import { AtividadesModule } from '../../atividades.module';

@Module({
  controllers: [ResolucoesController],
  providers: [ResolucoesService, ResolucoesRepository],
  exports: [ResolucoesService],
  imports: [AtividadesModule]
})
export class ResolucoesModule {}
