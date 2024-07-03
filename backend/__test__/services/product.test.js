const { getAllProductsService ,getProductByIdService, createProductService, updateProductService, deleteProductService} = require("../../services/product_service.js");
const { Product } = require("../../models");
const { getCategoryByIdService } = require("../../services/category_service");


jest.mock("../../models", () => ({
  Product: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));


jest.mock('../../services/category_service', () => ({
    getCategoryByIdService: jest.fn()
  }));



describe('getAllProductsService', () => {
    it("should return all products if exist ", async () => {
        var products = [
            {
                id: 1,
                name: "product1",
                description: "description1",
                price: 100,
                stock: 10,
                category_id: 1,
            },
            {
                id: 2,
                name: "product2",
                description: "description2",
                price: 200,
                stock: 20,
                category_id: 2,
            },
        ];

        Product.findAll.mockResolvedValue(products);
        var result = await getAllProductsService();
        await expect(result).toEqual(products);
         });

    it("should throw error if no products found", async () => {
        Product.findAll.mockResolvedValue([]);
        await expect(getAllProductsService()).rejects.toEqual({
            status: 404,
            message: 'No products found'
        });
    
    });
});

describe('getProductByIdService', () => {
    it("should return product if exist ", async () => {
        var product = {
            id: 1,
            name: "product1",
            description: "description1",
            price: 100,
            stock: 10,
            category_id: 1,
        };

        Product.findByPk.mockResolvedValue(product);
        var result = await getProductByIdService(1);
        await expect(result).toEqual(product);
         });

    it("should throw error if no product found", async () => {
        Product.findByPk.mockResolvedValue([]);
        await expect(getProductByIdService(1)).rejects.toEqual({
            status: 404,
            message: 'Product not found'
        });
    
    });
});


describe('createProductService', () => {

    it('should create a product when all fields are provided', async () => {
      const req = {
        body: {
          name: 'Test Product',
          description: 'Test Description',
          price: 99.99,
          stock: 10,
          category_id: 1
        }
      };
  
      const mockProduct = { id: 1, ...req.body };
      Product.create.mockResolvedValue(mockProduct);
      getCategoryByIdService.mockResolvedValue({ id: 1});
  
      const result = await createProductService(req);
  
      expect(getCategoryByIdService).toHaveBeenCalledWith(1);
      expect(Product.create).toHaveBeenCalledWith(req.body);
      expect(result).toEqual(mockProduct);
    });
  
    it('should throw an error when required fields are missing', async () => {
      const mockReq = {
        body: {
          name: 'Test Product',
        }
      };
  
      await expect(createProductService(mockReq)).rejects.toEqual({
        status: 400,
        message: 'Please fill in all fields'
      });
  
      expect(Product.create).not.toHaveBeenCalled();
      expect(getCategoryByIdService).not.toHaveBeenCalled();
    });
  
    it('should throw an error when category_id is invalid', async () => {
      const mockReq = {
        body: {
          name: 'Test Product',
          description: 'Test Description',
          price: 99.99,
          stock: 10,
          category_id: 999 // Invalid
        }
      };
  
      getCategoryByIdService.mockRejectedValue({ status: 404, message: 'Category not found' });
  
      await expect(createProductService(mockReq)).rejects.toEqual({
        status: 404,
        message: 'Category not found'
      });
  
      expect(Product.create).not.toHaveBeenCalled();
      expect(getCategoryByIdService).toHaveBeenCalledWith(999);
    });
  });



describe('updateProductService', () => {
    it('should update a product when all fields are provided', async () => {
        const req = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                price: 99.99,
                stock: 10,
                category_id: 1
            }
        };
        getCategoryByIdService.mockResolvedValue({ id: 1 });
        Product.update.mockResolvedValue([1]);

        const result = await updateProductService(1, req);
        
        expect(result).toBeUndefined();
        expect(getCategoryByIdService).toHaveBeenCalledWith(1);
        expect(Product.update).toHaveBeenCalledWith(
            req.body,
            { where: { id: 1 } }
        );
    });


    it('should throw an error when required fields are missing', async () => {
        const req = {
            body: {
                name: 'Test Product'
            }
        };

        await expect(updateProductService(1, req)).rejects.toEqual({
            status: 400,
            message: 'Please fill in all fields'
        });

        expect(getCategoryByIdService).not.toHaveBeenCalled();
        expect(Product.update).not.toHaveBeenCalled();
    }
    );

    it('should throw an error when category_id is invalid', async () => {
        const req = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                price: 99.99,
                stock: 10,
                category_id: 999
            }
        };

        getCategoryByIdService.mockRejectedValue({ status: 404, message: 'Category not found' });

        await expect(updateProductService(1, req)).rejects.toEqual({
            status: 404,
            message: 'Category not found'
        });

        expect(getCategoryByIdService).toHaveBeenCalledWith(999);
        expect(Product.update).not.toHaveBeenCalled();
    }
    );
});


describe('deleteProductService', () => {
    it('should delete a product if it exists', async () => {
        const fake_eff=5;
        Product.destroy.mockResolvedValue(fake_eff);
        const result = await deleteProductService(1);
        expect(result).toEqual(fake_eff);
        expect(Product.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw exception if it dosnot exist', async () => {
        const fake_eff=0;
        Product.destroy.mockResolvedValue(fake_eff);
        //should throw error
        await expect(deleteProductService(1)).rejects.toEqual({
            status: 404,
            message: 'Product not found'
        });

    });
});
