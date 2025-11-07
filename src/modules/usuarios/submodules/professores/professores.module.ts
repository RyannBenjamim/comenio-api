import { forwardRef, Module } from '@nestjs/common';
import { UsuariosModule } from '../../usuarios.module';
import { ProfessoresController } from './professores.controller';
import { ProfessoresService } from './professores.service';
import { ProfessoresRepository } from './professores.repository';

@Module({
  controllers: [ProfessoresController],
  providers: [ProfessoresService, ProfessoresRepository],
  imports: [forwardRef(() => UsuariosModule)],
  exports: [ProfessoresService]
})
export class ProfessoresModule {}