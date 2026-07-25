# Deployment Guide - CINEMA ELK 2.0

## Frontend → Vercel Deployment

1. Connect GitHub repository to Vercel.
2. Select Root Directory: `frontend`
3. Framework Preset: `Vite`
4. Configure Environment Variables:
   - `VITE_TMDB_API_KEY`
   - `VITE_TMDB_READ_TOKEN`
   - `VITE_BACKEND_URL`

## Backend → Render Deployment

1. Create a Web Service on Render.
2. Select Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Configure Environment Variables:
   - `PORT=5000`
   - `JWT_SECRET`
   - `TMDB_API_KEY`
   - `TMDB_READ_TOKEN`
