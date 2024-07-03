const {Product} = require('../models');
const {getCategoryByIdService} = require('./category_service');

const getAllProductsService =async () => {
    const products = await Product.findAll();
    if(!products || products.length === 0){
        throw {status: 404, message: 'No products found'};
    }
    return products;
}

const getProductByIdService =async (id) => {
    const product = await Product.findByPk(id);
    if(!product || product.length === 0){
        throw {status: 404, message: 'Product not found'};
    }
    return product;

}

const createProductService =async (req) => {
    const { name, description, price, stock, category_id } = req.body;

    if (!name || !description || !price || !stock || !category_id) {
        throw {status: 400, message: 'Please fill in all fields'};
    }

    // if category_id is not valid, throw error
    await getCategoryByIdService(category_id);

    const product = await Product.create({
        name: name,
        description: description,
        price: price,
        stock: stock,
        category_id: category_id
    });
    return product;
}

const updateProductService = async(id, req) => {

    const { name, description, price, stock, category_id } = req.body;

    if (!name || !description || !price || !stock || !category_id) {
        throw {status: 400, message: 'Please fill in all fields'};
    }

    // if category_id is not valid, throw error
    await getCategoryByIdService(category_id);

    const res = await Product.update({
        name: name,
        description: description,
        price: price,
        stock: stock,
        category_id: category_id
    }, {
        where: {
            id: id
        }
    });  
}

const deleteProductService =async (id) => {
    const res = await Product.destroy({
        where: {
            id: id
        }
    });
    if(res === 0){
        throw {status: 404, message: 'Product not found'};
    }
    return res;
}

module.exports = {
    getAllProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService
};