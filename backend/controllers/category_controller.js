const { getAllCategoriesService,getCategoryByIdService, createCategoryService, updateCategoryService, deleteCategoryService } = require('../services/category_service');

const getAllCategories = (req, res) => {
    getAllCategoriesService((err, result) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.status(200).send(result);
    }
    );
}


const getCategoryById = (req, res) => {
    const id = req.params.id;
    getCategoryByIdService(id, (err, result) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.status(200).send(result);
    }
    );
}

const createCategory = (req, res) => {
    createCategoryService(req, (err, result) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.header('Location', '/categories/' + result.insertId);
        res.status(201).send();
    }
    );
}

const updateCategory = (req, res) => {
    const id = req.params.id;
    updateCategoryService(id, req, (err, result) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.status(200).send();
    }
    );
}

const deleteCategory = (req, res) => {
    const id = req.params.id;
    deleteCategoryService(id, (err, result) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.status(200).send();
    }
    );
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}