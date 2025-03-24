# Event WebApp  

🌐
[Deutsch][DE],
[English][EN]

[DE]:Translations/README.de.md
[EN]:README.md

A **modern web app** for displaying festival and event information, developed with **Vue.js**. The app allows users to explore the schedule, artists, and stages and save their favorites. 

Check it out: [fjxhi.github.io/Event-WebApp/](https://fjxhi.github.io/Event-WebApp/)

## 🚀 Features
- **🕒 Timetable** – Displays all performances with filtering options (tags (genre)).
- **⭐ Favorites Function** – Allows users to save acts, stages, and performances as favorites.
- **ℹ️ Detail Views** – Provides detailed information about each performance, stage, and act.  
- **📱 PWA Support** – The web app is available as a Progressive Web App (PWA), enabling offline functionality and a native app-like experience.  
- **📲 Optimized for Mobile Devices** – Features a user-friendly design with an interface optimized for smartphones and smooth navigation.
- **🌍 Multilingual Support** – Supports multiple languages via [`vue-i18n`](https://github.com/intlify/vue-i18n).  
- **⚙️ Configurable Event Info** – The event title, image, and additional details can be flexibly managed via JSON. 
- **🎭 Configurable Performance** – Easily update and customize the lineup and stage information through JSON.

### 🏗️ Planned Features 
- **🗺️ Interactive Map** – Visually display stage locations.  
- **🎛️ Advanced Filters** – Combine multiple filters at once.  
- **🎨 Configurable Color Theme** – Customize the app's appearance with adjustable color themes.  
- **🌙 Enhanced Dark Mode** – Improved dark mode for better readability and aesthetics.  
- **🔍 Search** – Search for acts, stages, and performances.  
- **📆 Calendar Export** – Export performances to a personal calendar.  

## 🛠️ Installation & Setup  

### 1️⃣ Requirements  
- [Node.js](https://nodejs.org/) installed  
- [Vue CLI](https://cli.vuejs.org/) or [Vite](https://vitejs.dev/)  

### 2️⃣ Installation  
```sh
# Clone repository
git clone https://github.com/FJXHI/Event-WebApp
cd Event-WebApp/Event-WebApp

# Install dependencies
npm install
```  

### 3️⃣ Start Development  
```sh
npm run dev
```  
The app will now be available at [`http://localhost:5173/Event-WebApp`](http://localhost:5173/Event-WebApp).
### 4️⃣ Build for Production  
```sh
npm run build
```  

## 🔗 API & Data Sources  
The app uses JSON files for event data:  
- **`/data/eventInfo.json`** → Contains event metadata  
- **`/data/performances.json`** → All performances  
- **`/data/stages.json`** → Stage information  
- **`/data/acts.json`** → Artist data  

## 🌍 Multilingual Support  
Multiple languages are supported via **vue-i18n**. Language files are located in `src/locales/`.

## 👥 Contributing  
Pull requests and suggestions are welcome! Create an issue for bugs or feature requests.  

## 📝 License  
[Apache License 2.0](LICENSE) © 2025 [FJXHI](https://github.com/FJXHI)
