import { Test, TestingModule } from '@nestjs/testing';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Dish } from './entities/dish.entity';

/*
The active selection of code is from a TypeScript file, specifically a test file (dishes.controller.spec.ts). This file is likely part of a testing suite for a Node.js application, possibly using a framework like NestJS.

The code is configuring the providers for a module, which is a fundamental part of the dependency injection system in NestJS. Providers can be services, repositories, factories, helpers, and more. They are the constructs that other parts of your application will request as dependencies.

Here, two providers are being set up:

DishesService: This is likely a service class that contains business logic related to "dishes". In NestJS, services are commonly used to abstract complex logic away from the controllers and keep the system well-organized.

An object with provide and useValue properties: This is a custom provider. The provide property is used to define the token that NestJS will use to look up the provider. In this case, getModelToken(Dish.name) is used, which is a common pattern when using the @nestjs/mongoose package to work with MongoDB. The useValue property tells NestJS what will actually be provided when something injects a dependency using the token. Here, it's the Dish model.

In summary, this code is setting up the dependencies that will be injected into other parts of the application. It's a key part of how NestJS organizes its code and manages dependencies.

DishModel
*/

describe('DishesController', () => {
  let controller: DishesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DishesController],
      providers: [
        DishesService,
        {
          provide: getModelToken(Dish.name),
          useValue: Dish,
        },
      ],
    }).compile();

    controller = module.get<DishesController>(DishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
