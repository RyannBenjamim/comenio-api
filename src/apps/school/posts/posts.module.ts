import { Module, forwardRef } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';

import { UsuariosModule } from '../usuarios/usuarios.module';
import { FeedsModule } from '../feeds/feeds.module';
import { ComunidadesModule } from '../comunidades/comunidades.module';
import { RespostasModule } from './submodules/respostas/resposta.module';
import { CurtidasModule } from './submodules/curtidas/curtidas.module';
import { FirebaseModule } from '../../../common/firebase/firebase.module';

import { ContextService } from './guards/context.service';
import { ContextResolverGuard } from './guards/context-resolver.guard'
import { ContextAccessGuard } from './guards/context-access.guard';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    ContextService,
    ContextResolverGuard,
    ContextAccessGuard,
  ],
  exports: [
    PostsService,
    PostsRepository,
    ContextService,
    ContextResolverGuard,
    ContextAccessGuard,
  ],
  imports: [
    UsuariosModule,
    FeedsModule,
    ComunidadesModule,
    FirebaseModule,

    forwardRef(() => RespostasModule),
    forwardRef(() => CurtidasModule),

    RouterModule.register([
      {
        path: 'api/posts',
        children: [
          { path: 'respostas', module: RespostasModule },
          { path: 'curtidas', module: CurtidasModule },
          { path: '', module: PostsModule },
        ],
      },
    ]),
  ],
})
export class PostsModule {}


