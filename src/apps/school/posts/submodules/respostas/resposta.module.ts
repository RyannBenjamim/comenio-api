import { forwardRef, Module } from '@nestjs/common';
import { RespostasController } from './respostas.controller';
import { RespostasService } from './respostas.service';
import { RespostasRepository } from './respostas.repository';
import { UsuariosModule } from '../../../usuarios/usuarios.module';
import { PostsModule } from '../../posts.module';
import { ComunidadesModule } from '../../../comunidades/comunidades.module';
import { FeedsModule } from '../../../feeds/feeds.module';

@Module({
  controllers: [RespostasController],
  providers: [RespostasService, RespostasRepository],
  exports: [RespostasService, RespostasRepository],
  imports: [
    UsuariosModule,
    ComunidadesModule,
    FeedsModule,
    forwardRef(() => PostsModule)
  ]
})
export class RespostasModule {}
