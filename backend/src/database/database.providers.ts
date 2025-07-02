import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Kamus } from '../kamus/entities/kamus.entity';
import { Negeri } from '../negeri/entities/negeri.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        logging: false,
        define: {
          timestamps: true,
        },
      });
      
      // Register models
      sequelize.addModels([Negeri, Kamus]);
      
      // Sync database (in production, you might want to use migrations instead)
      await sequelize.sync();
      
      return sequelize;
    },
  },
];
