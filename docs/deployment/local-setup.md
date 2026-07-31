# Local Development Setup

## Overview

This guide explains how to run Telegram LMS locally for development.

The project requires:

- Node.js
- MongoDB
- Cloudinary account
- Telegram Bot

---

# Requirements

Before starting, install:

```text
Node.js >= 18

npm

Git

MongoDB Atlas account
```

---

# Clone Repository

Clone the project:

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd telegram-mini-app
```

---

# Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create:

```text
.env
```

Inside backend folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173


BOT_TOKEN=telegram_bot_token

GROUP_ID=telegram_group_id


CLOUDINARY_CLOUD_NAME=cloud_name

CLOUDINARY_API_KEY=api_key

CLOUDINARY_API_SECRET=api_secret
```

---

# Start Backend

Development mode:

```bash
npm run dev
```

or:

```bash
npm start
```

Expected output:

```text
MongoDB Connected

Server running on port 5000
```

---

# Frontend Setup

Open frontend folder:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

---

# Frontend Environment

Create:

```text
.env
```

Example:

```env
VITE_API_URL=http://localhost:5000
```

---

# Start Frontend

Run:

```bash
npm run dev
```

Frontend will start:

```text
http://localhost:5173
```

---

# Testing

Test backend:

```http
GET http://localhost:5000/
```

Expected:

```json
{
 "success": true,
 "message": "Telegram LMS API Running"
}
```

---

# Development Workflow

Recommended workflow:

```text
Create Feature

↓

Create Branch

↓

Develop Feature

↓

Test API

↓

Create Pull Request

↓

Merge
```

---

# Common Issues

## MongoDB Connection Error

Check:

- MongoDB URI
- Network access
- Database credentials

---

## Cloudinary Upload Error

Check:

- API keys
- Cloud name
- File permissions

---

## Authentication Error

Check:

- JWT secret
- Cookies
- Telegram verification

---

# Summary

This setup guide allows developers to quickly run Telegram LMS locally and start contributing to the project.