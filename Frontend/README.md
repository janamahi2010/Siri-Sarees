# Frontend Development Guidelines

## Assigned Developers

### Landing Page

Branch: `Dhana_Landing_page`

### Authentication

Branch: `Lucky_Login,signup,forgot_password`

### User Profile & Sarees Page

Branch: `Hannesha_User_profile_and_Sarees_Page`

---

# Technology Stack

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Responsive Design

No backend logic should be written in frontend files.

---

# Folder Structure

frontend/

├── landing-page/

│ ├── index.html

│ ├── css/

│ ├── js/

│ └── assets/

│

├── auth/

│ ├── login.html

│ ├── signup.html

│ ├── forgot-password.html

│ ├── css/

│ ├── js/

│ └── assets/

│

└── user-profile-sarees/

├── profile.html

├── sarees.html

├── css/

├── js/

└── assets/

---

# Design Rules

1. Mobile Responsive
2. Clean UI
3. Same Color Theme Across Pages
4. Proper Form Validation
5. Semantic HTML
6. Reusable CSS Classes

---

# API Integration

Create API functions only.

Example:

fetch('/api/login')

fetch('/api/signup')

fetch('/api/profile')

Do not create backend logic.

---

# Before Pushing

Checklist:

* HTML validated
* CSS responsive
* No console errors
* Images optimized
* Files organized
* Tested on mobile

---

# Commit Format

feat: create landing hero section

feat: login page UI

fix: mobile navbar issue

style: improve profile layout

---

# Pull Request Rules

1. Push to your own branch only.
2. Do not merge directly into main.
3. Create Pull Request.
4. Wait for review.
5. Resolve comments before merge.

---

# Deliverables

Landing Page Team:

* Hero Section
* About Section
* Featured Sarees
* Footer

Authentication Team:

* Signup Page
* Login Page
* Forgot Password Page

User Profile Team:

* Profile Page
* Edit Profile
* Sarees Listing Page
* Search & Filter UI

Frontend developers should submit only UI and API integration code.
