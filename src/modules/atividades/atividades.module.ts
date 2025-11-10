import { Module } from '@nestjs/common';
import { AtividadesController } from './atividades.controller';
import { AtividadesService } from './atividades.service';
import { AtividadesRepository } from './atividades.repository';
import { ComunidadesModule } from '../comunidades/comunidades.module';

@Module({
  controllers: [AtividadesController],
  providers: [AtividadesService, AtividadesRepository],
  exports: [AtividadesService],
  imports: [ComunidadesModule]
})
export class AtividadesModule {}
