# vitalguard
 a medical record and  medical emergency alerts website.

## The Problem
Patients experience preventable deteoration due to fragmented health data and missing early warnings.
- Clinicians are reactive, often detecting deterioration only after a crisis.
- Rural and understaffed facilities lack continuous monitoring.

## 💡 Solution overview
- Vital guard-a unified platform that shifts healthcare from reactive to proactive by combining three capabilities-to eliminate delays in medical response, which are:

### Remote monitoring
- Web based dashboard with live updates

### Predictive analytics 
- Risk scores displayed on dashbooard
- Early warnings help prevent clinical deterioration events

### Virtual assistance
- AI powered chatbot for clinicians to query drug dosages, patient history
- Integration with medical systems and records

## ✨ Key Features
- Dashboard
- Risk prediction
- Emergency alerts
- Clinician chatbot
- Prescription reminders
- QR code leading to medical history upon scan
- Daily health check in questionnaire

## 🛠 Tech Stack

|Component     |Technology                           |
|--------------|-------------------------------------|
|Frontend      |HTML, CSS, JavaScript                |
|Backend       |Node.js + Express                    |
|Database      |Firebase                             |
|Deployment    |                                     |
|Testing       |Jest(frontend), Pytest(backend)      |

## 🔧 Installation and Setup
Prerequisites

Make sure you have the following installed:

Node.js (v18 or higher)

npm (comes with Node.js)

Git

Firebase Account

Python 3.9+ (only if using Pytest for additional services)

Check versions:

node -v
npm -v
python --version
1️⃣ Clone the Repository
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
2️⃣ Backend Setup (Node.js + Express)
📦 Install Backend Dependencies

Navigate to the backend folder:

cd backend
npm install

If starting fresh, install core packages:

npm install express cors dotenv firebase-admin
npm install --save-dev nodemon jest
▶️ Run the Backend Server

Add this in your package.json:

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "jest"
}

Then run:

npm run dev

Server should run on:

http://localhost:5000
3️⃣ Firebase Setup (Database)
🔥 Step 1: Create Firebase Project

Go to https://console.firebase.google.com

Click Create Project

Enable Firestore Database

Go to Project Settings → Service Accounts

Generate a new private key

Download the JSON file

🔐 Step 2: Configure Firebase in Backend

Place the service account file inside:

backend/config/firebase-service-account.json

Create a .env file in backend:

PORT=5000

Initialize Firebase inside firebase.js:

const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
4️⃣ Frontend Setup (HTML, CSS, JS)

No framework installation required.

If using Live Server:

cd frontend

Open index.html in browser
OR use VS Code Live Server extension.

If using npm:

npm install
npm start

Make sure frontend API calls point to:

http://localhost:5000/api/
5️⃣ Testing Setup
🧪 Frontend Testing (Jest)

Install:

npm install --save-dev jest

Add script:

"test": "jest"

Run:

npm test
🧪 Backend Testing (Important ⚠️)

Since your backend is Node.js, normally you would use:

Jest

Supertest

If you truly need Pytest, that only works if part of your backend is Python.

For Node backend testing:

npm install --save-dev jest supertest
6️⃣ Environment Variables

Create .env file in backend:

PORT=5000
FIREBASE_PROJECT_ID=your_project_id

Install dotenv:

npm install dotenv

Add at top of server.js:

require("dotenv").config();
7️⃣ Deployment
🚀 Option 1: Render

Push code to GitHub

Go to https://render.com

Create Web Service

Connect GitHub repo

Set:

Build command: npm install

Start command: npm start

🚀 Option 2: Firebase Hosting (Frontend)

Install Firebase CLI:

npm install -g firebase-tools

Login:

firebase login

Initialize:

firebase init

Deploy:

firebase deploy
🛠 Project Structure Example
project-root/
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   ├── firebase.js
│   ├── routes/
│   └── config/
│
├── .env
└── README.md
✅ Running the Full System

Start backend:

cd backend
npm run dev

Open frontend in browser

Ensure Firebase is connected

Test API endpoints
