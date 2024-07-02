const { getAllCategoriesService,getCategoryByIdService, createCategoryService, updateCategoryService, deleteCategoryService } = require('../services/category_service');

const getAllCategories = async(req, res) => {

    try{
        const categories = await getAllCategoriesService();
        res.status(200).send(categories);
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }
}


const getCategoryById =async (req, res) => {
    const id = req.params.id;
    try{
        const category = await getCategoryByIdService(id);
        res.status(200).send(category);
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }
    
}

const createCategory =async (req, res) => {
    try{
        const category = await createCategoryService(req);
        res.header('Location', `/categories/${category.insertId}`);
        res.status(201).send();
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }
 
}

const updateCategory = async(req, res) => {
    const id = req.params.id;
    try{
        const category = await updateCategoryService(id, req);
        res.status(200).send();
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }
}

const deleteCategory =async (req, res) => {
    const id = req.params.id;
    try{
        const category = await deleteCategoryService(id);
        res.status(200).send();
    }catch(err){
        if(err.status === undefined)
            res.status(500).send('Internal Server Error');
        else 
           res.status(err.status).send(err.message);
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}