const {  getAllCategoriesService,getCategoryByIdService,createCategoryService,updateCategoryService,deleteCategoryService} = require('../../services/category_service');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../../controllers/category_controller');

jest.mock('../../services/category_service');

describe('getAllCategories', () => {
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it('should return categories with 200 status when successful', async () => {
        const mockCategories = [
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' }
        ];
        getAllCategoriesService.mockResolvedValue(mockCategories);

        await getAllCategories(mockRequest, mockResponse);

        expect(getAllCategoriesService).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockCategories);
    });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        getAllCategoriesService.mockRejectedValue(mockError);

        await getAllCategories(mockRequest, mockResponse);

        expect(getAllCategoriesService).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });

    it('should return error with 404 status when no categories found', async () => {
        //getAllCategoriesService throws an error when no categories are found
        getAllCategoriesService.mockRejectedValue({ status: 404, message: 'No categories found' });

        await getAllCategories(mockRequest, mockResponse);

        expect(getAllCategoriesService).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith('No categories found');
    });

});

describe('getCategoryById', () => {
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        mockRequest = {
            params: {
                id: 1
            }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it('should return category with 200 status when successful', async () => {
        const mockCategory = { id: 1, name: 'Category 1' };
        getCategoryByIdService.mockResolvedValue(mockCategory);

        await getCategoryById(mockRequest, mockResponse);

        expect(getCategoryByIdService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockCategory);
    });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        getCategoryByIdService.mockRejectedValue(mockError);

        await getCategoryById(mockRequest, mockResponse);

        expect(getCategoryByIdService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });

    it('should return error with 404 status when category not found', async () => {
        getCategoryByIdService.mockRejectedValue({ status: 404, message: 'Category not found' });

        await getCategoryById(mockRequest, mockResponse);

        expect(getCategoryByIdService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith('Category not found');
    });
});


describe('createCategory', () => {
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        mockRequest = {
            body: {
                name: 'Category 1'
            }
        };
        mockResponse = {
            header: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it('should return 201 status when successful', async () => {
        const mockCategory = { id: 1, name: 'Category 1' };
        createCategoryService.mockResolvedValue(mockCategory);

        await createCategory(mockRequest, mockResponse);

        expect(createCategoryService).toHaveBeenCalledWith(mockRequest);
        expect(mockResponse.header).toHaveBeenCalledWith('Location', `/categories/${mockCategory.id}`);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.send).toHaveBeenCalledWith();
    });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        createCategoryService.mockRejectedValue(mockError);

        await createCategory(mockRequest, mockResponse);

        expect(createCategoryService).toHaveBeenCalledWith(mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });
});


describe('updateCategory', () => {
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        mockRequest = {
            params: {
                id: 1
            },
            body: {
                name: 'Category 1'
            }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it('should return 200 status when successful', async () => {
        updateCategoryService.mockResolvedValue();

        await updateCategory(mockRequest, mockResponse);

        expect(updateCategoryService).toHaveBeenCalledWith(mockRequest.params.id, mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith();
    });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        updateCategoryService.mockRejectedValue(mockError);

        await updateCategory(mockRequest, mockResponse);

        expect(updateCategoryService).toHaveBeenCalledWith(mockRequest.params.id, mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });

    it('should return error with 404 status when category not found', async () => {
        updateCategoryService.mockRejectedValue({ status: 404, message: 'Category not found' });

        await updateCategory(mockRequest, mockResponse);

        expect(updateCategoryService).toHaveBeenCalledWith(mockRequest.params.id, mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith('Category not found');
    });
});


describe('deleteCategory', () => {
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        mockRequest = {
            params: {
                id: 1
            }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it('should return 200 status when successful', async () => {
        deleteCategoryService.mockResolvedValue();

        await deleteCategory(mockRequest, mockResponse);

        expect(deleteCategoryService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith();
    });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        deleteCategoryService.mockRejectedValue(mockError);

        await deleteCategory(mockRequest, mockResponse);

        expect(deleteCategoryService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });

    it('should return error with 404 status when category not found', async () => {
        deleteCategoryService.mockRejectedValue({ status: 404, message: 'Category not found' });

        await deleteCategory(mockRequest, mockResponse);

        expect(deleteCategoryService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith('Category not found');
    });
});


