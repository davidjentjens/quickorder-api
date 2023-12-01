import { Test, TestingModule } from '@nestjs/testing';
import { DishesService } from './dishes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './entities/dish.entity';

// Note: Integration Test => Middleweight, slower, involves external dependencies
// in this case, the mongoose connection
describe('DishesService', () => {
  let service: DishesService;
  let module: TestingModule;

  beforeEach(async () => {
    const host = "localhost"
    const uri = `mongodb://root:root@${host}:27017/dishes_service_test?authSource=admin`
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }])
      ],
      providers: [DishesService],
    }).compile();

    service = module.get<DishesService>(DishesService);
  });

  afterEach(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a dish', async () => {
    const dish = await service.create({
      name: 'Bolognese Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });

    expect(dish.name).toBe('Bolognese Sauce');
    expect(dish.price).toBe(10);
    expect(dish.description).toBe('A delicious sauce');
    expect(dish.imageUrl).toBe('http://testurl.test');
  });
});
