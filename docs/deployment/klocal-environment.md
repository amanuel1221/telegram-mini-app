# Environment Variables Documentation

## Overview

Environment variables store sensitive configuration values.

They should never be committed to GitHub.

Examples:

- Database credentials
- JWT secrets
- API keys
- Bot tokens

---

# Backend Environment Variables

Location:

```text
backend/.env
```

---

# Server Configuration

```env
PORT=5000
```

Description:

Defines the backend server port.

---

# Database

```env
MONGO_URI=
```

Description:

MongoDB Atlas connection string.

Used for:

- User storage
- PDF metadata
- Application data

---

# Authentication

```env
JWT_SECRET=
```

Description:

Secret key used for creating and verifying JWT tokens.

Keep this private.

---

# Frontend URL

```env
CLIENT_URL=
```

Description:

Allows backend to communicate with frontend.

Example:

```env
CLIENT_URL=http://localhost:5173
```

---

# Telegram Configuration

```env
BOT_TOKEN=
```

Description:

Telegram bot authentication token.

Used for:

- Sending announcements
- Telegram API requests

---

```env
GROUP_ID=
```

Description:

Telegram group identifier.

Used for:

- Checking membership
- Sending notifications

---

# Cloudinary Configuration

```env
CLOUDINARY_CLOUD_NAME=
```

Cloudinary account name.

---

```env
CLOUDINARY_API_KEY=
```

Cloudinary API access key.

---

```env
CLOUDINARY_API_SECRET=
```

Cloudinary secret key.

---

# Example Environment File

```env
PORT=5000

MONGO_URI=mongodb://example

JWT_SECRET=mysecret

CLIENT_URL=http://localhost:5173

BOT_TOKEN=telegram_token

GROUP_ID=telegram_group

CLOUDINARY_CLOUD_NAME=name

CLOUDINARY_API_KEY=key

CLOUDINARY_API_SECRET=secret
```

---

# Security Rules

Never:

- Upload `.env` to GitHub
- Share API keys
- Share bot tokens
- Hardcode secrets

---

# Git Ignore

The project should include:

```text
.env
.env.local
node_modules
```

inside:

```text
.gitignore
```

---

# Summary

Environment variables keep the Telegram LMS configuration secure and allow the same codebase to run in different environments.