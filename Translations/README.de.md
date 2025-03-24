# Event WebApp  

🌐
[Deutsch][DE],
[English][EN]

[DE]:README.de.md
[EN]:../README.md

Eine **moderne Web-App** zum Anzeigen von Festival- und Event-Informationen, entwickelt mit **Vue.js**. Die App ermöglicht es den Nutzern das Programm, Künstler und Bühnen zu entdecken und ihre Favoriten zu speichern.  

Entdecke die DEMO: [fjxhi.github.io/Event-WebApp/](https://fjxhi.github.io/Event-WebApp/)

## 🚀 Features 
- **🕒 Programm** – Zeigt alle Aufführungen mit Filteroptionen (Tags (Genre)).
- **⭐ Favoriten-Funktion** – Ermöglicht es den Nutzern, Acts, Bühnen und Aufführungen als Favoriten zu speichern.
- **ℹ️ Detailansichten** – Bietet detaillierte Informationen zu jeder Aufführung, Bühne und jedem Act.
- **📱 PWA-Unterstützung** – Die Web-App ist als Progressive Web App (PWA) verfügbar, was Offline-Funktionalität und ein app-ähnliches Erlebnis ermöglicht.  
- **📲 Optimiert für mobile Geräte** – Bietet ein benutzerfreundliches Design mit einer für Smartphones optimierten Benutzeroberfläche und reibungsloser Navigation.
- **🌍 Mehrsprachige Unterstützung** – Unterstützt mehrere Sprachen über [`vue-i18n`](https://github.com/intlify/vue-i18n).  
- **⚙️ Konfigurierbare Event-Infos** – Der Event-Titel, das Bild und zusätzliche Details können flexibel über JSON verwaltet werden.  
- **🎭 Konfigurierbares Programm** – Das Line-up und Bühneninfos flexibel per JSON aktualisieren.

### 🏗️ Geplante Features  
- **🗺️ Interaktive Karte** – Zeigt die Standorte der Bühnen visuell an.  
- **🎛️ Erweiterte Filter** – Mehrere Filter gleichzeitig kombinieren.  
- **🎨 Konfigurierbares Farbschema** – Anpassbares Farbthema für die App.
- **🌙 Verbesserter Darkmode** – Verbesserter Darkmode für bessere Lesbarkeit und Ästhetik.  
- **🔍 Suche** – Suchen nach Acts, Bühnen und Aufführungen.  
- **📆 Kalender-Export** – Speichern Sie Aufführungen in einem persönlichen Kalender.  

## 🛠️ Installation & Setup  

### 1️⃣ Anforderungen  
- [Node.js](https://nodejs.org/) installiert  
- [Vue CLI](https://cli.vuejs.org/) oder [Vite](https://vitejs.dev/)  

### 2️⃣ Installation  
```sh
# Repository klonen
git clone https://github.com/FJXHI/Event-WebApp
cd Event-WebApp/Event-WebApp

# Abhängigkeiten installieren
npm install
```  

### 3️⃣ Entwicklung starten  
```sh
npm run dev
```  
Die App ist nun unter [`http://localhost:5173/Event-WebApp`](http://localhost:5173/Event-WebApp) verfügbar.

### 4️⃣ Für die Produktion bauen  
```sh
npm run build
```  

## 🔗 API & Datenquellen  
Die App verwendet JSON-Dateien für Event-Daten:  
- **`/data/eventInfo.json`** → Enthält Event-Metadaten  
- **`/data/performances.json`** → Alle Aufführungen  
- **`/data/stages.json`** → Bühneninformationen  
- **`/data/acts.json`** → Künstlerdaten  

## 🌍 Mehrsprachige Unterstützung  
Mehrere Sprachen werden über **vue-i18n** unterstützt. Sprachdateien befinden sich in `src/locales/`.

## 👥 Mitwirken  
Pull-Requests und Vorschläge sind willkommen! Erstelle ein Issue für Fehler oder Feature-Anfragen.  

## 📝 Lizenz  
[Apache License 2.0](LICENSE) © 2025 [FJXHI](https://github.com/FJXHI)