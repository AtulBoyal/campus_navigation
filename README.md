# 🗺️ IITH Maps – Smart Campus Navigation System

A web-based navigation platform designed to help students, visitors, and staff navigate the IIT Hyderabad campus efficiently.

Built during **Lambda Hackathon 2025** organized by the Web & App Development Club (WADC), IIT Hyderabad, where the project secured **🥇 1st Place Overall**.

---

## 🚀 Live Demo

**Frontend:** https://iith-maps-campus-navigation.vercel.app/

**GitHub Repository:** https://github.com/AtulBoyal/campus_navigation

---

## 📖 Problem Statement

Navigating a large university campus can be challenging, especially for freshmen and visitors.

During our initial days at IIT Hyderabad, many buildings either lacked clear name boards or were difficult to locate. Finding destinations often required asking nearby seniors for directions.

To solve this problem, we built **IITH Maps**, a lightweight campus navigation system that provides:

* Interactive campus map visualization
* Building information
* Shortest route navigation
* Searchable destination selection
* Mobile-friendly navigation experience

---

## ✨ Features

### Navigation

* Interactive IIT Hyderabad campus map
* Route generation between campus locations
* Automatic route visualization
* Distance estimation
* Estimated walking time

### Search

* Searchable source selection
* Searchable destination selection
* Swap source and destination locations
* Input validation

### Map Experience

* Building markers with metadata
* Building categories and descriptions
* GeoJSON-based campus rendering
* Route auto-focus and zoom

### User Experience

* Responsive design
* Mobile-friendly route panel
* Expandable/collapsible navigation panel
* Clean modern interface

---

## 🏗️ Architecture

Frontend (React + Leaflet)
│
▼
Backend API (Express.js)
│
▼
Campus Map Dataset (JSON)
│
▼
Routing Engine (Leaflet Routing Machine + OSRM)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Leaflet
* Leaflet
* React Select
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js

### Mapping

* OpenStreetMap
* Leaflet Routing Machine
* GeoJSON

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```bash
campus_navigation/
│
├── public/
│   └── data/
│       ├── buildings.geojson
│       └── paths.geojson
│
├── server/
│   ├── routes/
│   ├── data/
│   │   └── campusMap.json
│   └── app.js
│
├── src/
│   ├── components/
│   │   ├── CampusMap.jsx
│   │   ├── FromToCard.jsx
│   │   ├── Routing.jsx
│   │   └── RouteInfoCard.jsx
│   │
│   └── config/
│       └── campusConfig.js
│
└── README.md
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/AtulBoyal/campus_navigation.git
cd campus_navigation
```

### Install Dependencies

```bash
npm install
```

### Frontend Environment Variables

Create a `.env` file:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Start Backend

```bash
cd server
npm install
node app.js
```

### Start Frontend

```bash
npm start
```

---

## 🌟 Future Improvements

* Real-time GPS navigation inside campus
* Indoor navigation support
* Accessibility-aware routing
* Multi-stop route planning
* Department-wise building search
* Dark mode support
* Campus event integration
* Emergency services routing

---

## 🏆 Achievement

🥇 **1st Place – Lambda Hackathon 2025**

Organized by the Web & App Development Club (WADC), IIT Hyderabad.

---

## 👥 Team

* Atul Boyal
* Akshat Banzal

Built at IIT Hyderabad to make campus navigation easier for students and visitors.
