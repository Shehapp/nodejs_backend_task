const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../models/product_model');
const {getCategoryByIdService} = require('./category_service');


const getAllProductsService = (callback) => {
    getProducts((err, res) => {
        if (err) {
            //TODO: log error
            callback({status: 500, message: 'Internal Server Error'}, null);
        } else {
            if(res.length === 0){
                callback({status: 404, message: 'No products found'}, null);
            } else {
                callback(null, res);
            }
        }
    });
}

const getProductByIdService = (id, callback) => {
    getProductById(id, (err, res) => {
        if (err) { 
            callback({status: 500, message: 'Internal Server Error'}, null);
        }
        if(res.length === 0){
            callback({status: 404, message: 'Product not found'}, null);
        } else {
            callback(null, res);
        }
    }
    );
}

const createProductService = (req, callback) => {
    const { name, description, price, stock, category_id } = req.body;
    const values = [name, description, price, stock,category_id];

    if (!name || !description || !price || !stock || !category_id) {
        callback({status: 400, message: 'Please fill in all fields'}, null);
        return;
    }

    getCategoryByIdService(category_id, (err, res) => {
        if (err) {
            callback(err, null);
            return;
        }
    });

    createProduct(values, (err, res) => {
        if (err) {
            callback({status: 500, message: 'Internal Server Error'}, null);
        } else {
            callback(null, res);
        }
    }
    );
}

const updateProductService = (id, req, callback) => {
    const { name, description, price, stock, category_id } = req.body;
    const values = [name, description, price, stock,category_id, id];

    if (!name || !description || !price || !stock || !category_id) {
        callback({status: 400, message: 'Please fill in all fields'}, null);
        return;
    }

    getCategoryByIdService(category_id, (err, res) => {
        if (err) {
            callback(err, null);
            return;
        }
    });

    updateProduct(id, values, (err, res) => {
        if (err) {
            callback({status: 500, message: 'Internal Server Error'}, null);
        } else {
            if(res.affectedRows === 0){
                callback({status: 404, message: 'Product not found'}, null);
            } else {
                callback(null, res);
            }
        }
    }
    );
}

const deleteProductService = (id, callback) => {
    deleteProduct(id, (err, res) => {
        if (err) {
            callback({status: 500, message: 'Internal Server Error'}, null);
        } else {
            if(res.affectedRows === 0){
                callback({status: 404, message: 'Product not found'}, null);
            } else {
                callback(null, res);
            }
        }
    }
    );
}