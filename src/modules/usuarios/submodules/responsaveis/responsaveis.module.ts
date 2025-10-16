import { forwardRef, Module } from '@nestjs/common';
import { UsuariosModule } from '../../usuarios.module';
import { ResponsaveisController } from './responsaveis.controller';
import { ResponsaveisService } from './responsaveis.service';
import { ResponsaveisRepository } from './responsaveis.repository';

@Module({
  controllers: [ResponsaveisController],
  providers: [ResponsaveisService, ResponsaveisRepository],
  imports: [forwardRef(() => UsuariosModule)]
})
export class ResponsaveisModule {}