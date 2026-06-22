# 🗺️ Campus Navigation App for IIT Hyderabad

A smart, interactive web app to help you navigate the IIT Hyderabad campus with ease.

Built by **Atul Boyal** and **Akshat Banzal**, this application allows users to select any two locations within the IITH campus and view the best walking/driving route between them using an interactive map powered by **OpenStreetMap** and **Leaflet Routing Machine**.

---

## 🚀 Features

- 🔍 Search for routes between any two campus locations  
- 🗺️ Interactive map with real-time, step-by-step navigation  
- 🎯 Only shows relevant campus landmarks—no clutter  
- ⚡ Super fast—no page reloads for new routes  
- ✏️ Easily add new locations via a simple JSON file  
- 💻 Built with **React**, **Tailwind CSS**, and **Leaflet**

---

## 🛠️ How to Run This Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/AtulBoyal/campus_navigation.git
   cd campus_navigation
2. **Install dependencies: npm install**
Start the frontend:
    ```bash
    npm start
3. **Start the backend:**
    ```bash
    node server/app.js
    
- The app runs at http://localhost:3000 
- The backend runs at http://localhost:5000

The website is deployed at: **https://campus-navigation-henna.vercel.app/**

## 💡 How Does Routing Work? 

- Uses Leaflet Routing Machine with OpenStreetMap data—so the route follows real campus roads and paths. 
- Only one route and set of directions is ever shown (no leftovers from previous searches).

Made with ❤️ by Atul & Akshat for the IITH community.
