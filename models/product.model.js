const mongoose = require('mongoose');

/**
 * Product schema definition for MongoDB
 * @typedef {Object} ProductSchema
 * @property {string} name - Product name (required, trimmed)
 * @property {number} price - Product price (required, minimum 0)
 * @property {string} category - Product category (required, trimmed)
 * @property {string} [description] - Product description (optional, trimmed)
 * @property {Date} createdAt - Timestamp when product was created
 * @property {Date} updatedAt - Timestamp when product was last updated
 */

/**
 * Mongoose schema for Product model
 * Includes validation rules and timestamps
 * @type {mongoose.Schema}
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 