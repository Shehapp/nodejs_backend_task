const { getAllCategories,getCategoryById,createCategory,updateCategory,deleteCategory} = require('../controllers/category_controller');

const express = require('express');
const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

router.post('/', createCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;