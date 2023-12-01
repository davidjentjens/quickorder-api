import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DishDocument = Dish & Document;

export type DishProps = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
};

@Schema()
export class Dish {
    constructor(props: DishProps) {
        Object.assign(this, props);
    }

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop()
    description: string;

    @Prop({ required: true })
    imageUrl: string;
}

export const DishSchema = SchemaFactory.createForClass(Dish);