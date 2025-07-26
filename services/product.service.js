const Product = require('../models/product.model');

class ProductService {
  async getAllProducts(category = null) {
    try {
      const filter = category ? { category } : {};
      const products = await Product.find(filter).sort({ createdAt: -1 });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

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