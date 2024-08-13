import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Dish } from '../../dishes/entities/dish.entity';

export type OrderDocument = Order & Document;

type Status = 'received' | 'preparing' | 'ready-to-serve';

export interface DishSelection {
  id: string;
  quantity: number;
  dish: Dish;
}

export interface OrderProps {
  id: string;
  status: Status;
  dishSelections: DishSelection[];
  total: number;
}

@Schema()
export class Order {
  constructor(props: OrderProps) {
    Object.assign(this, props);
  }

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  status: Status;

  @Prop({ required: true })
  dishSelections: DishSelection[];

  @Prop({ required: true, default: 1 })
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
