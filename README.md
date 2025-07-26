# E-commerce Backend API

A production-grade Node.js + Express backend with MongoDB for managing products.

## Features

- RESTful API for product management
- MongoDB integration with Mongoose
- Proper separation of concerns (controllers, services, routes, models)
- Global error handling
- Environment variable management
- CORS enabled
- Input validation

## Project Structure

```
├── controllers/
│   └── product.controller.js
├── services/
│   └── product.service.js
├── routes/
│   └── product.routes.js
├── models/
│   └── product.model.js
├── config/
│   └── db.js
├── middleware/
│   └── errorHandler.js
├── .env
├── index.js
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
NODE_ENV=development
```

3. Start MongoDB (if running locally):
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or start MongoDB manually
mongod
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Products

#### GET /products
Get all products with optional category filter.

**Query Parameters:**
- `category` (optional): Filter products by category

**Example:**
```bash
GET /products
GET /products?category=Electronics
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "name": "iPhone 13",
      "price": 999,
      "category": "Electronics",
      "description": "Latest iPhone model",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /products/:id
Get a single product by ID.

**Example:**
```bash
GET /products/60f7b3b3b3b3b3b3b3b3b3b3
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "iPhone 13",
    "price": 999,
    "category": "Electronics",
    "description": "Latest iPhone model",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### POST /products
Create a new product.

**Request Body:**
```json
{
  "name": "iPhone 13",
  "price": 999,
  "category": "Electronics",
  "description": "Latest iPhone model"
}
```

**Required Fields:**
- `name` (string)
- `price` (number, must be >= 0)
- `category` (string)

**Optional Fields:**
- `description` (string)

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "iPhone 13",
    "price": 999,
    "category": "Electronics",
    "description": "Latest iPhone model",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Validation errors, duplicate keys
- **404 Not Found**: Product not found, invalid ObjectId
- **500 Internal Server Error**: Server errors

**Error Response Format:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Testing the API

You can test the API using tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)

### Example cURL commands:

```bash
# Get all products
curl http://localhost:3000/products

# Get products by category
curl http://localhost:3000/products?category=Electronics

# Get a specific product
curl http://localhost:3000/products/PRODUCT_ID

# Create a new product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro",
    "price": 1999,
    "category": "Electronics",
    "description": "Powerful laptop for professionals"
  }'
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/ecommerce_db |
| `NODE_ENV` | Environment mode | development |

## Dependencies

### Production Dependencies
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `dotenv`: Environment variable management
- `cors`: Cross-origin resource sharing

### Development Dependencies
- `nodemon`: Auto-restart server during development 