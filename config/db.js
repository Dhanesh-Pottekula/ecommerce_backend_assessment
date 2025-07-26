const mongoose = require('mongoose');

/**
 * Connect to MongoDB database using Mongoose
 * Establishes connection to MongoDB using the MONGODB_URI environment variable
 * @async
 * @returns {Promise<void>} Resolves when connection is established
 * @throws {Error} When connection fails, logs error and exits process
 * 
 */
const connectDB = async () => {
  try {
    /**
     * Establish MongoDB connection with Mongoose
     * Note: useNewUrlParser and useUnifiedTopology options are deprecated
     * but kept for backward compatibility
     */
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 