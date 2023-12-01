import { Dish } from "./dish.entity"

describe("Dish Tests", () => {
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