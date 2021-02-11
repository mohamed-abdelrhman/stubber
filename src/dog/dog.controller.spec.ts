import { Test } from '@nestjs/testing';
import { Dog } from './entities/dog.entity';
import { DogController } from './dog.controller';
import { DogModule } from './dog.module';
import { INestApplication } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('DogModuleIntegration', () => {
  let app: INestApplication;
  let controller;
  let connection;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DogModule,
        // PostgresDatabaseProviderModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123456',
          database: 'e2e_test',
          entities: [Dog],
          synchronize: true,
        }),
      ],
      providers: [],
      controllers: [DogController],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    controller = module.get<DogController>(DogController);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.createQueryBuilder().delete().from(Dog).execute();
  });
  afterAll(async () => {
    await app.close();
  });

  describe('dog controller', () => {
    it('should be defined', async () => {
      expect(controller).toBeDefined();
    });
  });
});
