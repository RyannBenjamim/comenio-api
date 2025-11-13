import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { FeedsModule } from '../feeds/feeds.module';
import { ComunidadesModule } from '../comunidades/comunidades.module';
import { RespostasModule } from './submodules/respostas/resposta.module';
import { CurtidasModule } from './submodules/curtidas/curtidas.module';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService],
  imports: [
    UsuariosModule,
    FeedsModule,
    ComunidadesModule,
    forwardRef(() => RespostasModule),
    forwardRef(() => CurtidasModule),
    RouterModule.register([
      {
        path: 'posts',
        children: [
          {
            path: 'respostas',
            module: RespostasModule
          },
          {
            path: 'curtidas',
            module: CurtidasModule
          },
          {
            path: '',
            module: PostsModule
          }
        ]
      }
    ])
  ]
})
export class PostsModule {}

