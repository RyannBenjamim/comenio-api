import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    UsuariosModule,
    AuthModule
  ]
})
export class LoginModule {}
