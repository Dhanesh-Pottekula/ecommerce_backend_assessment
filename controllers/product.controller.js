const productService = require('../services/product.service');

/**
 * Controller class for handling product-related HTTP requests
 * @class ProductController
 */
class ProductController {
  /**
   * Get all products with optional category filtering
   * @async
   * @param {Object} req - Express request object
   * @param {Object} req.query - Query parameters
   * @param {string} [req.query.category] - Optional category filter
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends JSON response with products array
   * @throws {Error} When database operation fails
   */
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

  /**
   * Get a single product by its ID
   * @async
   * @param {Object} req - Express request object
   * @param {Object} req.params - URL parameters
   * @param {string} req.params.id - Product ID
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends JSON response with product data or 404 error
   * @throws {Error} When database operation fails
   */
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

  /**
   * Create a new product
   * @async
   * @param {Object} req - Express request object
   * @param {Object} req.body - Request body containing product data
   * @param {string} req.body.name - Product name
   * @param {number} req.body.price - Product price
   * @param {string} req.body.category - Product category
   * @param {string} [req.body.description] - Product description (optional)
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends JSON response with created product data
   * @throws {Error} When database operation fails or validation fails
   */
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