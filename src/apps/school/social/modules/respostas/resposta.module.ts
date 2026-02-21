import { forwardRef, Module } from '@nestjs/common';
import { RespostasController } from './respostas.controller';
import { RespostasService } from './respostas.service';
import { RespostasRepository } from './respostas.repository';
import { UsuariosModule } from '../../../usuarios/usuarios.module';
import { PostsModule } from '../posts/posts.module';
import { ComunidadesModule } from '../../../comunidades/comunidades.module';
import { FeedsModule } from '../../../feeds/feeds.module';
import { PrismaModule } from '../../../../../common/database/prisma.module';
import { FirebaseModule } from '../../../../../common/firebase/firebase.module';

@Module({
  controllers: [RespostasController],
  providers: [RespostasService, RespostasRepository],
  exports: [RespostasService, RespostasRepository],
  imports: [
    UsuariosModule,
    ComunidadesModule,
    FeedsModule,
    PostsModule,
    RespostasModule,
    PrismaModule,
    FirebaseModule
  ]
})
export class RespostasModule {}
