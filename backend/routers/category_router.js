const { getAllCategories,getCategoryById,createCategory,updateCategory,deleteCategory} = require('../controllers/category_controller');

const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('You need to be logged in to access this route');
}


router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

router.post('/', isAuthenticated, createCategory);

router.put('/:id', isAuthenticated, updateCategory);

router.delete('/:id', isAuthenticated, deleteCategory);

module.exports = router;