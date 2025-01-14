import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeORMModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: +configService.get('DB_PORT') || 5432,
    username: configService.get('DB_USER') || 'postgres',
    password: configService.get('DB_PASSWORD') || 'password',
    database: configService.get('DB_NAME') || 'db_name',
    autoLoadEntities: true,
  }),
  inject: [ConfigService],
});

export default typeORMModule;
