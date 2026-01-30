import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { CurtidasModule } from './modules/curtidas/curtidas.module';
import { RespostasModule } from './modules/respostas/resposta.module';

@Module({
  imports: [
    PostsModule,
    CurtidasModule,
    RespostasModule,
  ],
})
export class SocialModule {}