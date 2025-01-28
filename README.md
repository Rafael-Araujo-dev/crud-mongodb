# CRUD MongoDB

This is a simple CRUD (Create, Read, Update, Delete) project using Node.js and MongoDB. The purpose of this repository is to demonstrate how to perform basic operations on a MongoDB database.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Framework for building web applications in Node.js.
- **MongoDB**: NoSQL database used to store data.
- **Mongoose**: Library for modeling data in MongoDB.

## Features

- **Create**: Add new documents to the database.
- **Read**: Retrieve existing documents.
- **Update**: Modify stored documents.
- **Delete**: Remove documents from the database.

## Prerequisites

Before starting, make sure you have installed the following on your machine:

- [Node.js](https://nodejs.org/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Rafael-Araujo-dev/crud-mongodb.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd crud-mongodb
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Set up the MongoDB connection:**

    - Create a `.env` file with the following lines:
        ```
        MONGODB_URI=
        PORT=
        ```
    - **MONGODB_URI**: MongoDB connection string.
    - **PORT**: Port where the server will run (example: 3000).

## Usage

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Access the server:**
    - The server will run at http://localhost:PORT (the PORT defined in the `.env` file). 

3. **Test the endpoints:**
    - You can use tools like [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) to interact with the CRUD endpoints.


## Project Structure

The project follows the following folder structure:

    ```bash
        crud-mongodb/
        ├── src/                # Application's source code
        │   ├── controllers/    # Business logic for API operations
        │   ├── middlewares/    # Validation, authentication, and error-handling logic
        │   ├── models/         # MongoDB schemas and models
        │   ├── routes/         # API route definitions mapped to controllers
        │   └── types/          # Type definitions and configurations
        ├── .env                # Environment variables (example: database credentials, server settings)
        ├── .env.example        # Example of the .env file (for reference, not for production)
        ├── server.js           # Entry point for configuring and initializing the server
        ├── .gitignore          # Specifies files/folders to exclude from Git (example: node_modules, logs)
        ├── package.json        # Node.js configuration file with project dependencies
        ├── README.md           # Project documentation and usage instructions
        └── tsconfig.json       # TypeScript configuration file
    ```

## Endpoints

Here are the main endpoints available:

- **GET /posts**: Returns all posts.
- **POST /posts**: Creates a new post.
- **GET /posts/:id**: Returns a specific post by ID.
- **PUT /posts/:id**: Updates a specific post by ID.
- **DELETE /posts/:id**: Deletes a specific post by ID.
