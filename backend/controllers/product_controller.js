const {getAllProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService} = require('../services/product_service');
const { handleErrors } = require('../utils/error_handler.js');


const getAllProducts = async(req, res) => {
    try{
        const products = await getAllProductsService();
        res.status(200).send(products);
    }catch(err){
        await handleErrors(res,err);
    }
}

const getProductById = async(req, res) => {
    const id = req.params.id;
    try{
        const product = await getProductByIdService(id);
        res.status(200).send(product);
    }catch(err){
        await handleErrors(res,err);
    }
}

const createProduct = async(req, res) => {
    try{
        const product = await createProductService(req);
        res.header('Location', `/products/${product.insertId}`);
        res.status(201).send();
    }catch(err){
        await handleErrors(res,err);
    }
}

const updateProduct = async(req, res) => {
    const id = req.params.id;
    try{
        const product = await updateProductService(id, req);
        res.status(200).send();
    }catch(err){
        await handleErrors(res,err);
    }
}

const deleteProduct = async(req, res) => {
    const id = req.params.id;
    try{
        const product = await deleteProductService(id);
        res.status(200).send();
    }catch(err){
        await handleErrors(res,err);
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}