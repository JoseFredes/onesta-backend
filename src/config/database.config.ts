import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './data/onesta.sqlite',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};

export default databaseConfig;
