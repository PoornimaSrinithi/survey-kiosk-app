# Customer Survey Kiosk App

This is a simple React-based survey application designed to collect customer feedback in a shop (like a kiosk system).

The idea was to keep the flow smooth and easy for users while also making the code flexible enough to handle changes like adding more questions later.

---

## What this app does

* Shows a welcome screen before starting
* Asks 5 survey questions (rating + text)
* Displays progress like 1/5, 2/5, etc.
* Allows users to go **next, back, or skip**
* Validates inputs before moving forward
* Limits text input (for better feedback quality)
* Shows a confirmation before final submission
* Displays a thank you screen and resets automatically

---

## Data handling

Each response is stored with:

* Question ID
* Answer
* Session ID (to identify each user)
* Status (`COMPLETED`)

---

## Backend (optional)

I also added a simple backend using Node.js and Express:

* Stores responses using an API (`POST /submit`)
* Data is saved in a local JSON file

If the backend is not running, the app still works using localStorage (for demo/deployment purposes).

---

## Tech stack

* React.js (Frontend)
* Node.js + Express (Backend)
* Fetch API (AJAX)

---

## Running locally

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
npm install
node server.js
```

---

## Notes

* The UI is kept simple and user-friendly (kiosk style)
* The question structure is flexible, so new questions can be added easily
* Focus was on functionality, flow, and usability rather than over-designing

---

## Live Demo

[https://customer-survey-app.netlify.app/]

## GitHub

[Add your repo link here]

---
