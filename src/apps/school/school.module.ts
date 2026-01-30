import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LoginModule } from './login/login.module';
import { FeedsModule } from './feeds/feeds.module';
import { ComunidadesModule } from './comunidades/comunidades.module';
import { SocialModule } from './social/social.module';
import { AvaliativoModule } from './avaliativo/avaliativo.module';
import { AcademicoModule } from './academico/academico.module';

@Module({
  imports: [
    UsuariosModule,
    LoginModule,
    FeedsModule,
    ComunidadesModule,
    AvaliativoModule,
    SocialModule,
    AcademicoModule,
  ],
})
export class SchoolModule {}
