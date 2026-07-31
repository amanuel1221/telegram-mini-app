# Authentication API Documentation

## Overview

The authentication system allows users to access Telegram LMS using their Telegram account.

The system does not require email or password.

Authentication is handled through:

- Telegram verification
- JWT token
- HTTP-only cookies

---

# Authentication Flow

```text
User

↓

Open Telegram Mini App

↓

Telegram provides user information

↓

Frontend sends authentication request

↓

Backend verifies user

↓

JWT token generated

↓

Cookie stored

↓

User authenticated
```

---

# Base URL

```text
http://localhost:5000
```

---

# Login User

## Endpoint

```http
POST /auth/login
```

## Description

Authenticates a Telegram user and creates an account if the user does not exist.

---

## Request

Headers:

```http
Content-Type: application/json
```

Body example:

```json
{
  "telegramUser": {
    "id": 123456789,
    "username": "student",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

---

## Success Response

Status:

```http
200 OK
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "65abc123",
    "telegramId": 123456789,
    "username": "student",
    "firstName": "John",
    "role": "student",
    "isMember": true
  }
}
```

---

# Authentication Cookie

After successful login, the backend creates:

```text
token
```

The token is stored as:

```text
HTTP-only Cookie
```

Example:

```text
token=jwt_token_value
```

The frontend does not manually store this token.

---

# Get Current User

## Endpoint

```http
GET /auth/me
```

## Description

Returns the currently authenticated user.

---

## Authentication

Required:

```http
Cookie: token
```

---

## Success Response

```json
{
  "success": true,
  "user": {
    "id": "65abc123",
    "telegramId": 123456789,
    "username": "student",
    "role": "student",
    "isMember": true
  }
}
```

---

# Logout User

## Endpoint

```http
POST /auth/logout
```

## Description

Removes the authentication cookie.

---

## Success Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

# Authentication Middleware

Protected routes use authentication middleware.

Flow:

```text
Request

↓

Check Cookie

↓

Verify JWT

↓

Find User

↓

Attach User To Request

↓

Continue
```

---

# Protected Routes Example

Routes requiring authentication:

```text
GET /pdfs

POST /pdfs

PATCH /users/:id/promote
```

---

# Error Responses

## Missing Authentication

Status:

```http
401 Unauthorized
```

Response:

```json
{
  "success": false,
  "message": "Not authenticated"
}
```

---

## Invalid Token

Status:

```http
401 Unauthorized
```

Response:

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## User Not Found

Status:

```http
404 Not Found
```

Response:

```json
{
  "success": false,
  "message": "User not found"
}
```

---

# Security Notes

The authentication system uses:

- Telegram identity verification
- JWT authentication
- HTTP-only cookies
- Protected middleware
- Role-based authorization

---

# Future Improvements

Possible improvements:

- Refresh token support
- Session management
- Device tracking
- Advanced security monitoring

---

# Summary

The authentication API provides a secure and simple login system using Telegram as the identity provider while keeping the backend responsible for authorization and user management.