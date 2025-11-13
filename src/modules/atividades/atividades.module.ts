import { Module } from '@nestjs/common';
import { AtividadesController } from './atividades.controller';
import { AtividadesService } from './atividades.service';
import { AtividadesRepository } from './atividades.repository';
import { ComunidadesModule } from '../comunidades/comunidades.module';
import { RouterModule } from '@nestjs/core';
import { ResolucoesModule } from './submodules/resolucoes/resolucoes.module';
import { CorrecoesModule } from './submodules/correcoes/correcoes.module';

@Module({
  controllers: [AtividadesController],
  providers: [AtividadesService, AtividadesRepository],
  exports: [AtividadesService],
  imports: [
    ComunidadesModule, 
    RouterModule.register([
      {
        path: 'atividades',
        children: [
          {
            path: 'resolucoes',
            module: ResolucoesModule
          },
          {
            path: 'correcoes',
            module: CorrecoesModule
          },
          {
            path: '',
            module: AtividadesModule
          }
        ]
      }
    ])
  ]
})
export class AtividadesModule {}
