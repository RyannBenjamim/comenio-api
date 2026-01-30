import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';

import { UsuariosModule } from '../../../usuarios/usuarios.module';
import { FeedsModule } from '../../../feeds/feeds.module';
import { ComunidadesModule } from '../../../comunidades/comunidades.module';
import { FirebaseModule } from '../../../../../common/firebase/firebase.module';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
  ],
  exports: [
    PostsService,
    PostsRepository,
  ],
  imports: [
    UsuariosModule,
    FeedsModule,
    ComunidadesModule,
    FirebaseModule
  ]
})
export class PostsModule {}
