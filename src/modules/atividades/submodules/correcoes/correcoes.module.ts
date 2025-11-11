import { Module } from '@nestjs/common';
import { CorrecoesController } from './correcoes.controller';
import { CorrecoesService } from './correcoes.service';
import { CorrecoesRepository } from './correcoes.repository';
import { ResolucoesModule } from '../resolucoes/resolucoes.module';
import { ProfessoresModule } from 'src/modules/usuarios/submodules/professores/professores.module';

@Module({
  controllers: [CorrecoesController],
  providers: [CorrecoesService, CorrecoesRepository],
  exports: [CorrecoesService],
  imports: [ResolucoesModule, ProfessoresModule]
})
export class CorrecoesModule {}
