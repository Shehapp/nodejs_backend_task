const {Category} = require('../models');


const getAllCategoriesService = async () => {

    const categories = await Category.findAll();
    if(categories.length === 0){
        throw {status: 404, message: 'No categories found'};
    }
    return categories;
}

const getCategoryByIdService =async (id) => {

    const category = await Category.findByPk(id);
    if(!category){
        throw {status: 404, message: 'Category not found'};
    }
    return category;
}


const createCategoryService = async(req) => {
    const { name, description } = req.body;

    if (!name || !description) {
        throw {status: 400, message: 'Please fill in all fields'};
    }
 
    const category = await Category.create({
        name: name,
        description: description
    });
    console.log(category);
    return category;
}


const updateCategoryService =async (id, req) => {
    const { name, description } = req.body;

    if (!name || !description) {
        throw {status: 400, message: 'Please fill in all fields'};
    }

    const category = await Category.update({
        name: name,
        description: description
    }, {
        where: {
            id: id
        }
    });
}

const deleteCategoryService = async(id) => {

    var category = null;
    try{
        category = await Category.destroy({
            where: {
                id: id
            }
        }
    );
    }catch(err){
        throw {status: 400,message:"bad request"};
    }

    //can't delete category that products are associated with
    if(category === 0){
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