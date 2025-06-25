Campus Navigation App for IIT Hyderabad

This is a campus navigation web app built by "AKSHAT BANZAL and ATUL BOYAL" for IITH (IIT Hyderabad). 
It lets you pick any two places on campus and shows you the best route and directions on a map. It uses OpenStreetMap data, React, and Leaflet Routing Machine for real-world navigation.


Features:-
• Search for routes between any two locations on the IITH campus
• See the path and step-by-step directions on an interactive map
• Only shows the locations you actually care about (no clutter)
• Super fast—no need to refresh the page for new routes
• Easy to add new places (just edit a JSON file)
• Modern UI (React + Tailwind + Leaflet)


🛠️ How to Run This Project
1. Clone the repo:       git clone https://github.com/AtulBoyal/campus_navigation.git
                         cd campus_navigation
2. Install dependencies: npm install
4. Start the frontend:   npm start
3. Start the backend:    node server/app.js

• The app runs at http://localhost:3000
• The backend runs at http://localhost:5000


💡 How Does Routing Work?
    • Uses Leaflet Routing Machine with OpenStreetMap data—so the route follows real campus roads and paths.
    • Only one route and set of directions is ever shown (no leftovers from previous searches).


Made with ❤️ for IITH campus navigation.