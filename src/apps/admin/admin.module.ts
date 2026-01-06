import { Module } from '@nestjs/common';
import { InstituicoesModule } from './instituicoes/instituicoes.module';
import { LoginModule } from './login/admin-login.module';

@Module({
  imports: [
    LoginModule,
    InstituicoesModule,
  ],
})
export class AdminModule {}
