const {getAllProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService} = require('../services/product_service');


const getAllProducts = (req, res) => {
    getAllProductsService((err, result) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.status(200).send(result);
        
    }
    );
}

const getProductById = (req, res) => {
    const id = req.params.id;
    getProductByIdService(id, (err, result) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.status(200).send(result);
        
    }
    );
}

const createProduct = (req, res) => {
    createProductService(req, (err, result) => {
        if (err) {
            res.status(err.status).send(err.message);  
            return; 
        }
        res.header('Location', '/products/' + result.insertId);
        res.status(201).send();
    }
    );
}

const updateProduct = (req, res) => {
    const id = req.params.id;
    updateProductService(id, req, (err, result) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.status(200).send();
    }
    );
}

const deleteProduct = (req, res) => {
    const id = req.params.id;
    deleteProductService(id, (err, result) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.status(200).send();
    }
    );
}


module.exports = {
    getAllProducts,
     getProductById,
        createProduct,
        updateProduct,
        deleteProduct
}