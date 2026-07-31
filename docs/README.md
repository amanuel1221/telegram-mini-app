# Telegram LMS Documentation

Welcome to the Telegram LMS documentation.

Telegram LMS is a lightweight learning management system built around Telegram Mini Apps. The goal is to allow students to access learning materials easily while teachers manage and share PDF resources.

The system focuses on simplicity:

- Teachers upload learning documents.
- Students read documents inside the Mini App.
- Telegram handles user identity.
- Backend manages authentication and files.

---

# Project Overview

Telegram LMS connects several services together:

- Telegram Mini App
- React Frontend
- Node.js Backend
- MongoDB Database
- Cloudinary File Storage
- Telegram Bot Notifications

The platform avoids unnecessary complexity and focuses on delivering a simple MVP learning experience.

---

# Main Features

## Authentication

Users authenticate through Telegram.

Features:

- Telegram user verification
- Automatic user creation
- JWT authentication
- Secure cookie sessions

---

## PDF Management

Teachers can manage learning materials.

Features:

- Upload PDF files
- View uploaded files
- Update PDF information
- Delete PDF files
- Store files using Cloudinary

---

## User Management

Teachers have special permissions.

Features:

- View registered users
- View students
- Promote students to teachers

---

# Technology Stack

## Frontend

- React
- Tailwind CSS
- Telegram Mini Apps SDK

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Authentication

## Services

- Telegram Bot API
- Cloudinary

---

# System Architecture

```mermaid
flowchart LR

User[Telegram User]

MiniApp[Telegram Mini App]

Frontend[React Frontend]

Backend[Node.js API]

Database[(MongoDB)]

Storage[Cloudinary]

Bot[Telegram Bot]


User --> MiniApp
MiniApp --> Frontend
Frontend --> Backend

Backend --> Database
Backend --> Storage
Backend --> Bot