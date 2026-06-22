# IITH Campus Navigator

🏆 **1st Place Winner – Lambda Hackathon 2025, IIT Hyderabad**

An interactive campus navigation platform built to help students, visitors, and freshmen navigate the IIT Hyderabad campus efficiently. The project was developed during Lambda Hackathon 2025 after observing a common problem faced by new students: many campus buildings lacked clear signboards, forcing students to repeatedly ask seniors for directions.

The platform provides landmark search, route visualization, geolocation support, and interactive campus mapping to simplify navigation across the campus.

## Live Demo

🌐 https://iith-maps-campus-navigation.vercel.app/

## GitHub Repository

📂 https://github.com/AtulBoyal/campus_navigation

---

## Motivation

During our first days on campus, finding important locations such as the Library, Lecture Hall Complex, CSE Building, Hospital, and Hostel facilities was often difficult because:

* Several buildings were not clearly labeled.
* New students were unfamiliar with campus layout.
* Directions often depended on asking nearby seniors.
* Existing map solutions were not optimized for campus-specific navigation.

To address this challenge, we built IITH Campus Navigator as a hackathon solution and secured 1st place at Lambda Hackathon 2025.

---

## Features

### Navigation

* Source and destination selection
* Route visualization on interactive maps
* Automatic route fitting and zooming
* Route recalculation support
* Current location detection

### Interactive Campus Map

* Landmark markers
* Building information popups
* GeoJSON-based building overlays
* Campus pathway visualization
* Searchable campus locations

### User Experience

* Loading states
* Error handling
* Toast notifications
* Clean and intuitive interface

### Backend Services

* REST API using Express.js
* Dynamic campus map data serving
* Production-ready CORS configuration

### Deployment

* Frontend deployed on Vercel
* Backend deployed on Render

---

## Tech Stack

### Frontend

* React.js
* React Leaflet
* Leaflet Routing Machine
* OpenStreetMap
* React Toastify

### Backend

* Express.js
* Node.js
* CORS

### Deployment

* Vercel
* Render

---

## Architecture

```text
User
  │
  ▼
React Frontend (Vercel)
  │
  ▼
Express REST API (Render)
  │
  ▼
Campus Map Dataset (JSON + GeoJSON)
```

---

## Project Structure

```text
campus_navigation/
├── src/
│   ├── components/
│   ├── config/
│   ├── data/
│   └── App.jsx
│
├── public/
│   └── data/
│
├── server/
│   ├── routes/
│   ├── data/
│   └── app.js
│
└── README.md
```

---

## Local Setup

### Frontend

```bash
npm install
npm start
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## Future Improvements

* Improved mobile responsiveness
* Walking time estimation
* Distance estimation display
* Category-based filtering
* Campus events integration
* Accessibility improvements
* Offline navigation support
* Progressive Web App (PWA) support

---

## Contributors

* Atul Boyal
* Akshat Banzal

---

## Achievement

🏆 Winner (1st Place) – Lambda Hackathon 2025, IIT Hyderabad

Built as a practical solution to improve campus navigation and onboarding experience for new students and visitors.
