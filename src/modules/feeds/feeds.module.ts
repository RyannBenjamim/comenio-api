import { Module } from '@nestjs/common';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { FeedsRepository } from './feeds.repository';

@Module({
  controllers: [FeedsController],
  providers: [FeedsService, FeedsRepository],
  exports: [FeedsService]
})
export class FeedsModule {}

