#  CyberShield

## Full Stack Vulnerability Assessment Platform

CyberShield is a full-stack cybersecurity dashboard built using React, Node.js, Express, and MongoDB.
It helps users perform basic vulnerability assessments on websites by scanning security headers, open ports, and detecting common security weaknesses.

---

# Features

##  Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

---

##  Security Scanning

* Security Header Analysis
* HTTPS Status Checker
* Nmap Port Scanning
* SQL Injection Pattern Detection
* Vulnerability Detection Engine
* Risk Level Analysis

---

##  Dashboard Features

* Modern Cybersecurity UI
* Live Scan Results
* Analytics Cards
* Scan History
* Delete Scan Feature
* Loading Spinner
* PDF Report Download

---

#  Tech Stack

## Frontend

* React.js
* Vite
* Axios

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Security & Tools

* JWT Authentication
* bcryptjs
* Helmet
* Express Rate Limiting
* Nmap
* PDFKit

---


# Installation

## Clone Repository

```bash
git clone https://github.com/Vinit-paul/Cyber-Shield.git
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd client/cybershield-frontend
npm install
npm run dev
```

---

#  Environment Variables

Create a `.env` file inside the server folder.

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

---

#  API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

## Scanning

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /api/scan/headers |
| GET    | /api/scan         |
| DELETE | /api/scan/        |

---

## Reports

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /api/report/ |

---

#  Future Enhancements

* XSS Detection
* Advanced Vulnerability Scanner
* Real-Time Notifications
* Graphical Charts
* Deployment Support
* AI-Based Threat Detection

---

#  Author

## Vinit Paul

MCA Student | Full Stack Developer | Cybersecurity Enthusiast

---

#  Project Status

✅ Completed
✅ GitHub Uploaded
✅ Portfolio Ready
✅ Final Year Project Ready
