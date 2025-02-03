🌦️ Weather App
A simple weather application that fetches real-time weather data using the OpenWeather API and displays it in an intuitive UI. The app allows users to search for any city and toggle between Celsius and Fahrenheit.

🚀 Instructions for Running the Project Locally
1️⃣ Clone the Repository

git clone https://github.com/your-username/weather-app.git
cd weather-app

2️⃣ Open the Project
Since it's a pure HTML, CSS, and JavaScript project, no server setup is required. Just open index.html in your browser:

Option 1: Double-click index.html
Option 2 (Recommended): Run a local server for better performance:

npx live-server
(If you don’t have live-server, install it using npm install -g live-server.)
⚙️ Technologies Used
HTML – Structure of the application
CSS – Styling & animations
JavaScript – Logic & API handling
Axios – Fetching weather data asynchronously
OpenWeather API – Provides real-time weather data
🛠️ Approach
User Input & Event Listeners

Users enter a city name, and the app fetches weather data when they click the search button or press Enter.
The temperature unit can be toggled between Celsius (°C) and Fahrenheit (°F).
Fetching Data with Axios

Used Axios instead of fetch() for cleaner syntax, automatic JSON parsing, and better error handling.
Axios fetches both current weather and 5-day forecast.
Handling API Responses

If the city is found, the app updates the UI dynamically.
If the city is not found, an error message is displayed.
Dynamic UI Updates

Weather details (temperature, humidity, wind speed, etc.) are updated dynamically.
Weather icons are displayed based on conditions (e.g., 🌧️ for rain, ☀️ for sunny).
Forecast data is displayed for the next 5 days.
⚡ Challenges Faced & Solutions Implemented
1️⃣ Switching from Fetch to Axios
Initially used fetch(), but handling errors and JSON parsing required extra steps.
Switched to Axios, which automatically parses JSON and throws errors for non-200 responses.
2️⃣ Handling API Errors
Problem: If a user enters an invalid city name, it used to crash.
Solution: Implemented try...catch in Axios calls to handle errors and display a proper error message.
3️⃣ Unit Conversion (°C ⇄ °F)
Problem: Weather API supports both metric & imperial, but we needed a dynamic toggle.
Solution: Used a boolean isCelsius and updated API calls dynamically.
4️⃣ UI Optimization
Problem: Page was refreshing when searching.
Solution: Used event.preventDefault() to stop default form submission.
🏆 Features
✅ Search for any city's weather
✅ Toggle between °C & °F
✅ Display current weather & 5-day forecast
✅ Custom weather icons
✅ Smooth UI transitions

📌 To-Do (Future Improvements)
🔹 Add a geolocation feature to detect user’s location automatically
🔹 Improve responsive design for mobile devices
🔹 Implement dark mode






![Screenshot (208)](https://github.com/user-attachments/assets/0804d897-6664-4cc5-bdb8-712aadd7286c)
![Screenshot (209)](https://github.com/user-attachments/assets/34708673-d907-4541-882e-aa739767731b)
![Screenshot (210)](https://github.com/user-attachments/assets/f5f00839-ef03-4872-ae6b-0f1bafcdf647)



