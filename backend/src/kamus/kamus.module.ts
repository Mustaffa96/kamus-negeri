import { Module } from '@nestjs/common';
import { KamusService } from './kamus.service';
import { KamusController } from './kamus.controller';
import { kamusProviders } from './kamus.providers';
import { NegeriModule } from '../negeri/negeri.module';
import { negeriProviders } from '../negeri/negeri.providers';

@Module({
  imports: [NegeriModule],
  controllers: [KamusController],
  providers: [KamusService, ...kamusProviders, ...negeriProviders],
  exports: [KamusService],
})
export class KamusModule {}
