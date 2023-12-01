import mongoose from "mongoose"
import { Dish, DishSchema } from "./dish.entity"

describe("Dish Tests", () => {

    // Note: Unit Test => Lightweigth, fast, isolated
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

    // Note: Integration Test => Middleweight, slower, involves external dependencies
    // in this case, the mongoose connection
    describe("Using MongoDB", () => {
        let conn: mongoose.Mongoose

        const host = "localhost"
        const uri = `mongodb://root:root@${host}:27017/dishes_entity_test?authSource=admin`

        beforeEach(async () => {
            conn = await mongoose.connect(uri)
        })

        afterEach(async () => {
            await conn.disconnect()
        })

        it("should create a dish document", async () => {
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