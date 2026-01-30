import { Module } from '@nestjs/common';
import { ResolucoesController } from './resolucoes.controller';
import { ResolucoesService } from './resolucoes.service';
import { ResolucoesRepository } from './resolucoes.repository';
import { UsuariosModule } from '../../../usuarios/usuarios.module';
import { FirebaseModule } from '../../../../../common/firebase/firebase.module';

@Module({
  controllers: [ResolucoesController],
  providers: [ResolucoesService, ResolucoesRepository],
  exports: [ResolucoesService],
  imports: [
    UsuariosModule,
    FirebaseModule,
  ]
})
export class ResolucoesModule {}