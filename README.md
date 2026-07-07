# Personal Budget API

A RESTful API for managing personal budgets using the **Envelope Budgeting** method. Users can create budget envelopes, record transactions, transfer funds between envelopes, and securely manage their own financial data through JWT authentication.

This project was built with **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize** as part of the Codecademy Back-End Engineering Path. In addition to the original project requirements, it includes **JWT Authentication & Authorization** to provide secure access to user-specific data.

---

# 🚀 Live Demo

### API Base URL

https://personal-budget-api-1.onrender.com

### Swagger API Documentation

https://personal-budget-api-1.onrender.com/api-docs

---

# ✨ Features

* User registration and login
* JWT Authentication and Authorization
* Create, Read, Update and Delete (CRUD) Budget Envelopes
* Transfer money between envelopes
* Create, Read, Update and Delete (CRUD) Transactions
* Automatic budget deduction when transactions are created
* User-specific budget management
* PostgreSQL database with Sequelize ORM
* Interactive Swagger API Documentation
* RESTful API design
* Input validation and proper HTTP status codes
* Cloud deployment with Render

---

# 🛠️ Technologies Used

* Node.js
* Express.js
* PostgreSQL
* Sequelize
* JWT (JSON Web Token)
* bcrypt
* Swagger (OpenAPI)
* Render
* Postman
* Git
* GitHub

---

# 📁 Project Structure

```text
personal-budget-api/
│
├── config/
├── db/
├── middleware/
├── models/
├── routes/
├── swagger/
├── .env
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
https://github.com/geraldandtech/Personal-Budget-API/tree/main
```

## 2. Navigate into the project

```bash
cd personal-budget-api
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create a `.env` file in the project root.

```env
DB_NAME=personal_budget
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost

JWT_SECRET=your_super_secret_key
```

If you're using Render, configure the following environment variables instead:

```env
DATABASE_URL=your_render_database_url
JWT_SECRET=your_super_secret_key
```

## 5. Start the development server

Using Nodemon:

```bash
npm run dev
```

or

```bash
node app.js
```

The API will be available at:

```
http://localhost:3000
```

Swagger documentation:

```
http://localhost:3000/api-docs
```

---

# 🔐 Authentication

Most endpoints require authentication.

## Register

```http
POST /auth/register
```

Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Login

```http
POST /auth/login
```

Example Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Successful login returns a JWT token.

Include the token in all protected requests:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📦 API Endpoints

## Authentication

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| POST   | `/auth/register` | Register a new user           |
| POST   | `/auth/login`    | Login and receive a JWT token |

### Envelopes

| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| GET    | `/envelopes`          | Get all envelopes                |
| GET    | `/envelopes/:id`      | Get a specific envelope          |
| POST   | `/envelopes`          | Create a new envelope            |
| PUT    | `/envelopes/:id`      | Update an existing envelope      |
| DELETE | `/envelopes/:id`      | Delete an envelope               |
| POST   | `/envelopes/transfer` | Transfer funds between envelopes |

### Transactions

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | `/transactions`     | Get all transactions           |
| GET    | `/transactions/:id` | Get a specific transaction     |
| POST   | `/transactions`     | Create a new transaction       |
| PUT    | `/transactions/:id` | Update an existing transaction |
| DELETE | `/transactions/:id` | Delete a transaction           |

---

# 🧪 Testing

The API was tested using:

* Postman
* Swagger UI
* Express error handling
* PostgreSQL database queries

---

# 📖 What I Learned

This project helped me gain practical experience with:

* Building RESTful APIs using Express.js
* Designing relational databases with PostgreSQL
* Using Sequelize ORM for database operations
* Creating model relationships and associations
* Implementing CRUD operations
* Building secure authentication using JWT
* Hashing passwords with bcrypt
* Writing middleware for authentication and authorization
* Documenting APIs using Swagger/OpenAPI
* Testing endpoints with Postman
* Deploying full-stack backend applications to Render
* Managing environment variables securely
* Using Git and GitHub for version control

---

# 👨‍💻 Author

**Nyaku Mamaregane**

This project was built as part of my journey to become a Back-End Software Engineer and serves as one of my portfolio projects.

---

# 📄 License

This project is intended for educational and portfolio purposes.
