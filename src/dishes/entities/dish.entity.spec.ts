import mongoose from "mongoose"
import { Dish, DishSchema } from "./dish.entity"

describe("Dish Tests", () => {

    describe("Dish Class", () => {
        it("should create a dish", () => {
            const dish = new Dish({
                name: "Bolognese Sauce",
                price: 10,
                description: "A delicious sauce",
                imageUrl: "http://testurl.test"
            })

            expect(dish.name).toBe("Bolognese Sauce")
            expect(dish.price).toBe(10)
            expect(dish.description).toBe("A delicious sauce")
            expect(dish.imageUrl).toBe("http://testurl.test")
        })
    })

    describe("Using MongoDB", () => {
        let conn: mongoose.Mongoose

        beforeEach(async () => {
            conn = await mongoose.connect(
                "mongodb://root:root@localhost:27017/dishes_test?authSource=admin"
            )
        })

        afterEach(async () => {
            await conn.disconnect()
        })

        it("should create a dish document", async () => {
            const conn = await mongoose.connect(
                "mongodb://root:root@localhost:27017/dishes_test?authSource=admin"
            )

            const DishModel = conn.model("Dish", DishSchema)
            const dish = new DishModel({
                name: "Bolognese Sauce",
                price: 10,
                description: "A delicious sauce",
                imageUrl: "http://testurl.test"
            })

            await dish.save()

            const createdDish = await DishModel.findOne(dish._id)

            expect(createdDish.name).toBe("Bolognese Sauce")
            expect(createdDish.price).toBe(10)
            expect(createdDish.description).toBe("A delicious sauce")
            expect(createdDish.imageUrl).toBe("http://testurl.test")
        })
    })
})