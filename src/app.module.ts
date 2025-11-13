import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedsModule } from './modules/feeds/feeds.module';
import { ComunidadesModule } from './modules/comunidades/comunidades.module';
import { AtividadesModule } from './modules/atividades/atividades.module';
import { PostsModule } from './modules/posts/posts.module';
import { InstituicoesModule } from './modules/instituicoes/instituicoes.module';
import { PrismaModule } from './database/prisma.module';
import { TurmasModule } from './modules/academico/turmas/turmas.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    // Configuração global do Throttler
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: 60000, 
        limit: 100, 
        blockDuration: 5000  
      },
    ]),
    PrismaModule,
    UsuariosModule, 
    AuthModule, 
    FeedsModule, 
    ComunidadesModule, 
    AtividadesModule, 
    PostsModule, 
    InstituicoesModule,
    TurmasModule,
    FeedsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
