const { getAllCategoriesService,getCategoryByIdService, createCategoryService, updateCategoryService, deleteCategoryService } = require('../services/category_service');
const { handleErrors } = require('../utils/error_handler.js');


const getAllCategories = async(req, res) => {
    try{
        const categories = await getAllCategoriesService();
        res.status(200).send(categories);
    }catch(err){
         await handleErrors(res,err);
    }
}


const getCategoryById =async (req, res) => {
    const id = req.params.id;
    try{
        const category = await getCategoryByIdService(id);
        res.status(200).send(category);
    }catch(err){
        await handleErrors(res,err);
    }
}

const createCategory =async (req, res) => {
    try{
        const category = await createCategoryService(req);
        res.header('Location', `/categories/${category.id}`);
        res.status(201).send();
    }catch(err){
        await handleErrors(res,err);
    }
}

const updateCategory = async(req, res) => {
    const id = req.params.id;
    try{
        const category = await updateCategoryService(id, req);
        res.status(200).send();
    }catch(err){
        await handleErrors(res,err);
    }
}

const deleteCategory =async (req, res) => {
    const id = req.params.id;
    try{
        const category = await deleteCategoryService(id);
        res.status(200).send();
    }catch(err){
        await handleErrors(res,err);
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}