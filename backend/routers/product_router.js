const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controllers/product_controller');
const express = require('express');
const router = express.Router();


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('You need to be logged in to access this route');
  }


router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', isAuthenticated, createProduct);

router.put('/:id', isAuthenticated,  updateProduct);

router.delete('/:id', isAuthenticated, deleteProduct);

module.exports = router;