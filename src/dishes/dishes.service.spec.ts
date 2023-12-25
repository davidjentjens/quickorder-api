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
    const uri = `mongodb://root:root@db_test:27017/dishes_service_test?authSource=admin`;
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
      ],
      providers: [DishesService],
    }).compile();

    service = module.get<DishesService>(DishesService);
  });

  afterEach(async () => {
    await service.removeAll();
    await module.close();
  });

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

    const createdDish = await service['dishModel'].findById(dish._id).exec();
    expect(createdDish.name).toBe('Bolognese Sauce');
    expect(createdDish.price).toBe(10);
    expect(createdDish.description).toBe('A delicious sauce');
    expect(createdDish.imageUrl).toBe('http://testurl.test');
  });

  it('should find all dishes', async () => {
    await service.create({
      name: 'Bolognese Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });

    await service.create({
      name: 'Pesto Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });

    const dishes = await service.findAll();
    expect(dishes.length).toBe(2);
    expect(dishes[0].name).toBe('Bolognese Sauce');
    expect(dishes[1].name).toBe('Pesto Sauce');
  });

  it('should find a dish by id', async () => {
    const dish = await service.create({
      name: 'Bolognese Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });

    const foundDish = await service.findOne(dish._id);
    expect(foundDish.name).toBe('Bolognese Sauce');
    expect(foundDish.price).toBe(10);
    expect(foundDish.description).toBe('A delicious sauce');
    expect(foundDish.imageUrl).toBe('http://testurl.test');
  });

  it('should update a dish', async () => {
    const dish = await service.create({
      name: 'Bolognese Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });

    await service.update(dish._id, {
      name: 'Pesto Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });

    const updatedDish = await service['dishModel'].findById(dish._id).exec();

    expect(updatedDish.name).toBe('Pesto Sauce');
    expect(updatedDish.price).toBe(10);
    expect(updatedDish.description).toBe('A delicious sauce');
    expect(updatedDish.imageUrl).toBe('http://testurl.test');

    const foundDish = await service.findOne(dish._id);
    expect(foundDish.name).toBe('Pesto Sauce');
    expect(foundDish.price).toBe(10);
    expect(foundDish.description).toBe('A delicious sauce');
    expect(foundDish.imageUrl).toBe('http://testurl.test');
  });

  it('should remove a dish', async () => {
    const dish = await service.create({
      name: 'Bolognese Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });

    await service.remove(dish._id);

    const foundDish = await service.findOne(dish._id);
    expect(foundDish).toBeNull();
  });

  it('should remove all dishes', async () => {
    await service.create({
      name: 'Bolognese Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });

    await service.create({
      name: 'Pesto Sauce',
      price: 10,
      description: 'A delicious sauce',
      imageUrl: 'http://testurl.test',
    });

    await service.removeAll();

    const dishes = await service.findAll();
    expect(dishes.length).toBe(0);
  });
});
