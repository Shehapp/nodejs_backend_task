const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../models/product_model');
const {getCategoryByIdService} = require('./category_service');


const getAllProductsService =async () => {
    const products = await getProducts();
    if(products.length === 0){
        throw {status: 404, message: 'No products found'};
    }
    return products;
}

const getProductByIdService =async (id) => {

    const product = await getProductById(id);
    if(product.length === 0){
        throw {status: 404, message: 'Product not found'};
    }
    return product;

}

const createProductService =async (req) => {
    const { name, description, price, stock, category_id } = req.body;
    const values = [name, description, price, stock,category_id];

    
    if (!name || !description || !price || !stock || !category_id) {
        throw {status: 400, message: 'Please fill in all fields'};
    }


    // if category_id is not valid, throw error
    await getCategoryByIdService(category_id);

    const product = await createProduct(values);
    return product;
}

const updateProductService = async(id, req) => {
    const { name, description, price, stock, category_id } = req.body;
    const values = [name, description, price, stock,category_id, id];

    if (!name || !description || !price || !stock || !category_id) {
        throw {status: 400, message: 'Please fill in all fields'};
    }

    // if category_id is not valid, throw error
    await getCategoryByIdService(category_id);

    const product = await updateProduct(values);
    if(product.affectedRows === 0){
        throw {status: 404, message: 'Product not found'};
    }
    return product;
    
}

const deleteProductService =async (id) => {

    const res = await deleteProduct(id);
    if(res.affectedRows === 0){
        throw {status: 404, message: 'Product not found'};
    }
}

module.exports = {
    getAllProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService};