const {getCategories, getCategoryById, createCategory, updateCategory, deleteCategory}=require('../models/category_model');

const getAllCategoriesService = (callback) => {
    getCategories((err, res) => {
        if (err) {
            callback({status: 500, message: 'Internal Server Error'}, null);
        }
        if(res.length === 0){
            callback({status: 404, message: 'No categories found'}, null);
        } else {
            callback(null, res);
        }
    }
    );
}

const getCategoryByIdService = (id, callback) => {
    getCategoryById(id, (err, res) => {
        if (err) {
            callback({status: 500, message: 'Internal Server Error'}, null);
            return;
        }
        if(res.length === 0){
            callback({status: 404, message: 'Category not found'}, null);
        } else {
            callback(null, res);
        }
    }
    );
}


const createCategoryService = (req, callback) => {
    const { name, description } = req.body;
    const values = [name, description];

    if (!name || !description) {
        callback({status: 400, message: 'Please fill in all fields'}, null);
        return;
    }

    createCategory(values, (err, res) => {
        if (err) {
            callback({status: 500, message: 'Internal Server Error'}, null);
        } else {
            callback(null, res);
        }
    }
    );
}


const updateCategoryService = (id, req, callback) => {
    const { name, description } = req.body;
    const values = [name, description, id];

    if (!name || !description) {
        callback({status: 400, message: 'Please fill in all fields'}, null);
        return;
    }

    updateCategory(values, (err, res) => {
        if (err) {
            callback({status: 500, message: 'Internal Server Error'}, null);
        } else {
            if(res.affectedRows === 0){
                callback({status: 404, message: 'Category not found'}, null);
            }
            else {
                callback(null, res);
            }
        }
    }
    );
}

const deleteCategoryService = (id, callback) => {
    deleteCategory(id, (err, res) => {
        if (err) {
            callback({status: 500, message: 'Internal Server Error'}, null);
        } else {
            if(res.affectedRows === 0){
                callback({status: 404, message: 'Category not found'}, null);
            } else {
                callback(null, res);
            }
        }
    }
    );
}


module.exports = {
    getAllCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
}