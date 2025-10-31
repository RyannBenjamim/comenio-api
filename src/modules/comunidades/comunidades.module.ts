import { Module } from '@nestjs/common';
import { ComunidadesController } from './comunidades.controller';
import { ComunidadesService } from './comunidades.service';
import { ComunidadesRepository } from './comunidades.repository';

@Module({
  controllers: [ComunidadesController],
  providers: [ComunidadesService, ComunidadesRepository],
  exports: [ComunidadesService]
})
export class ComunidadesModule {}
