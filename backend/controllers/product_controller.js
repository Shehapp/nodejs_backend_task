const {getAllProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService} = require('../services/product_service');


const getAllProducts = async(req, res) => {

    try{
        const products = await getAllProductsService();
        res.status(200).send(products);
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }

}

const getProductById = async(req, res) => {
    const id = req.params.id;
    try{
        const product = await getProductByIdService(id);
        res.status(200).send(product);
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }
}

const createProduct = async(req, res) => {

    try{
        const product = await createProductService(req);
        res.header('Location', `/products/${product.insertId}`);
        res.status(201).send();
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }
}

const updateProduct = async(req, res) => {
    const id = req.params.id;
    try{
        const product = await updateProductService(id, req);
        res.status(200).send();
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }
}

const deleteProduct = async(req, res) => {
    const id = req.params.id;
    try{
        const product = await deleteProductService(id);
        res.status(200).send();
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }
}


module.exports = {
    getAllProducts,
     getProductById,
        createProduct,
        updateProduct,
        deleteProduct
}