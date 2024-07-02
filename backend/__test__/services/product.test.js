
const { getAllProductsService} = require("../../services/product_service.js");
const { getProducts } = require("../../models/product_model.js");

jest.mock("../../models/product_model.js");



it("test getAllProductsService must return all products if exist and throw exception if not", async () => {
    var products = [
        {
            id: 1,
            name: "product1",
            description: "description1",
            price: 100,
            stock: 10,
            category_id: 1,
        },
        {
            id: 2,
            name: "product2",
            description: "description2",
            price: 200,
            stock: 20,
            category_id: 2,
        },
    ];

    getProducts.mockResolvedValue(products);

    var result = await getAllProductsService();
    expect(result).toEqual(products);

    try {
        products = [];
        getProducts.mockResolvedValue(products);
        result = await getAllProductsService();
    } catch (error) {
        expect(error).toEqual({ status: 404, message: "No products found" });
    }
});
