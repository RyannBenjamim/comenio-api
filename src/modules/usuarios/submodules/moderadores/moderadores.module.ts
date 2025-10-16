import { forwardRef, Module } from '@nestjs/common';
import { UsuariosModule } from '../../usuarios.module';
import { ModeradoresController } from './moderadores.controller';
import { ModeradoresService } from './moderadores.service';
import { ModeradoresRepository } from './moderadores.repository';

@Module({
  controllers: [ModeradoresController],
  providers: [ModeradoresService, ModeradoresRepository],
  imports: [forwardRef(() => UsuariosModule)]
})
export class ModeradoresModule {}