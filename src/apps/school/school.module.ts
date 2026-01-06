import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LoginModule } from './login/login.module';
import { FeedsModule } from './feeds/feeds.module';
import { ComunidadesModule } from './comunidades/comunidades.module';
import { AtividadesModule } from './atividades/atividades.module';
import { PostsModule } from './posts/posts.module';
import { TurmasModule } from './academico/turmas/turmas.module';

@Module({
  imports: [
    UsuariosModule,
    LoginModule,
    FeedsModule,
    ComunidadesModule,
    AtividadesModule,
    PostsModule,
    TurmasModule,
  ],
})
export class SchoolModule {}
