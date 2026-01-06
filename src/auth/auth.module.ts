import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UsuariosModule } from '../apps/school/usuarios/usuarios.module';
import { SuperadminModule } from '../apps/admin/superadmin/superadmin.module';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/role.guard';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
    UsuariosModule,
    SuperadminModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [JwtModule]
})
export class AuthModule {}
