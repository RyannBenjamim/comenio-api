import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { FeedsModule } from '../feeds/feeds.module';
import { ComunidadesModule } from '../comunidades/comunidades.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService],
  imports: [
    UsuariosModule,
    FeedsModule,
    ComunidadesModule
  ]
})
export class PostsModule {}

