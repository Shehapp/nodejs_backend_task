const { getAllCategoriesService, getCategoryByIdService, createCategoryService, updateCategoryService, deleteCategoryService } = require("../../services/category_service");
const { Category } = require("../../models");


jest.mock("../../models", () => ({
    Category: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn()
    }
}));



describe('getAllCategoriesService', () => {
    it("should return all categories if exist ", async () => {
        var categories = [
            {
                id: 1,
                name: "category1",
            },
            {
                id: 2,
                name: "category2",
            },
        ];

        Category.findAll.mockResolvedValue(categories);
        var result = await getAllCategoriesService();
        await expect(result).toEqual(categories);
    });

    it("should throw error if no categories found", async () => {
        Category.findAll.mockResolvedValue([]);
        await expect(getAllCategoriesService()).rejects.toEqual({
            status: 404,
            message: 'No categories found'
        });

    });

});



describe('getCategoryByIdService', () => {
    it("should return category if exist ", async () => {
        var category = {
            id: 1,
            name: "category1",
        };

        Category.findByPk.mockResolvedValue(category);
        var result = await getCategoryByIdService(1);
        await expect(result).toEqual(category);
    });

    it("should throw error if category not found", async () => {
        Category.findByPk.mockResolvedValue(null);
        await expect(getCategoryByIdService(1)).rejects.toEqual({

            status: 404,
            message: 'Category not found'
        });

    });

});




describe('createCategoryService', () => {
    it('should create a category when all fields are provided', async () => {
        const req = {
            body: {
                name: 'Test Category',
                description: 'Test Description'
            }
        };
        
        Category.create.mockResolvedValue({ id: 1 });

        const result = await createCategoryService(req);

        expect(result).toEqual({ id: 1 });
        expect(Category.create).toHaveBeenCalledWith(req.body);
    }
    );

    it('should throw an error when required fields are missing', async () => {
        const req = {
            body: {
                name: 'Test Category',
            }
        };

        await expect(createCategoryService(req)).rejects.toEqual({
            status: 400,
            message: 'Please fill in all fields'
        });

        expect(Category.create).not.toHaveBeenCalled();
    }
    );
});



describe('updateCategoryService', () => {
    it('should update a category when all fields are provided', async () => {
        const req = {
            body: {
                name: 'Test Category',
                description: 'Test Description'
            }

        };
        Category.update.mockResolvedValue([1]);
        const result = await updateCategoryService(1, req);
        expect(result).toBeUndefined();
        expect(Category.update).toHaveBeenCalledWith(
            req.body,
            { where: { id: 1 } }
        );
    });

    it('should throw an error when required fields are missing', async () => {
        const req = {
            body: {
                name: 'Test Category'
            }
        };

        await expect(updateCategoryService(1, req)).rejects.toEqual({
            status: 400,
            message: 'Please fill in all fields'
        });

        expect(Category.update).not.toHaveBeenCalled();
    }
    );

});

describe('deleteCategoryService', () => {
    it('should delete a category when category_id is valid', async () => {
        Category.destroy.mockResolvedValue(1);
        const result = await deleteCategoryService(1);
        expect(result).toBeUndefined();
        expect(Category.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error when category_id is invalid', async () => {
        Category.destroy.mockResolvedValue(0);
        await expect(deleteCategoryService(1)).rejects.toEqual({
            status: 404,
            message: 'Category not found'
        });
        expect(Category.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
});
