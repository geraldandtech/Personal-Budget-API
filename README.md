# Personal Budget API

A RESTful API for managing personal budgets using the **Envelope Budgeting** method. Users can create budget envelopes, record transactions, transfer funds between envelopes, and securely manage their own financial data through JWT authentication.

This project was built with **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize** as part of the Codecademy Back-End Engineering Path.

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
* PostgreSQL database with Sequelize ORM
* Interactive Swagger API Documentation
* RESTful API design
* Input validation and proper HTTP status codes

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
* Git & GitHub

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

# 🔐 Authentication

Most endpoints require authentication.

## Register

```http
POST /auth/register
```

## Login

```http
POST /auth/login
```

A successful login returns a JWT token.

Include the token in the `Authorization` header when accessing protected endpoints:

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

---

## Envelopes

| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| GET    | `/envelopes`          | Get all envelopes                |
| GET    | `/envelopes/:id`      | Get a specific envelope          |
| POST   | `/envelopes`          | Create a new envelope            |
| PUT    | `/envelopes/:id`      | Update an existing envelope      |
| DELETE | `/envelopes/:id`      | Delete an envelope               |
| POST   | `/envelopes/transfer` | Transfer funds between envelopes |

---

## Transactions

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | `/transactions`     | Get all transactions           |
| GET    | `/transactions/:id` | Get a specific transaction     |
| POST   | `/transactions`     | Create a new transaction       |
| PUT    | `/transactions/:id` | Update an existing transaction |
| DELETE | `/transactions/:id` | Delete a transaction           |
