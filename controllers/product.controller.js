const productService = require('../services/product.service');


class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const { category } = req.query;
      const products = await productService.getAllProducts(category);
      
      res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const productData = req.body;
      const newProduct = await productService.createProduct(productData);
      
      res.status(201).json({
        success: true,
        data: newProduct
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController(); 