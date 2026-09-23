# Render Deployment Guide — ExpertLens AI

This guide walks you through deploying **ExpertLens AI** (FastAPI Backend + React Frontend) onto [Render](https://render.com).

---

## Method 1: Automatic 1-Click Deployment (Recommended via `render.yaml`)

We have included a `render.yaml` Blueprint in the root directory that automatically configures and connects both the **Backend Web Service** and **Frontend Static Site**.

### Steps:
1. **Push your code to GitHub / GitLab**.
2. Log in to [Render Dashboard](https://dashboard.render.com).
3. Click **"New +"** in the top-right corner and select **"Blueprint"**.
4. Connect your Git repository.
5. Render will automatically detect `render.yaml` and configure:
   - **`expertlens-ai-backend`**: Python FastAPI Web Service (Free Tier)
   - **`expertlens-ai-frontend`**: React Static Site (Free Tier) with automatic SPA routing rewrites
6. *(Optional)* Under environment variables, add your `LLM_API_KEY` (e.g. OpenAI key). If left empty, the deterministic ground-truth engine will run autonomously!
7. Click **"Apply"** — Render will build and deploy both services automatically!

---

## Method 2: Manual Dashboard Setup

If you prefer to configure the services manually in the Render dashboard:

### 1. Deploy the Backend (Web Service)
1. In Render Dashboard, click **New +** → **Web Service**.
2. Connect your Git repository.
3. Configure the following settings:
   - **Name**: `expertlens-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`
4. Under **Environment Variables**, add:
   - `PYTHON_VERSION`: `3.11.9`
   - `ENVIRONMENT`: `production`
   - `LLM_API_KEY`: *(Optional)*
5. Click **Create Web Service**.
6. Copy your backend URL once deployed (e.g., `https://expertlens-backend.onrender.com`).

---

### 2. Deploy the Frontend (Static Site)
1. In Render Dashboard, click **New +** → **Static Site**.
2. Connect the same Git repository.
3. Configure the following settings:
   - **Name**: `expertlens-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: Paste your backend URL from Step 1 (e.g., `https://expertlens-backend.onrender.com`)
5. Under **Redirects/Rewrites**, add a rewrite rule for Single-Page Applications:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
6. Click **Create Static Site**.

---

## Method 3: Unified Single-Instance Deployment (All-in-One Free Web Service)

If you wish to host both Frontend and Backend together in a single Free Render Web Service:

1. In Render Dashboard, click **New +** → **Web Service**.
2. Configure:
   - **Name**: `expertlens-all-in-one`
   - **Root Directory**: `.` (leave empty / repository root)
   - **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. The FastAPI app will automatically detect `frontend/dist` and serve both the API endpoints and the React dashboard from a single URL!

---

## Verification & Health Check

Once deployed, visit your Render URL:
- **Frontend Dashboard**: `https://<your-frontend-subdomain>.onrender.com`
- **Backend API Root**: `https://<your-backend-subdomain>.onrender.com/`
- **Interactive Swagger Docs**: `https://<your-backend-subdomain>.onrender.com/docs`
