import { SequelizeModule } from '@nestjs/sequelize';
import { ModelCtor, Sequelize } from 'sequelize-typescript';

export async function createMemDB(models: ModelCtor[]): Promise<Sequelize> {
  const memDb = new Sequelize({
    dialect: 'postgres',
    storage: ':memory:',
    logging: false,
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "custom-blog",
  });



  memDb.addModels(models);

  await memDb.sync();

  return memDb;
}