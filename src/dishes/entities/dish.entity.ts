export type DishProps = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
};

export class Dish {
    constructor(props: DishProps) {
        Object.assign(this, props);
    }

    name: string;
    price: number;
    description: string;
    imageUrl: string;
}
