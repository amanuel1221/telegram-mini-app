# PDF API Documentation

## Overview

The PDF API manages learning materials inside Telegram LMS.

Teachers can upload and manage PDF files, while students can access available learning resources.

The system uses:

- Express.js API
- MongoDB for PDF metadata
- Cloudinary for file storage

---

# Base URL

```text
http://localhost:5000
```

---

# PDF Workflow

```text
Teacher

↓

Upload PDF

↓

Backend validates permission

↓

Upload file to Cloudinary

↓

Save PDF information

↓

Student can access file
```

---

# Upload PDF

## Endpoint

```http
POST /pdfs
```

## Description

Uploads a new PDF learning material.

Only teachers can access this endpoint.

---

## Authentication

Required:

```http
Cookie: token
```

---

## Request Type

```http
multipart/form-data
```

---

## Form Data

Example:

```text
title:
Node.js Basics


description:
Introduction to Backend Development


file:
lesson.pdf
```

---

## Success Response

Status:

```http
201 Created
```

Response:

```json
{
  "success": true,
  "message": "PDF uploaded successfully",
  "pdf": {
    "title": "Node.js Basics",
    "description": "Backend Introduction",
    "fileUrl": "cloudinary_url",
    "publicId": "telegram-lms/pdfs/file.pdf",
    "uploadedBy": "user_id"
  }
}
```

---

# Get All PDFs

## Endpoint

```http
GET /pdfs
```

## Description

Returns all available PDF files.

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
  "count": 2,
  "pdfs": [
    {
      "_id": "123",
      "title": "Node.js Basics",
      "description": "Backend Introduction",
      "fileUrl": "cloudinary_url"
    }
  ]
}
```

---

# Get PDF By ID

## Endpoint

```http
GET /pdfs/:id
```

## Description

Returns a single PDF document.

---

## Example Request

```http
GET /pdfs/65abc123
```

---

## Success Response

```json
{
  "success": true,
  "pdf": {
    "_id": "65abc123",
    "title": "Node.js Basics",
    "fileUrl": "cloudinary_url"
  }
}
```

---

# Update PDF

## Endpoint

```http
PATCH /pdfs/:id
```

## Description

Updates PDF information.

Only teachers can update files.

---

## Request Body

```json
{
  "title": "Advanced Node.js",
  "description": "Updated backend lesson"
}
```

---

## Success Response

```json
{
  "success": true,
  "message": "PDF updated successfully",
  "pdf": {
    "title": "Advanced Node.js"
  }
}
```

---

# Delete PDF

## Endpoint

```http
DELETE /pdfs/:id
```

## Description

Deletes a PDF file.

The system removes:

- Cloudinary file
- MongoDB record

---

## Success Response

```json
{
  "success": true,
  "message": "PDF deleted successfully"
}
```

---

# Authorization

PDF permissions:

```text
Student

Can:
- View PDFs


Teacher

Can:
- Upload PDFs
- Update PDFs
- Delete PDFs
```

---

# Error Responses

## Unauthorized

```json
{
  "success": false,
  "message": "Not authenticated"
}
```

---

## Forbidden

```json
{
  "success": false,
  "message": "Access denied. Teachers only."
}
```

---

## PDF Not Found

```json
{
  "success": false,
  "message": "PDF not found"
}
```

---

# Security

The PDF API uses:

- JWT authentication
- Teacher authorization middleware
- File validation
- Secure Cloudinary storage

---

# Future Improvements

Possible improvements:

- PDF preview
- Search functionality
- Categories
- Course organization
- Student progress tracking

---

# Summary

The PDF API provides complete document management for Telegram LMS, allowing teachers to manage learning resources and students to access educational files securely.