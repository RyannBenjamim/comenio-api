import { Module } from '@nestjs/common';
import { ComunidadesController } from './comunidades.controller';
import { ComunidadesService } from './comunidades.service';
import { ComunidadesRepository } from './comunidades.repository';
import { AulasModule } from '../academico/aulas/aulas.module';

@Module({
  controllers: [ComunidadesController],
  providers: [ComunidadesService, ComunidadesRepository],
  exports: [ComunidadesService, ComunidadesRepository],
  imports: [AulasModule]
})
export class ComunidadesModule {}
