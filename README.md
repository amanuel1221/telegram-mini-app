# Telegram Mini App — EntranceKey Academy

A private **Telegram Mini App learning platform** developed for **EntranceKey Academy** to provide authorized students with access to educational PDF materials directly inside Telegram.

The application connects **Telegram membership verification, role-based access control, a React PDF reader, and cloud-based file storage** into a single learning workflow.

Students can access learning materials only when they are authorized members of the academy's private Telegram groups. Authorized users can read the available PDFs inside the Mini App, while direct file downloading is restricted.

Teachers have additional permissions for managing students and learning materials.

---

## Core Workflow

```text
Telegram User
      ↓
Open Mini App
      ↓
Verify Telegram Membership
      ↓
Authorized?
   ┌──┴───┐
  No     Yes
  ↓       ↓
Access   Check Role
Denied      ↓
        ┌───┴────┐
      Student  Teacher
        ↓         ↓
     Read PDFs   Manage
                 Students
                 & PDFs
```

---

## Main Capabilities

### Student

* Telegram-based access verification
* Protected access to academy materials
* Integrated PDF reader
* Read PDFs directly inside the Mini App
* Restricted direct file downloads
* Access based on Telegram group membership

### Teacher

* Manage student access
* Remove students from the academy group
* Promote or manage student roles
* Upload new PDF materials
* Edit existing materials
* Delete learning materials
* Manage available educational content

### Platform

* Telegram Mini App integration
* React frontend
* MERN-oriented backend architecture
* MongoDB for application data
* Cloudinary for PDF storage
* Role-based authorization
* Protected educational resources

# Telegram Membership & Access Control

The Mini App uses **Telegram group membership as part of the authorization workflow**.

When a student opens the application, their Telegram identity is checked against the academy's private groups before protected learning materials are made available.

## Access Flow

```text
User Opens Mini App
        ↓
Telegram Identity
        ↓
Membership Verification
        ↓
Is User Authorized?
    ┌────┴─────┐
   No         Yes
    ↓           ↓
Access Denied   Continue
"Unauthorized   ↓
to access"    Role Check
                ↓
          Student / Teacher
```

Users who are not authorized members cannot access the protected learning materials.

This allows the academy to use its existing Telegram community as part of the application's access-control system.

## Authorization Rules

### Unauthorized User

If the user is not a member of the required private group:

```text
Telegram Membership
        ↓
     Not Found
        ↓
   Access Rejected
        ↓
"Unauthorized to access"
```

No protected PDF content is presented to the user.

### Authorized Student

An authorized student can:

* Access available learning materials
* Open PDFs inside the application
* Read materials through the integrated PDF reader
* Navigate through PDF pages

The application is designed for **in-app reading rather than providing a direct download experience**.

### Teacher

Teachers receive additional permissions through role-based authorization, allowing them to manage students and educational materials.

## Security Principle

The frontend does not determine whether a user should have access by itself.

```text
Telegram Identity
       ↓
Membership Verification
       ↓
Backend Authorization
       ↓
Protected Resource
```

Access decisions are based on authorization rules rather than simply hiding UI elements.

> The goal was to connect Telegram's private-group membership with application-level authorization so that academy materials are available only to the intended users.

# PDF Learning System

The platform provides a protected PDF learning environment where authorized students can read academy materials directly inside the Telegram Mini App.

Instead of exposing ordinary download links, PDFs are loaded into an integrated **React-based PDF reader** so students can study the material within the application.

## PDF Workflow

```text id="7f2k1m"
Teacher
   ↓
Upload PDF
   ↓
Backend Validation
   ↓
Cloudinary
   ↓
Store File Reference
   ↓
MongoDB
   ↓
Authorized Student
   ↓
React PDF Reader
   ↓
Read Inside Mini App
```

## Cloudinary Storage

PDF files are stored using **Cloudinary**, while the application's database stores the information required to manage each learning resource.

This separates:

* **File storage** → Cloudinary
* **Application metadata** → MongoDB
* **User interface** → React PDF Reader
* **Authorization** → Backend + Telegram membership

## Student Reading Experience

Authorized students can:

* Browse available learning materials
* Open PDF documents
* Navigate through pages
* Read materials directly inside Telegram
* Study without leaving the Mini App

The interface intentionally avoids presenting the learning material as a simple public file-download page.

## Teacher Material Management

Teachers can manage the academy's learning library by:

* Uploading new PDFs
* Editing existing material information
* Replacing or updating resources
* Deleting outdated materials

