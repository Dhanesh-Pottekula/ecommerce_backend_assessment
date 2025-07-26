/**
 * Global error handling middleware for Express application
 * Handles various types of errors and returns appropriate HTTP responses
 * @param {Error} err - Error object thrown by previous middleware or route handlers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON error response to client

 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(err);

  /**
   * Handle Mongoose CastError (invalid ObjectId format)
   * Occurs when trying to find a document with an invalid MongoDB ObjectId
   */
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  /**
   * Handle Mongoose duplicate key error (E11000)
   * Occurs when trying to create a document with a unique field that already exists
   */
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  /**
   * Handle Mongoose validation errors
   * Occurs when document validation fails (required fields, min/max values, etc.)
   */
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  /**
   * Send error response to client
   * Uses error.statusCode if available, otherwise defaults to 500
   */
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler; 