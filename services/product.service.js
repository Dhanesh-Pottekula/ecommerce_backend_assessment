const Product = require('../models/product.model');

/**
 * Service class for handling product-related business logic
 * @class ProductService
 */
class ProductService {
  /**
   * Retrieve all products with optional category filtering
   * @async
   * @param {string} [category=null] - Optional category to filter products by
   * @returns {Promise<Array>} Array of product documents sorted by creation date (newest first)
   * @throws {Error} When database query fails
   */
  async getAllProducts(category = null) {
    try {
      const filter = category ? { category } : {};
      const products = await Product.find(filter).sort({ createdAt: -1 });
      return products;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieve a single product by its MongoDB ObjectId
   * @async
   * @param {string} id - Product's MongoDB ObjectId
   * @returns {Promise<Object|null>} Product document or null if not found
   * @throws {Error} When database query fails or invalid ObjectId format
   */
  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new product in the database
   * @async
   * @param {Object} productData - Product data object
   * @param {string} productData.name - Product name (required)
   * @param {number} productData.price - Product price (required, must be >= 0)
   * @param {string} productData.category - Product category (required)
   * @param {string} [productData.description] - Product description (optional)
   * @returns {Promise<Object>} Created product document with timestamps

   */
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      const savedProduct = await product.save();
      return savedProduct;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService(); 