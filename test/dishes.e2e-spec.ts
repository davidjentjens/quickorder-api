import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('DishesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /dishes', async () => {
    const res = await request(app.getHttpServer())
      .post('/dishes')
      .send({
        name: 'Bolognese Sauce',
        price: 10,
        description: 'A delicious sauce',
        imageUrl: 'http://testurl.test',
      })
      .expect(201);

    expect(res.body._id).toBeDefined();
    expect(res.body).toMatchObject({
      name: 'Bolognese Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });
  });
});
