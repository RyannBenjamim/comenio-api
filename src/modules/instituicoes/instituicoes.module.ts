import { Module } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { InstituicoesController } from './instituicoes.controller';
import { InstituicoesRepository } from './instituicoes.repository';

@Module({
  controllers: [InstituicoesController],
  providers: [InstituicoesService, InstituicoesRepository],
  exports: [InstituicoesService]
})
export class InstituicoesModule {}
