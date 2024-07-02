const {getCategories, getCategoryById, createCategory, updateCategory, deleteCategory}=require('../models/category_model');

const getAllCategoriesService = async () => {
    const categories = await getCategories();
    if(categories.length === 0){
         throw {status: 404, message: 'No categories found'};
    }
    return categories;
}

const getCategoryByIdService =async (id) => {
    const category = await getCategoryById(id);
    if(category.length === 0){
        throw {status: 404, message: 'Category not found'};
    }
    return category;
}


const createCategoryService = async(req) => {
    const { name, description } = req.body;
    const values = [name, description];

    if (!name || !description) {
        throw {status: 400, message: 'Please fill in all fields'};
    }
 
    const category = await createCategory(values);
    return category;
}


const updateCategoryService =async (id, req) => {
    const { name, description } = req.body;
    const values = [name, description, id];

    if (!name || !description) {
        throw {status: 400, message: 'Please fill in all fields'};
    }

    const category = await updateCategory(values);
    if(category.affectedRows === 0){
        throw {status: 404, message: 'Category not found'};
    }
    return category;
}

const deleteCategoryService = async(id) => {
    var category = null;
    try{
     category= await deleteCategory(id);
    }catch(err){
        throw {status: 400,message:"bad request"};
    }

    //can't delete category that products are associated with
    if(category && category.affectedRows === 0){
        throw {status: 404, message: 'Category not found'};
    }

    return category;
}


module.exports = {
    getAllCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
}