```text id="6q7n2p"
Teacher Dashboard
      ↓
Manage Materials
      ├── Upload
      ├── Edit
      └── Delete
             ↓
          Cloudinary
             ↓
           MongoDB
```

The result is a simple content-management workflow designed specifically around the academy's private learning environment.

# Role-Based Management

The platform uses **role-based access control** to separate student and teacher capabilities.

```text id="x8k3qf"
                    User
                      ↓
                Role Verification
                      ↓
              ┌───────┴───────┐
              ↓               ↓
           Student          Teacher
              ↓               ↓
        Read Materials    Manage Students
                          Manage Materials
```

## Student Role

Students have access to the learning experience but cannot manage academy users or content.

* Access authorized learning materials
* Read PDFs inside the Mini App
* Browse available resources
* Use the integrated PDF reader

## Teacher Role

Teachers have additional management permissions.

### Student Management

* View students
* Remove students from the Telegram group
* Promote or manage student roles
* Control student access

### Material Management

* Upload new PDFs
* Edit learning material information
* Delete materials
* Maintain the academy's learning library

## Permission Model

The application separates **authentication, authorization, and content access**:

```text id="6w5r3c"
Telegram Identity
       ↓
Membership Verification
       ↓
User Role
       ↓
Permission Check
       ↓
Allowed Action
```

A student's ability to read educational content does not automatically give them permission to manage students or materials.

This separation keeps administrative functionality restricted to authorized teacher accounts.

# System Architecture

The application follows a **MERN-oriented architecture** with Telegram acting as the identity and community layer.

```text
┌─────────────────────────────┐
│       Telegram Client       │
│                             │
│       Telegram Mini App     │
└──────────────┬──────────────┘
               │
               ↓
┌─────────────────────────────┐
│        React Frontend       │
│                             │
│  • Learning Interface       │
│  • PDF Reader               │
│  • Student UI               │
│  • Teacher Dashboard        │
└──────────────┬──────────────┘
               │
               ↓
┌─────────────────────────next────┐
│       Node.js / Express     │
│                             │
│  • Authentication           │
│  • Membership Verification  │
│  • Authorization            │
│  • Role Management          │
│  • PDF Management           │
└───────┬─────────────┬───────┘
        │             │
        ↓             ↓
┌──────────────┐  ┌────────────────┐
│   MongoDB    │  │   Cloudinary   │
│              │  │                │
│ Users        │  │ PDF Storage    │
│ Roles        │  │ Media Files    │
│ Materials    │  │                │
└──────────────┘  └────────────────┘
```

## Technology Stack

| Layer         | Technology                              |
| ------------- | --------------------------------------- |
| Mini App      | Telegram Mini Apps                      |
| Frontend      | React, JavaScript, Vite                 |
| UI            | Tailwind CSS                            |
| PDF Reading   | React PDF Reader                        |
| Backend       | Node.js, Express.js                     |
| Database      | MongoDB, Mongoose                       |
| File Storage  | Cloudinary                              |
| Authorization | Telegram Membership + Role-Based Access |
| API           | REST                                    |
| Development   | Git, GitHub, Postman                    |

## Application Responsibilities

**Telegram**
Provides the Mini App environment and acts as part of the user's identity and group-membership context.

**React**
Provides the learning interface, teacher dashboard, material management UI, and integrated PDF reader.

**Node.js + Express**
Handles application logic, authorization, material management, and communication between the frontend and external services.

**MongoDB**
Stores application data such as users, roles, and learning-material metadata.

**Cloudinary**
Stores the educational PDF files and provides cloud-based file management.

> The architecture is designed so that Telegram handles the community context while the application handles learning content, permissions, and resource management.

# Security & Protected Content

Because the platform contains private educational materials, access control is a core part of the application.

The system combines **Telegram membership verification, role-based authorization, and protected resource handling**.

## Access Control Flow

```text id="w4k8ps"
Telegram User
      ↓
Identity / Membership Check
      ↓
Backend Verification
      ↓
Authorized?
   ┌──┴───┐
  No     Yes
  ↓       ↓
Denied   Role Check
          ↓
     ┌────┴─────┐
  Student     Teacher
     ↓           ↓
 Read PDFs    Management
```

## Protection Layers

### 1. Telegram Membership

Users must belong to the required private Telegram group before accessing the learning platform.

### 2. Backend Authorization

Access decisions are verified by the application backend rather than relying only on frontend UI restrictions.

### 3. Role-Based Permissions

Students and teachers receive different permissions.

A student cannot access teacher-only management operations simply because the interface exists.

### 4. Protected Learning Materials

