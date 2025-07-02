import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { KamusModule } from './kamus/kamus.module';
import { NegeriModule } from './negeri/negeri.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Database connection
    DatabaseModule,
    // Feature modules
    NegeriModule,
    KamusModule,
  ],
})
export class AppModule {}
