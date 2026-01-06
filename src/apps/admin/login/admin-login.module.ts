import { Module } from '@nestjs/common';
import { LoginService } from './admin-login.service';
import { LoginController } from './admin-login.controller';
import { SuperadminModule } from '../superadmin/superadmin.module';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    SuperadminModule,
    AuthModule
  ],
})
export class LoginModule {}