PDF resources are presented through the integrated reader instead of exposing the application as a simple collection of public download links.

```text id="j5z2rn"
Unauthorized User
       ↓
Membership Check
       ↓
     Rejected
       ↓
No Protected Material


Authorized User
       ↓
Authorization
       ↓
Permission Check
       ↓
React PDF Reader
```

## Security Principle

The main principle is:

> **Authentication identifies the user. Authorization determines what the user is allowed to access.**

This separation is particularly important for the teacher dashboard, student management, and protected educational resources.


# Teacher Dashboard & Content Management

The teacher dashboard provides authorized teachers with tools to manage both **students and educational materials**.

## Student Management

Teachers can manage student access from the application:

* View authorized students
* Remove students from the Telegram group
* Promote or update student roles
* Manage student access to the learning platform

```text
Teacher
   ↓
Student Management
   ├── View
   ├── Promote
   └── Remove
```

## Learning Material Management

Teachers can maintain the academy's PDF library without modifying the application itself.

```text
Teacher Dashboard
       ↓
  Material Management
       │
       ├── Upload PDF
       ├── Edit Material
       └── Delete Material
                ↓
            Cloudinary
                ↓
             MongoDB
```

This turns the Mini App into a small **learning-content management system**, rather than simply a document viewer.

## Teacher vs Student

| Capability                  | Student | Teacher |
| --------------------------- | :-----: | :-----: |
| Access authorized materials |   Yes   |   Yes   |
| Read PDFs                   |   Yes   |   Yes   |
| Manage students             |    No   |   Yes   |
| Remove students             |    No   |   Yes   |
| Manage roles                |    No   |   Yes   |
| Upload PDFs                 |    No   |   Yes   |
| Edit materials              |    No   |   Yes   |
| Delete materials            |    No   |   Yes   |


# Challenges & Engineering Lessons

Building this Mini App introduced several practical engineering challenges.

### Telegram-Based Authorization

The application needed to connect Telegram group membership with application-level access control.

**Lesson:** authentication and authorization must be treated as separate concerns. Knowing who the user is is not enough; the application must also determine what that user is allowed to access.

### Protected Educational Content

The academy wanted students to read PDFs inside the application without turning the learning library into a simple collection of downloadable files.

**Lesson:** the way resources are delivered is part of the application's security and user-experience design.

### Role-Based Access

Teachers required management capabilities that students should not have.

**Lesson:** permissions should be defined around roles and enforced by the application rather than relying only on hiding frontend controls.

### Cloud File Management

Educational PDFs needed reliable cloud storage while their application metadata remained manageable through the database.

**Lesson:** separating file storage from application data makes content management easier to maintain.

### Small-Academy Requirements

The platform was built around the real workflow of **EntranceKey Academy**, rather than starting from a generic LMS template.

This required focusing on the academy's actual needs:

```text
Telegram Community
       +
Learning Materials
       +
Student / Teacher Roles
       +
Protected PDF Reading
       ↓
Purpose-Built Learning Platform
```

> The project reinforced an important principle: **good software starts with understanding the real workflow, then designing the architecture around it.**


# Project Structure

The project is organized around the main responsibilities of the Telegram learning platform: the React Mini App, backend API, database, and cloud-based learning materials.

A simplified structure is:

```text
telegram-mini-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── ...
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── ...
│
├── README.md
└── package.json
```

## Frontend

The React frontend is responsible for the Mini App user experience.

Main responsibilities include:

* Telegram Mini App interface
* Student learning interface
* PDF reader
* Teacher dashboard
* Learning-material management
* Student-management interface
* API communication

```text
React
  ↓
Pages & Components
  ↓
API Services
  ↓
Node.js / Express API
```

## Backend

The backend contains the application's business logic and protected API operations.

It handles:

* User and role management
* Telegram membership verification
* Authorization
* Student management
* PDF management
* Cloudinary integration
* MongoDB communication
* Protected API routes

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Authorization
   ↓
Controller
   ↓
Database / Cloudinary
```

## Database

MongoDB stores application data and metadata required by the platform.

Examples include:

* Users
* Roles
* Learning-material information
* Resource references
* Other application-specific records

The actual PDF files are stored separately in Cloudinary.

## Cloud Storage

Cloudinary is used for cloud-based storage of educational PDF resources.

This keeps large file storage separate from the application's MongoDB data while allowing the backend to manage the relationship between materials and their stored files.

## Architecture Principle

The project keeps responsibilities separated:

```text
Telegram
   ↓
Identity / Membership Context

React
   ↓
