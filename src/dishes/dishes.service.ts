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
    return this.dishModel.find().exec();
  }

  findOne(id: string) {
    return this.dishModel.findById(id).exec();
  }

  update(id: string, updateDishDto: UpdateDishDto) {
    return this.dishModel.updateOne({ _id: id }, updateDishDto).exec()
  }

  remove(id: string) {
    return this.dishModel.deleteOne({ _id: id }).exec()
  }

  async removeAll() {
    await this.dishModel.deleteMany({}).exec()
  }
}
