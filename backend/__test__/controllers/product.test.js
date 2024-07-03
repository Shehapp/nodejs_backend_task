const {  getAllProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../../controllers/product_controller');
const {  getAllProductsService,getProductByIdService,createProductService,updateProductService,deleteProductService} = require('../../services/product_service');

jest.mock('../../services/product_service');



describe('getAllProducts',()=>{

    let mockRequest;
    let mockResponse;
  
    beforeEach(() => {//before each test
      mockRequest = {};
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it('should return products with 200 status when successful', async () => {
        const mockProducts = [
          { id: 1, name: 'Product 1' },
          { id: 2, name: 'Product 2' }
        ];
        getAllProductsService.mockResolvedValue(mockProducts);
    
        await getAllProducts(mockRequest, mockResponse);
    
        expect(getAllProductsService).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockProducts);
      });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        getAllProductsService.mockRejectedValue(mockError);
        
        await getAllProducts(mockRequest, mockResponse);
        
        expect(getAllProductsService).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });
    

    it('should return error with 404 status when no products found', async () => {

        //getAllProductsService throws an error when no products are found
        getAllProductsService.mockRejectedValue({ status: 404, message: 'No products found' });

        await getAllProducts(mockRequest, mockResponse);
        
        expect(getAllProductsService).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith('No products found');
    });

}
);

describe('getProductById',()=>{
    let mockRequest;
    let mockResponse;
  
    beforeEach(() => {//before each test
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

    it('should return product with 200 status when successful', async () => {
        const mockProduct = { id: 1, name: 'Product 1' };
        getProductByIdService.mockResolvedValue(mockProduct);
    
        await getProductById(mockRequest, mockResponse);
    
        expect(getProductByIdService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockProduct);
      });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        getProductByIdService.mockRejectedValue(mockError);
        
        await getProductById(mockRequest, mockResponse);
        
        expect(getProductByIdService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });

    it('should return error with 404 status when product not found', async () => {
        getProductByIdService.mockRejectedValue({ status: 404, message: 'Product not found' });
    
        await getProductById(mockRequest, mockResponse);
    
        expect(getProductByIdService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith('Product not found');
      });


}
);


describe('createProduct',()=>{
    let mockRequest;
    let mockResponse;
  
    beforeEach(() => {
      mockRequest = {
        body: {
          name: 'Product 1',
            price: 100,
            description: 'Description 1',
            category: 'Category 1',
            stock: 10
        }
      };
      mockResponse = {
        header: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it('should return 201 status when successful', async () => {
        const mockProduct = { 
            id: 1, 
            name: 'Product 1',
            price: 100,
            description: 'Description 1',
            category: 'Category 1',
            stock: 10
        };
        createProductService.mockResolvedValue(mockProduct);
    
        await createProduct(mockRequest, mockResponse);
    
        expect(createProductService).toHaveBeenCalledWith(mockRequest);
        expect(mockResponse.header).toHaveBeenCalledWith('Location', `/products/${mockProduct.id}`);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.send).toHaveBeenCalledWith();
      });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        createProductService.mockRejectedValue(mockError);
        
        await createProduct(mockRequest, mockResponse);
        
        expect(createProductService).toHaveBeenCalledWith(mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });

}
);

describe('updateProduct',()=>{
    let mockRequest;
    let mockResponse;
  
    beforeEach(() => {
      mockRequest = {
        params: {
          id: 1
        },
        body: {
          name: 'Product 1',
            price: 100,
            description: 'Description 1',
            category: 'Category 1',
            stock: 10
        }
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it('should return 200 status when successful', async () => {
        updateProductService.mockResolvedValue();
    
        await updateProduct(mockRequest, mockResponse);
    
        expect(updateProductService).toHaveBeenCalledWith(mockRequest.params.id, mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith();
      });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        updateProductService.mockRejectedValue(mockError);
        
        await updateProduct(mockRequest, mockResponse);
        
        expect(updateProductService).toHaveBeenCalledWith(mockRequest.params.id, mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });

}
);

describe('deleteProduct',()=>{
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
        deleteProductService.mockResolvedValue();
    
        await deleteProduct(mockRequest, mockResponse);
    
        expect(deleteProductService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith();
      });

    it('should return error with 500 status when unsuccessful', async () => {
        const mockError = new Error('Internal Server Error');
        deleteProductService.mockRejectedValue(mockError);
        
        await deleteProduct(mockRequest, mockResponse);
        
        expect(deleteProductService).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError.message);
    });

}
);