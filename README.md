# Event WebApp  

[README in English](README_EN.md)

Dies ist eine **moderne WebApp** zur Anzeige von Festival- und Event-Informationen, entwickelt mit **Vue.js**.  
Die App ermöglicht es den Nutzern das Programm, Künstler und Bühnen zu entdecken und ihre Favoriten speichern.  

## 🚀 Features  
- **Timetable** – Zeigt alle Performances mit Filteroptionen (Genre, Bühne, Künstler)  
- **Favoriten-Funktion** – Speichert Acts, Bühnen und Auftritte als Favoriten  
- **Mehrsprachigkeit** – Unterstützung für mehrere Sprachen mit `vue-i18n`  
- **Event-Detailansicht** – Zeigt ausführliche Informationen zu jeder Performance  
- **Konfigurierbare Event-Daten** – Titel, Bilder und Zusatzinfos via JSON  
- **Konfigurierbare Auftritte** – Line-up und Bühneninfos flexibel per JSON verwalten  

### 🏗️ Geplante Features  
- **Interaktive Karte** – Bühnenstandorte visuell darstellen  
- **Erweiterte Filter** – Mehrere Filter gleichzeitig kombinieren – Filter-Menü überarbeiten 

## 🛠️ Installation & Setup  

### 1️⃣ Voraussetzungen  
- [Node.js](https://nodejs.org/) installiert  
- [Vue CLI](https://cli.vuejs.org/) oder [Vite](https://vitejs.dev/)  

### 2️⃣ Installation
```sh
# Repository klonen
git clone https://github.com/FJXHI/Event-WebApp
cd Event-WebApp

# Abhängigkeiten installieren
npm install
```  

### 3️⃣ Entwicklung starten  
```sh
npm run dev
```  
Die App läuft nun unter [`http://localhost:5173/Event-WebApp`](http://localhost:5173/).  

### 4️⃣ Produktion builden  
```sh
npm run build
```  

[Weitere Informationen zum VUE Setup mit pnpm](Vue-Setup.md)


## 📁 Projektstruktur  
```
📦 Event-WebApp
├── 📂 public          # Statische Dateien
│   ├── 📂 data        # Konfigurierbare JSON-Daten (Event-Infos, Line-up, Bühnen)
│   ├── 📂 images      # Event- und Künstlerbilder
├── 📂 src
│   ├── 📂 components  # Wiederverwendbare Vue-Komponenten
│   ├── 📂 views       # Seiten der App (Timetable, Künstler, Favoriten)
│   ├── 📂 router      # Vue-Router-Konfiguration
│   ├── 📂 store       # Zustandsspeicherung mit Pinia
│   ├── 📂 assets      # Styles und Icons
│   ├── App.vue         # Hauptkomponente
│   ├── i18n.ts         # Sprachverwaltung
│   ├── main.ts         # Einstiegspunkt der App
│   ├── useEventData.ts # Daten aus JSON laden
├── package.json        # Abhängigkeiten & Skripte
└── README.md           # Dokumentation
```  

## 🔗 API & Datenquellen  
Die App nutzt JSON-Dateien für die Event-Daten:  
- **`/data/eventInfo.json`** → Enthält Event-Metadaten  
- **`/data/performances.json`** → Alle Performances  
- **`/data/stages.json`** → Infos zu Bühnen  
- **`/data/acts.json`** → Künstlerdaten  

## 🌍 Mehrsprachigkeit  
Mehrere Sprachen werden mit **vue-i18n** unterstützt. Sprachdateien befinden sich in `src/locales/`.  

## 👥 Mitwirken  
Pull Requests und Vorschläge sind willkommen! Erstelle ein Issue für Fehler oder Feature-Anfragen.

## 📝 Lizenz  
Apache License 2.0 © 2025 FJXHI  