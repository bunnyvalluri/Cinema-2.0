# CINEMA ELK 2.0 🎬

> Enterprise-Grade Movie Discovery, Review, Recommendation, and Cinephile Community Platform.

![Cinema Elk 2.0 Banner](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80)

## Overview

CINEMA ELK 2.0 is a modern full-stack web application engineered for film lovers, critics, and production studios. Powered by **React (Vite)**, **Tailwind CSS**, **Framer Motion**, **SwiperJS**, **Chart.js**, **Express.js**, **Firebase**, and **TMDB API**, Cinema Elk 2.0 combines live streaming metadata with community interaction.

---

## Technical Stack

- **Frontend**: React 18, Vite, Tailwind CSS v3, Framer Motion, SwiperJS, Chart.js, React Hook Form, React Context API, React Hot Toast, React Icons.
- **Backend**: Node.js, Express.js, JWT Authentication, Firebase Admin SDK, Helmet, CORS, Morgan, Express Validator, Express Rate Limit, Bcrypt.
- **Database & Storage**: Firebase Firestore, Firebase Authentication, Firebase Storage, Firebase Cloud Messaging.
- **Movie Data Provider**: TMDB REST API v3 with automatic fallback dataset resilience.

---

## Folder Structure

```
movie-recomm/
├── frontend/             # Vite + React + Tailwind + Framer Motion Frontend
├── backend/              # Node.js + Express + JWT + Security Backend
├── firebase/             # Firestore Security Rules, Storage Rules & Indexes
├── docs/                 # Platform Documentation Suite (PRD, TRD, API, Security)
└── README.md
```

---

## Quick Start Guide

### 1. Install Frontend Dependencies & Start Dev Server
```bash
cd frontend
npm install
npm run dev
```

### 2. Install Backend Dependencies & Start Server
```bash
cd backend
npm install
npm run dev
```

Visit the app live in your browser at `http://localhost:3000`.

---

## Key Features

- **Live Movie Engine**: TMDB powered discovery for Trending, Popular, Top Rated, Now Playing, and Upcoming releases.
- **Glassmorphism UI System**: Premium dark/light themes with micro-animations and custom color tokens.
- **Interactive Review & Rating System**: 5-star & half-star ratings, markdown reviews, like threads, and star distribution charts.
- **Personalized Watchlist & Favorites**: Persistent state sync across client and server.
- **Enterprise Admin Console**: Interactive Chart.js visual analytics, user RBAC management, and moderation report handling.
- **Security First**: Helmet protection, CORS, Rate Limiting, JWT Bearer verification, and strict Firestore Security Rules.

---

## Documentation

Full architectural specifications and deployment guidelines are available under the [`docs/`](./docs) folder:
- [Product Requirement Document (PRD)](./docs/PRD.md)
- [Technical Requirement Document (TRD)](./docs/TRD.md)
- [System Architecture](./docs/Architecture.md)
- [Database Schema](./docs/Database.md)
- [REST API Specifications](./docs/API.md)
- [Firebase Security & Config](./docs/Firebase.md)
- [Security Policy](./docs/Security.md)
- [Deployment Guide (Vercel + Render)](./docs/Deployment.md)
- [Testing & Quality Assurance](./docs/Testing.md)
- [Product Roadmap](./docs/Roadmap.md)
- [Changelog](./docs/Changelog.md)
