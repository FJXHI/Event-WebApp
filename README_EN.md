# Event WebApp  

[README in Deutsch](README.md)

This is a **modern web app** for displaying festival and event information, developed with **Vue.js**.  
The app allows users to explore the schedule, artists, and stages and save their favorites.  

## 🚀 Features  
- **Timetable** – Displays all performances with filtering options (genre, stage, artist)  
- **Favorites Function** – Save acts, stages, and performances as favorites  
- **Multilingual Support** – Multiple languages supported via `vue-i18n`  
- **Event Detail View** – Shows detailed information about each performance  
- **Configurable Event Data** – Titles, images, and additional info via JSON  
- **Configurable Performances** – Manage line-up and stage info flexibly with JSON  

### 🏗️ Planned Features  
- **Interactive Map** – Visually display stage locations  
- **Advanced Filters** – Combine multiple filters at once – Revamp filter menu  

## 🛠️ Installation & Setup  

### 1️⃣ Requirements  
- [Node.js](https://nodejs.org/) installed  
- [Vue CLI](https://cli.vuejs.org/) or [Vite](https://vitejs.dev/)  

### 2️⃣ Installation  
```sh
# Clone repository
git clone https://github.com/FJXHI/Event-WebApp
cd Event-WebApp

# Install dependencies
npm install
```  

### 3️⃣ Start Development  
```sh
npm run dev
```  
The app will now be available at [`http://localhost:5173/Event-WebApp`](http://localhost:5173/).  

### 4️⃣ Build for Production  
```sh
npm run build
```  

[More information on Vue setup with pnpm](Vue-Setup.md)  

## 📁 Project Structure  
```
📦 Event-WebApp
├── 📂 public          # Static files
│   ├── 📂 data        # Configurable JSON data (event info, line-up, stages)
│   ├── 📂 images      # Event and artist images
├── 📂 src
│   ├── 📂 components  # Reusable Vue components
│   ├── 📂 views       # App pages (timetable, artists, favorites)
│   ├── 📂 router      # Vue router configuration
│   ├── 📂 store       # State management with Pinia
│   ├── 📂 assets      # Styles and icons
│   ├── App.vue        # Main component
│   ├── i18n.ts        # Language management
│   ├── main.ts        # App entry point
│   ├── useEventData.ts # Load data from JSON
├── package.json       # Dependencies & scripts
└── README.md          # Documentation
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
Apache License 2.0 © 2025 FJXHI  

---

> **Note:** The English documentation may be outdated, as it is currently only maintained in German. [German README](README.md)

---