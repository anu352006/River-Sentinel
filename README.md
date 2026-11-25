# 🌊 RiverSentinel: Smart AI & IoT System for River Ecosystem Monitoring

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-000000?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikitlearn)](https://scikit-learn.org/)
[![Firebase](https://img.shields.io/badge/Firebase-RTDB-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.2%20Vision%20%7C%203.3-f55036?style=for-the-badge)](https://groq.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS%20Mapping-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)
[![Arduino](https://img.shields.io/badge/Arduino%20%2F%20ESP32-IoT-00979D?style=for-the-badge&logo=arduino)](https://www.arduino.cc/)

> **RiverSentinel** is a geospatially-intelligent environmental surveillance, flood forecasting, and water quality intelligence platform. Combining IoT sensor hardware, satellite and hydrological telemetry, computer vision pollution detection, and machine learning models, RiverSentinel bridges citizen reporting with environmental authority governance.
>
> 🚀 **Live Production Deployment**: [https://river-sentinel-ai.vercel.app](https://river-sentinel-ai.vercel.app) (Mirror: [river-sentinel-portal.vercel.app](https://river-sentinel-portal.vercel.app))
> ⚡ **Cloud Backend API**: [https://backend-three-roan-26.vercel.app](https://backend-three-roan-26.vercel.app)

---

## 📌 Table of Contents

- [Overview & Regional Scope](#-overview--regional-scope)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
  - [1. Real-Time IoT Sensor Telemetry](#1-real-time-iot-sensor-telemetry)
  - [2. Machine Learning & Predictive Analytics](#2-machine-learning--predictive-analytics)
  - [3. AI Vision Optical Pollution Analysis](#3-ai-vision-optical-pollution-analysis)
  - [4. Dual-Role Command Portals](#4-dual-role-command-portals)
  - [5. Geospatial Flood Susceptibility GIS Viewer](#5-geospatial-flood-susceptibility-gis-viewer)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup-python--flask)
  - [Frontend Setup](#2-frontend-setup-nextjs--react)
  - [Arduino / ESP32 Firmware](#3-arduino--esp32-iot-setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌍 Overview & Regional Scope

River ecosystems face compounding risks from industrial effluent discharge, illegal solid waste dumping, and flash flood events triggered by erratic monsoon precipitation. **RiverSentinel** addresses this through real-time environmental telemetry, AI-driven optical verification, and automated municipal emergency broadcasts.

The system features localized monitoring configurations tailored for the **Cauvery Delta and South Indian Ghats** network, monitoring key monitoring ghats and riverbanks:
- **Kooduthurai – Erode** *(Bhavani–Cauvery Sangam)*
- **Amma Mandapam Ghat – Srirangam, Trichy**
- **Mayiladuthurai River Ghats** *(Cauvery Delta)*
- **Papanasam Ghat – Tirunelveli** *(Thamirabarani River)*
- **Grand Anicut / Kallanai – Trichy**
- **Adayar River Bank Basins – Chennai**
- **Kumbakonam & Thiruvayaru Ghats – Thanjavur**
- **Kodumudi Ghat – Erode**

---

## 🏛️ System Architecture

```
                          +------------------------------------------+
                          |        Physical River Monitoring         |
                          | (ESP32/Arduino + Ultrasonic + Turbidity  |
                          |   + pH + Temperature + DO Probes)        |
                          +--------------------+---------------------+
                                               |
                                     (WiFi / 4G / Serial)
                                               v
                          +--------------------+---------------------+
                          |        Firebase Realtime Database        |
                          |      (Sensor Telemetry & Data Store)     |
                          +--------------------+---------------------+
                                               |
                                               v
             +---------------------------------+---------------------------------+
             |                                                                   |
             v                                                                   v
+----------------------------+                                      +----------------------------+
|    Python Flask Backend    |                                      |   Next.js 16 Frontend App  |
|  - Random Forest ML Models | <======== REST API / Proxies ======> |  - Citizen Safety Portal   |
|  - Water Quality Classifier|                                      |  - Authority Command Hub   |
|  - Groq Llama 3.2 Vision   |                                      |  - Leaflet GIS Flood Map   |
|  - Groq Llama 3.3 Chatbot  |                                      |  - Real-Time Live Gauges   |
|  - ReportLab PDF Engine    |                                      |  - SMS Broadcast Dispatch  |
+----------------------------+                                      +----------------------------+
```

---

## 🌟 Key Features

### 1. Real-Time IoT Sensor Telemetry
- Multi-parameter water quality monitoring:
  - **pH Level** (0–14 scale)
  - **Turbidity** (NTU optical sensor)
  - **Dissolved Oxygen (DO)** (mg/L)
  - **Biological Oxygen Demand (BOD)** & **Chemical Oxygen Demand (COD)**
  - **Electrical Conductivity (EC)** (µS/cm)
  - **Water Surface Elevation & Discharge** (cumec calculations)
- Sensor data bridge via Arduino / ESP32 sketches directly writing to Firebase Realtime Database.

### 2. Machine Learning & Predictive Analytics
- **Water Potability Classifier**: Scikit-learn model trained on physicochemical indicators classifying river water potability and computing a 0–100% Water Health Score.
- **Flood Susceptibility Model**: Machine learning pipeline predicting flood risk probabilities (**LOW**, **MODERATE**, **HIGH**) in real-time by correlating live river stage, discharge rates, local precipitation, and upstream watershed rainfall.

### 3. AI Vision Optical Pollution Analysis
- Powered by **Groq Llama 3.2 Vision (11B)**.
- Citizens snap river photos; the AI model performs automated optical inspection to detect:
  - Floating solid waste, plastics, and debris
  - Chemical slick, discoloration, and industrial discharge
  - Macro-algal blooms and severe turbidity
- Automatically generates severity classifications and forensic descriptions for authorities.

### 4. Dual-Role Command Portals

#### 👤 Citizen Portal
- **Safety Checker**: Instant check on swimming, bathing, and domestic usage safety across all monitored ghats.
- **Weather & Flood Forecast**: 24-hour localized rainfall probability, monsoon statuses, and nearest emergency shelter routing with Google Maps navigation.
- **Report Pollution**: Geotagged image submission with instant AI visual analysis and incident tracking.
- **Civic Rewards System**: Citizen scorecards and incentive points for verified pollution submissions.
- **Multilingual AI Assistant**: Context-aware river conservation chatbot powered by Llama 3.3.

#### 🛡️ Authority Command Center
- **Incident Moderation Hub**: Real-time triage with instant **Verify** and **Reject** status workflows with zero-latency UI updates.
- **Regional Station Analytics**: Cross-station comparative charts (pH vs. Turbidity, Water Quality Indexes, temporal trends).
- **A4 PDF Report Generation**: One-click official compliance report generation formatted for municipal boards (e.g., TNPCB) with print-to-PDF layout scaling.
- **Targeted SMS Alert Broadcasts**: Emergency broadcast console sending localized SMS alerts to specific audience tiers (all citizens, farmers, riverside communities within 5 km).

### 5. Geospatial Flood Susceptibility GIS Viewer
- High-resolution GIS web mapping integration using Leaflet.js and QGIS exports.
- Multi-layer toggle overlays:
  - Digital Elevation Model (DEM) Hillshade
  - Primary River Channel Vectors
  - Stream Network Density Contours
  - Dynamic Flood Susceptibility Risk Zones

---

## 📁 Repository Structure

```
River-Sentinel/
├── .gitignore                    # Comprehensive root ignore rules
├── README.md                     # Project documentation
├── start-backend.ps1             # PowerShell script to launch Flask backend
├── start-frontend.ps1            # PowerShell script to launch Next.js frontend
│
├── arduino/                      # Embedded IoT Sensor Hardware
│   └── firebase_sensor_upload.ino# ESP32/Arduino firmware for telemetry
│
├── backend/                      # Python Flask Backend & ML Engine
│   ├── app.py                    # Main Flask REST API & service routes
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # Template environment configuration
│   ├── flood_model.pkl           # Trained Random Forest flood model
│   ├── flood_scaler.pkl          # Feature standardizer for flood predictor
│   ├── water_quality_model.pkl   # Trained water quality classifier
│   ├── water_quality_scaler.pkl  # Scaler for water quality features
│   ├── train_flood_model.py      # Flood prediction training pipeline
│   ├── serial_bridge.py          # Serial-to-cloud hardware bridge
│   ├── simulate_sensors.py       # Mock sensor data generator for testing
│   ├── flood_model/              # Supplemental model files & training data
│   │   ├── flood_data_with_dynamic_labels.csv
│   │   └── model.pkl
│   └── ml_models/                # Model artifacts backup
│
└── frontend/                     # Next.js 16 + React 19 Frontend
    ├── package.json              # NPM dependencies and scripts
    ├── tsconfig.json             # TypeScript compiler options
    ├── next.config.ts            # Next.js server configuration & proxy rules
    ├── .env.example              # Frontend environment template
    ├── public/                   # Static assets & GIS map engine
    │   └── flood-map/            # Leaflet QGIS interactive flood map suite
    └── src/
        ├── app/                  # Next.js App Router pages
        │   ├── page.tsx          # Landing page
        │   ├── login/            # Authentication
        │   ├── signup/           # User registration wizard
        │   ├── citizen-dashboard/# Citizen monitoring portal
        │   └── authority-dashboard/# Municipal command portal
        ├── components/           # UI components
        │   ├── dashboard/        # Dashboard widgets & interactive tools
        │   │   ├── CommandCenter.tsx
        │   │   ├── ReportPollution.tsx
        │   │   ├── SafetyChecker.tsx
        │   │   ├── WeatherAndFlood.tsx
        │   │   ├── ManageReports.tsx
        │   │   ├── AuthorityAnalytics.tsx
        │   │   ├── GenerateReports.tsx
        │   │   ├── SendSMSAlerts.tsx
        │   │   ├── AIChatbot.tsx
        │   │   ├── FloodMapViewer.tsx
        │   │   └── LiveSensorData.tsx
        │   ├── HeroSection.tsx
        │   ├── Navbar.tsx
        │   └── WaveBackground.tsx
        └── services/             # Firebase & client-side API integrations
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher) & **npm**
- **Python** (v3.9 or higher) & **pip**
- *(Optional)* **Arduino IDE** for flashing microcontroller firmware

---

### 1. Backend Setup (Python & Flask)

1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # Windows PowerShell
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your environment file:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to include your `GROQ_API_KEY`, `FIREBASE_DATABASE_URL`, and optional keys (see [Environment Variables](#-environment-variables)).*
5. Start the Flask API:
   ```bash
   python app.py
   ```
   *The backend will run on `http://127.0.0.1:5000`.*

---

### 2. Frontend Setup (Next.js & React)

1. Open a new terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Copy environment template if customizing API proxy:
   ```bash
   cp .env.example .env.local
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
5. Open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

### 3. Arduino / ESP32 IoT Setup

1. Open `arduino/firebase_sensor_upload.ino` in the **Arduino IDE**.
2. Install the required board packages (`esp32` by Espressif) and libraries:
   - `FirebaseESP32`
   - `OneWire` & `DallasTemperature`
   - `WiFi`
3. Configure your WiFi credentials (`WIFI_SSID`, `WIFI_PASSWORD`) and Firebase parameters (`FIREBASE_HOST`, `FIREBASE_AUTH`).
4. Select your board and port, then click **Upload**.

---

### ⚡ Quick Launch Scripts (Windows)

For convenience, you can launch the servers simultaneously using the included PowerShell scripts:

```powershell
# In terminal 1 (starts backend)
.\start-backend.ps1

# In terminal 2 (starts frontend)
.\start-frontend.ps1
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Required | Default |
| :--- | :--- | :---: | :--- |
| `PORT` | Flask server listening port | No | `5000` |
| `FIREBASE_DATABASE_URL` | URL of Firebase Realtime Database | Yes | `https://your-rtdb.firebaseio.com/` |
| `FIREBASE_SECRET` | Database secret or token | No | `""` |
| `GROQ_API_KEY` | Groq key for Llama 3.2 Vision & 3.3 Chatbot | Yes | `""` |
| `OPENAI_API_KEY` | Optional OpenAI API Key fallback | No | `""` |
| `OPENWEATHER_API_KEY` | Key for real-time live precipitation telemetry | No | `""` |

### Frontend (`frontend/.env.local`)

| Variable | Description | Required | Default |
| :--- | :--- | :---: | :--- |
| `NEXT_PUBLIC_BACKEND_URL` | Backend URL or internal proxy route | No | `/api/proxy` or `http://127.0.0.1:5000` |

---

## 📡 API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status and root endpoint catalog |
| `GET` | `/api/health` | Health-check endpoint returning server status |
| `POST` | `/api/ai/chat` | Multilingual environmental chatbot query |
| `POST` | `/api/ai/analyze-image` | Optical pollution inspection via Groq Llama 3.2 Vision |
| `GET` | `/api/flood/predict` | Real-time flood risk inference using Random Forest ML |
| `GET` | `/api/water-quality/predict` | Physicochemical water potability and quality scoring |
| `GET` | `/api/weather` | Current weather and precipitation indicators |
| `POST` | `/api/reports/submit` | Submit citizen pollution report with image & coordinates |
| `GET` | `/api/reports/all` | Fetch all submitted reports for authority review |
| `POST` | `/api/reports/update-status` | Update report moderation status (`VERIFIED` / `REJECTED`) |
| `POST` | `/api/reports/generate-pdf` | Generate formal A4 compliance PDF report |

---

## 📱 User Portals & Interface Highlights

- **Citizen Dashboard**: Access at `/citizen-dashboard` to explore water safety levels, submit pollution images with automated AI verification, check flood forecasts, and talk with the AI assistant.
- **Authority Dashboard**: Access at `/authority-dashboard` to manage incoming citizen reports, review AI diagnostics, inspect regional sensor trends, generate official PDF reports, and send emergency SMS broadcasts.

---

## 🤝 Contributing

Contributions to improve RiverSentinel are welcome! Whether adding new hydrological ML models, sensor drivers, or UI enhancements:

1. Fork the Project
2. Create your Feature Branch:
   ```bash
   git checkout -b feature/NewFeature
   ```
3. Commit your Changes:
   ```bash
   git commit -m "Add new environmental monitoring feature"
   ```
4. Push to the Branch:
   ```bash
   git push origin feature/NewFeature
   ```
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  <b>RiverSentinel</b> — Safeguarding Rivers, Protecting Communities through Environmental AI.
</p>
