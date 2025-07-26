const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// GET /products - Get all products (with optional category filter)
router.get('/', productController.getAllProducts);

// GET /products/:id - Get a single product by ID
router.get('/:id', productController.getProductById);

// POST /products - Create a new product
router.post('/', productController.createProduct);

module.exports = router; 