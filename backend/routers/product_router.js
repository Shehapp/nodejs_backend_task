const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controllers/product_controller');
const express = require('express');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;