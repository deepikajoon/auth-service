# Authentication Service (Node.js)

This project is a lightweight authentication service built using Node.js and Express.  
It acts as a proxy layer to validate requests before allowing access to protected APIs.

## Features
- JWT-based authentication
- Stateless service design
- API rate limiting
- Middleware-based request validation

## Tech Stack
- Node.js
- Express
- JSON Web Tokens (JWT)
- express-rate-limit
- dotenv

## API Endpoints

### POST /login
Generates a JWT token for the client.

### GET /api/posts
Protected route that requires a valid Bearer token.

## Setup Instructions

```bash
npm install
