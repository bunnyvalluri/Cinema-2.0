# Technical Requirement Document (TRD) - CINEMA ELK 2.0

## 1. System Requirements
- Node.js >= 18.0.0
- NPM >= 9.0.0
- Modern Web Browsers: Chrome, Firefox, Edge, Safari, Opera

## 2. Frontend Specifications
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v3 with glassmorphism utility classes
- **State**: React Context API (`AuthContext`, `ThemeContext`, `MovieContext`)
- **Animation**: Framer Motion
- **Sliders**: SwiperJS
- **Charts**: Chart.js & react-chartjs-2

## 3. Backend Specifications
- **Runtime**: Node.js ES Modules
- **Framework**: Express.js
- **Auth**: Firebase Admin SDK & JWT Bearer Token
- **Security**: Helmet, CORS, Morgan, Express Rate Limit, Bcrypt
