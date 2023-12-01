import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish, DishDocument } from './entities/dish.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DishesService {
  constructor(
    @InjectModel(Dish.name)
    private dishModel: Model<DishDocument>
  ) {
    this.dishModel = dishModel;
  }

  async create(createDishDto: CreateDishDto) {
    const dishDoc = new this.dishModel(createDishDto);
    await dishDoc.save();
    return dishDoc
  }

  findAll() {
    return `This action returns all dishes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dish`;
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  remove(id: number) {
    return `This action removes a #${id} dish`;
  }
}
