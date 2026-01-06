import { Module } from '@nestjs/common';
import { SuperadminRepository } from './superadmin.repository';

@Module({
  providers: [SuperadminRepository],
  exports: [SuperadminRepository],
})
export class SuperadminModule {}
