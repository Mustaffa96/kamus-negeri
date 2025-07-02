import { Module } from '@nestjs/common';
import { NegeriService } from './negeri.service';
import { NegeriController } from './negeri.controller';
import { negeriProviders } from './negeri.providers';

@Module({
  controllers: [NegeriController],
  providers: [NegeriService, ...negeriProviders],
  exports: [NegeriService],
})
export class NegeriModule {}
