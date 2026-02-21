# 🌍 VolunTrip

VolunTrip is an innovative web platform designed to connect users with meaningful volunteer opportunities around the world.

Its mission is to make international volunteering accessible, simple, and impactful by enabling users to discover, explore, and apply for global volunteer activities.

---

# 📋 Table of Contents

* About VolunTrip
* Website Structure
* Features
* Tech Stack
* Installation & Setup
* Routes Overview
* Project Structure

---

# 📖 About VolunTrip

VolunTrip is not a travel agency — it is a dynamic technology platform that bridges volunteers and organizations worldwide.

Users can:

* Create an account and log in securely
* Browse volunteer opportunities
* Filter activities by category and location
* Apply directly through an online form
* Share reviews from their volunteering experience
* Suggest organizations to join the platform

---

# 🧭 Website Structure

1. Landing Page (/)
   Public welcome page introducing the platform and its mission.

2. Authentication (/register, /login, /logout)

* Registration with validation
* Duplicate checks for ID, email, and username
* Password hashing using bcryptjs
* Session-based authentication using express-session

3. Home (/home)
   Main dashboard available after login.

4. Explore Activities (/explore)

* Displays activities stored in MySQL
* Shows total number of applications submitted
* Supports filtering by category and location
* Includes form to publish a new activity

5. Apply for Activities (/apply/:activityId)

* Activity-specific application form
* Captures:

  * Start date
  * Duration
  * Language preference
  * Physical work preference
  * Motivation
  * Terms agreement

6. Reviews (/reviews)

* Logged-in users can submit volunteer reviews
* Latest reviews are displayed on the About page

7. About (/about)

* Platform story
* FAQ
* Social links
* Testimonials fetched dynamically from recent reviews

8. Connect (/connect)

* Suggest organizations to join VolunTrip
* Displays recently suggested organizations

9. 404 Page
   Unknown routes render a custom file_not_found page.

---

# ⭐ Features

* Authentication-protected user experience
* Volunteer activity discovery and filtering
* Activity publishing workflow
* Online volunteer application system
* Volunteer review submission and testimonial display
* Organization suggestion flow ("Let's Connect")
* Server-side rendering using EJS templates
* MVC-like folder structure

---

# 🛠 Tech Stack

* Node.js
* Express
* EJS
* MySQL (mysql2)
* bcryptjs
* express-session
* HTML / CSS / JavaScript

---

# 🚀 Installation & Setup

1. Clone the Repository

git clone [https://github.com/etaysosman/Voluntrip.git](https://github.com/etaysosman/Voluntrip.git)
cd Voluntrip

2. Install Dependencies

npm install

If needed manually:

npm install express mysql2 ejs bcryptjs express-session

3. Configure MySQL

Update database credentials inside:
util/database.js

Make sure the following fields are correct:

* host
* user
* password
* database (default in project: voluntrip)

4. Run the Server

node app.js

Server will run at:
[http://localhost:3000](http://localhost:3000)

---

# 🛣 Routes Overview

## Public Routes

```
GET    /
GET    /register
POST   /register
GET    /login
POST   /login
```

## Authentication Required

```
POST   /logout
GET    /home
GET    /about
GET    /explore
POST   /explore
GET    /apply/:activityId
POST   /apply
POST   /addActivity
GET    /reviews
POST   /reviews
GET    /connect
POST   /connect
```

---

# 📁 Project Structure

```
Voluntrip/
│
├── app.js
├── package.json
├── README.md
│
├── controllers/
│   ├── apply.js
│   ├── connect.js
│   ├── home.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── activity.js
│   ├── apply.js
│   ├── connect.js
│   ├── review.js
│   └── users.js
│
├── routes/
│   ├── apply.js
│   ├── home.js
│   ├── reviews.js
│   └── users.js
│
├── util/
│   ├── database.js
│   └── is_auth.js
│
├── public/
│   ├── css/
│   ├── images/
│   ├── js/
│   └── media/
│
└── views/
    ├── cpanel/
    ├── about.ejs
    ├── apply.ejs
    ├── connect.ejs
    ├── explore.ejs
    ├── file_not_found.ejs
    ├── home.ejs
    ├── index.ejs
    ├── login.ejs
    ├── register.ejs
    ├── reviews.ejs
    └── includes/
```

---