User Interface

Express
   ↓
Application Logic & Authorization

MongoDB
   ↓
Application Data

Cloudinary
   ↓
PDF Files
```

This separation makes the application easier to maintain and provides a foundation for expanding the platform as the academy grows.

# API & Data Flow

The application uses a backend API to connect the React Mini App with authentication, authorization, MongoDB, and Cloudinary.

The backend acts as the central layer that validates requests and controls access to protected operations.

## Student Access Flow

When a student opens the Mini App, the application follows an authorization flow before exposing protected learning materials.

```text
Telegram Mini App
       ↓
Telegram User Context
       ↓
Backend API
       ↓
Membership Verification
       ↓
Role / Permission Check
       ↓
Authorized?
   ┌───┴────┐
  No       Yes
  ↓         ↓
Denied    Fetch Materials
            ↓
         MongoDB
            ↓
       React Frontend
            ↓
        PDF Reader
```

An unauthorized user receives an access-denied response instead of receiving the protected learning resources.

## Reading a PDF

For an authorized user:

```text
Student
   ↓
Select Material
   ↓
React Application
   ↓
Protected API Request
   ↓
Authorization Check
   ↓
Material Reference
   ↓
Cloudinary
   ↓
React PDF Reader
```

The application is designed around **in-app reading** rather than exposing a normal download interface.

## Teacher Upload Flow

Teachers can add new educational materials through the dashboard.

```text
Teacher
   ↓
Select PDF
   ↓
React Teacher Dashboard
   ↓
Upload API
   ↓
Teacher Permission Check
   ↓
Cloudinary
   ↓
Store File Reference
   ↓
MongoDB
   ↓
Material Available
```

MongoDB stores the information needed by the application to manage the material, while Cloudinary handles the actual file storage.

## Teacher Material Update

```text
Teacher
   ↓
Edit / Replace Material
   ↓
Backend Authorization
   ↓
Update Cloudinary Resource
   ↓
Update MongoDB Metadata
   ↓
Updated Material
```

This allows teachers to maintain the learning library without requiring a frontend deployment for every content change.

## Teacher Student Management

Teacher operations also pass through the backend authorization layer.

```text
Teacher Dashboard
       ↓
Student Management Request
       ↓
Backend
       ↓
Verify Teacher Permission
       ↓
Perform Management Action
       ↓
Update Application / Telegram State
```

## API Responsibility

The backend provides a boundary between the public-facing React interface and protected application resources.

```text
React
  │
  │ HTTP Request
  ↓
Express API
  │
  ├── Authentication
  ├── Authorization
  ├── Telegram Verification
  ├── Material Management
  │
  ├──────────────→ MongoDB
  │
  └──────────────→ Cloudinary
```

This architecture keeps important permission decisions on the server instead of trusting the client to enforce them.

# Deployment & Environment Configuration

The application is designed as a web-based Telegram Mini App with a separate frontend and backend architecture.

```text
                    Telegram
                       │
                       ↓
                React Mini App
                       │
                       ↓
                Node.js / Express
                  │           │
                  ↓           ↓
               MongoDB     Cloudinary
```

## Frontend Deployment

The React application can be deployed to a modern frontend hosting platform such as Vercel.

The deployed frontend is then configured as the Web App URL used by the Telegram Mini App.

```text
Telegram
    ↓
Mini App URL
    ↓
React Application
```

## Backend Deployment

The Node.js / Express API is deployed separately from the frontend.

The backend is responsible for:

* API requests
* Telegram membership verification
* Authorization
* MongoDB communication
* Cloudinary operations
* Teacher management operations
* Protected resource handling

```text
React Frontend
      ↓
Production API
      ↓
Node.js / Express
```

## Environment Variables

Sensitive configuration should be stored as environment variables rather than committed to the repository.

Typical backend configuration includes values for:

```text
MONGODB_URI
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
TELEGRAM_BOT_TOKEN
CLIENT_URL
```

The exact variable names depend on the project's implementation.

### Important

Secrets such as:

* Telegram bot tokens
* MongoDB credentials
* Cloudinary API secrets

must remain on the backend and should never be exposed through the React application's client-side environment.

## Production Request Flow

```text
User
 ↓
Telegram Mini App
 ↓
Production React App
 ↓
Production API
 ↓
 ┌───────────────┬───────────────┐
 ↓               ↓               ↓
