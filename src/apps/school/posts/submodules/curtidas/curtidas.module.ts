import { forwardRef, Module } from '@nestjs/common';
import { UsuariosModule } from '../../../usuarios/usuarios.module';
import { PostsModule } from '../../posts.module';
import { RespostasModule } from '../respostas/resposta.module';
import { CurtidasController } from './curtidas.controller';
import { CurtidasRepository } from './curtidas.repository';
import { CurtidasService } from './curtidas.service';
import { ComunidadesModule } from '../../../comunidades/comunidades.module';
import { FeedsModule } from '../../../feeds/feeds.module';

@Module({
  controllers: [CurtidasController],
  providers: [CurtidasService, CurtidasRepository],
  exports: [CurtidasService, CurtidasRepository],
  imports: [
    UsuariosModule,
    ComunidadesModule,
    FeedsModule,
    forwardRef(() => PostsModule),
    RespostasModule,
  ]
})
export class CurtidasModule {}