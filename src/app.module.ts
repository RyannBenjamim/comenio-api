import { Module } from '@nestjs/common';
import { PrismaModule } from './common/database/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { FirebaseModule } from './common/firebase/firebase.module';
import { AdminModule } from './apps/admin/admin.module';
import { SchoolModule } from './apps/school/school.module';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
    PrismaModule,
    FirebaseModule,
    AdminModule,
    SchoolModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
