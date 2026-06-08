# Backend Development Guidelines

## Assigned Developers

### Landing Page Backend

Branch: `Geethika_Landing_page`

### Authentication Backend

Branch: `Vinathi_Login,signup,forgot_password`

### User Profile & Sarees Backend

Branch: `Murali_User_profile_and_Sarees_page`

---

# Technology Stack

* Python
* Flask
* PostgreSQL
* SQLAlchemy
* JWT Authentication
* REST API

---

# Folder Structure

backend/

├── landing-page/

│ ├── routes/

│ ├── services/

│ ├── models/

│ └── tests/

│

├── auth/

│ ├── routes/

│ ├── services/

│ ├── models/

│ └── tests/

│

└── user-profile-sarees/

├── routes/

├── services/

├── models/

└── tests/

---

# Coding Standards

1. Use Flask Blueprint
2. Use SQLAlchemy ORM
3. Separate Routes and Business Logic
4. Return JSON Responses Only
5. Handle Errors Properly
6. Add Input Validation

---

# API Responsibilities

Landing Page Backend

Create APIs:

GET /api/home

GET /api/featured-sarees

GET /api/categories

---

Authentication Backend

Create APIs:

POST /api/signup

POST /api/login

POST /api/forgot-password

POST /api/reset-password

GET /api/user

---

User Profile & Sarees Backend

Create APIs:

GET /api/profile

PUT /api/profile

GET /api/sarees

GET /api/sarees/:id

POST /api/sarees

PUT /api/sarees/:id

DELETE /api/sarees/:id

---

# Database Standards

Tables:

users

sarees

categories

password_resets

Keep naming consistent.

Use migrations for schema changes.

---

# API Response Format

Success

{
"success": true,
"message": "Operation successful",
"data": {}
}

Error

{
"success": false,
"message": "Error description"
}

---

# Testing Requirements

Every API must be tested.

Check:

* Validation
* Success Response
* Error Response
* Database Operations

---

# Commit Format

feat: add signup api

feat: create profile endpoint

fix: login validation issue

refactor: optimize saree queries

---

# Pull Request Rules

1. Push only to assigned branch.
2. No direct push to main.
3. Create Pull Request.
4. Wait for approval.
5. Fix review comments.

---

# Final Deliverables

Landing Page Backend:

* Home APIs
* Featured Sarees APIs

Authentication Backend:

* Signup
* Login
* Forgot Password
* JWT Authentication

User Profile Backend:

* Profile CRUD
* Sarees CRUD
* Search & Filter APIs

Backend developers should submit only Flask API and PostgreSQL related code.