Telegram       MongoDB       Cloudinary
Verification   Data           Files
```

## Deployment Principle

The frontend is responsible for the user experience, while the backend remains responsible for sensitive operations and authorization.

This separation makes it possible to deploy and update the user interface independently from the API and storage services.


# Engineering Highlights

This project demonstrates the ability to build a purpose-built full-stack application around a real organization's workflow rather than a generic CRUD application.

## What I Built

### Telegram Integration

Built a Telegram Mini App for **EntranceKey Academy** that connects the academy's private Telegram community with its learning platform.

### Membership-Based Authorization

Implemented a workflow where access to protected learning materials depends on the user's membership in the required private Telegram group.

Unauthorized users are rejected before they can access the protected materials.

### In-App PDF Learning

Integrated a React-based PDF reader so authorized students can study educational materials directly inside the Mini App.

The interface is designed around reading rather than exposing a conventional download workflow.

### Role-Based Access Control

Implemented separate capabilities for:

**Students**

* Access authorized materials
* Read PDFs
* Browse available learning resources

**Teachers**

* Manage students
* Remove students
* Manage student roles
* Upload PDFs
* Edit materials
* Delete materials

### Cloud File Management

Integrated Cloudinary for educational PDF storage while using MongoDB for application data and material metadata.

### Teacher Content Management

Teachers can maintain the academy's learning library through the application instead of requiring developers to manually modify or deploy content.

## Engineering Concepts Demonstrated

```text id="g9v4xq"
Telegram Mini Apps
       ↓
Authentication Context
       ↓
Authorization
       ↓
Role-Based Access Control
       ↓
Protected Resources
       ↓
Cloud Storage
       ↓
Database Management
       ↓
React User Interface
```

The project demonstrates practical experience with:

* React application architecture
* Node.js and Express API development
* MongoDB data management
* Cloudinary file storage
* REST API communication
* Telegram Mini App integration
* Role-based authorization
* Protected resource handling
* PDF rendering
* Teacher/admin workflows
* Cloud deployment architecture

## Project Context

**Client:** EntranceKey Academy
**Project Type:** Private educational platform
**Platform:** Telegram Mini App
**Architecture:** MERN-oriented full-stack application
**Primary Users:** Students and Teachers

> Built as a private learning platform for EntranceKey Academy, combining Telegram membership verification, protected educational resources, role-based management, and an in-app PDF learning experience.


# Future Improvements

The current platform provides the core learning workflow for EntranceKey Academy. Future development could extend it from a protected PDF learning platform into a more complete learning management system.

## Learning Progress

Add student learning-progress tracking:

* Track PDF reading progress
* Remember the last page viewed
* Track completed materials
* Display student learning statistics

```text id="6m3g1c"
Student
   ↓
Open Material
   ↓
Read PDF
   ↓
Track Progress
   ↓
Save Progress
   ↓
Student Dashboard
```

## Quizzes & Assessments

Introduce quizzes associated with learning materials.

Possible features:

* Multiple-choice questions
* Quiz submissions
* Automatic grading
* Scores and results
* Teacher-created assessments

## Course Organization

Expand the current PDF library into structured courses:

```text id="v0r2cz"
Course
 ├── Chapter 1
 │    ├── PDF
 │    └── Quiz
 │
 ├── Chapter 2
 │    ├── PDF
 │    └── Quiz
 │
 └── Chapter 3
      ├── PDF
      └── Quiz
```

## Student Analytics

Teachers could receive additional information about learning activity, such as:

* Active students
* Material engagement
* Course completion
* Quiz performance
* Learning progress

## Telegram Notifications

Integrate Telegram notifications for events such as:

* New learning materials
* Course announcements
* Teacher updates
* Important academy messages

## Stronger Content Protection

The current system restricts the normal download experience, but browser-based PDF content cannot be made absolutely impossible to capture.

Future improvements could include:

* Short-lived protected resource URLs
* Server-side authorization for every resource request
* Watermarked documents
* User-specific document identification
* Additional access monitoring

## Expanded Teacher Dashboard

The teacher dashboard could evolve into a complete academy management system with:

* Course management
* Student analytics
* Quiz management
* Announcements
* Content scheduling
* Teacher activity logs

## Long-Term Direction

The platform could eventually evolve from:

```text
Telegram Mini App
       +
Protected PDFs
       +
Teacher Management
```

into:

```text
Telegram Mini App
       ↓
Complete Learning Platform
       ├── Courses
       ├── PDFs
       ├── Quizzes
       ├── Progress Tracking
       ├── Analytics
       ├── Notifications
       └── Teacher Dashboard
```

The goal would be to keep Telegram as the academy's primary community and access layer while progressively expanding the Mini App into a complete digital learning environment.

