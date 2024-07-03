# Backend Service

## Description
This is a backend service built with Node.js and Express, using Sequelize as an ORM for database operations. It includes authentication features with Passport.js and uses bcrypt for password hashing.


## Installation
To install this project, follow these steps:


1. Clone the repository:
    ```
    git clone https://github.com/Shehapp/nodejs_backend_task
    ```

2. Navigate to the project directory:
    ```
    cd backend
    ```

3. Install the dependencies:
    ```
    npm install
    ```

## Usage
To start the server in development mode with hot-reloading:  npm start
The server will start running on `http://localhost:8800` .

## Scripts
- `npm test`: Run the Jest test suite
- `npm start`: Start the server with nodemon for development
- `npx sequelize-cli db:migrate:undo:all`: Rollback all migrations
- `npx sequelize-cli db:migrate`: Run all pending migrations
- `npx sequelize-cli db:seed:all`: Seed the database with initial data

## Dependencies
- **[express](https://www.npmjs.com/package/express)**: Fast, unopinionated, minimalist web framework for Node.js.
- **[sequelize](https://www.npmjs.com/package/sequelize)**: Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **[jest](https://www.npmjs.com/package/jest)**: Delightful JavaScript Testing Framework with a focus on simplicity.
- **[mysql2](https://www.npmjs.com/package/mysql2)**: MySQL client for Node.js with focus on performance.
- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: A library to help you hash passwords.
- **[passport](https://www.npmjs.com/package/passport)**: Simple, unobtrusive authentication for Node.js.
- **[passport-local](https://www.npmjs.com/package/passport-local)**: Passport strategy for authenticating with a username and password.
- **[express-session](https://www.npmjs.com/package/express-session)**: Simple session middleware for Express.
- **[connect-flash](https://www.npmjs.com/package/connect-flash)**: Flash message middleware for Connect and Express.
- **[express-flash](https://www.npmjs.com/package/express-flash)**: A flash message middleware for Express.
- **[nodemon](https://www.npmjs.com/package/nodemon)**: Simple monitor script for use during development of a Node.js app.


# API Documentation

## Base URL
All API requests should be made to: `http://localhost:8800/api/v0.1` (or your deployed URL)

## Authentication
All ADD, Edit, and Delete endpoints require authentication. The API utilizes session-based authentication.

## Endpoints

### Authentication API

#### Register a new user
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
- **Responses:**
    - `201 Created`: Indicates the user was created successfully.
    - `400 Bad Request`: The Email is already in use or required fields are missing.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Login User
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "example@example"
    "password": "password123"
  }
- **Responses:**
    - `200 OK`: Indicates the user was authenticated successfully.
    - `401 Unauthorized`: Authentication failed.
    - `400 Bad Request`: Required fields are missing.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Logout User
- **POST** `/auth/logout`
- **Responses:**
    - `200 OK`: Indicates the user was logged out successfully.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.




### Product API

#### Get all products
- **GET** `/products`
- **Responses:**
    - `200 OK`: Returns a list of all products.
    - `404 Not Found`: No products were found.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Get a single product
- **GET** `/products/:id`
- **Responses:**
    - `200 OK`: Returns the product with the specified ID.
    - `404 Not Found`: The product with the specified ID was not found.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Add a new product
- **POST** `/products`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 100.00,
    "stock": 10,
    "category_id": 1
  }
- **Responses:**
    - `201 Created`: Indicates the product was created successfully and HTTP headers contain the location of the new resource.
    - `400 Bad Request`: The request was invalid or cannot be served.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Update a product
- **PUT** `/products/:id`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 100.00,
    "stock": 10,
    "category_id": 1
  }
- **Responses:**
    - `200 OK`: Indicates the product was updated successfully.
    - `400 Bad Request`: The request was invalid or cannot be served.
    - `404 Not Found`: The product with the specified ID was not found.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Delete a product
- **DELETE** `/products/:id`
- **Responses:**
    - `200 OK`: Indicates the product was deleted successfully.
    - `404 Not Found`: The product with the specified ID was not found.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

  


### Category API

#### Get all categories
- **GET** `/categories`
- **Responses:**
    - `200 OK`: Returns a list of all categories.
    - `404 Not Found`: No categories were found.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Get a single category
- **GET** `/categories/:id`
- **Responses:**
    - `200 OK`: Returns the category with the specified ID.
    - `404 Not Found`: The category with the specified ID was not found.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Add a new category
- **POST** `/categories`
- **Body:**
  ```json
  {
    "name": "Category Name",
    "description": "Category Description"
  }
- **Responses:**
    - `201 Created`: Indicates the category was created successfully and HTTP headers contain the location of the new resource.
    - `400 Bad Request`: The request was invalid or cannot be served.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Update a category
- **PUT** `/categories/:id`
- **Body:**
  ```json
  {
    "name": "Category Name",
    "description": "Category Description"
  }
- **Responses:**
    - `200 OK`: Indicates the category was updated successfully.
    - `400 Bad Request`: The request was invalid or cannot be served.
    - `404 Not Found`: The category with the specified ID was not found.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.

#### Delete a category
- **DELETE** `/categories/:id`
- **Responses:**
    - `200 OK`: Indicates the category was deleted successfully.
    - `404 Not Found`: The category with the specified ID was not found.
    - `500 Internal Server Error`: An unexpected condition was encountered on the server.






