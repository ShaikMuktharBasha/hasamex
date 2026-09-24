# Instructions to Run ExpertLens AI Locally

This guide provides step-by-step instructions to set up and run both the **FastAPI Backend** and the **React (Vite) Frontend** on your local machine.

---

## 📋 System Prerequisites

Before starting, ensure you have the following installed on your machine:

- **Python**: `3.10` or higher ([Download Python](https://www.python.org/downloads/))
- **Node.js**: `18.x` or higher & **npm** ([Download Node.js](https://nodejs.org/))
- **Git**: ([Download Git](https://git-scm.com/))
- *(Optional)* **Docker & Docker Compose**: ([Download Docker Desktop](https://www.docker.com/products/docker-desktop/))

---

## 🚀 Option 1: Standard Local Setup (Recommended)

Follow these steps to run the Backend and Frontend in separate terminal windows.

---

### Step 1: Clone or Navigate to the Repository

Open your terminal or command prompt:

```bash
git clone https://github.com/ShaikMuktharBasha/hasamex.git
cd hasamex
```

---

### Step 2: Start the Backend (FastAPI)

1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows (PowerShell / Command Prompt):**
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. *(Optional)* Configure Environment Variables:
   ```bash
   # Copy the example environment file
   cp .env.example .env    # On Linux / macOS / Git Bash
   # OR on Windows CMD: copy .env.example .env
   ```
   > **Note:** An LLM API key is **optional**. ExpertLens AI includes a built-in deterministic grounding and semantic vector engine that works out-of-the-box without requiring an external OpenAI API key.

5. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Verify the Backend:**
   - Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)
   - Interactive Swagger API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Step 3: Start the Frontend (React + Vite + TypeScript)

1. Open a **new terminal** window and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   - Open your browser and navigate to: **[http://localhost:5173](http://localhost:5173)**

---

## 🐳 Option 2: Run with Docker Compose (Single Command)

If you have Docker Desktop installed, you can launch both the backend and frontend simultaneously with a single command:

1. From the project root directory, run:
   ```bash
   docker-compose up --build
   ```

2. Access the services:
   - **Frontend Application:** [http://localhost:5173](http://localhost:5173)
   - **Backend API & Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

3. To stop the containers:
   ```bash
   docker-compose down
   ```

---

## 🧪 Running Automated Tests

To run the backend test suite verifying all API endpoints, parsing integrity, and grounding logic:

1. Navigate to the `backend/` directory with your virtual environment activated:
   ```bash
   cd backend
   pytest tests/test_backend.py -v
   ```

---

## 🌐 Application Architecture & Key Pages

Once running at `http://localhost:5173`, explore the platform sections:

| Page / Feature | Path | Description |
| :--- | :--- | :--- |
| **Executive Overview** | `/` | Metric cards summarizing transcripts, dialogue turns, and synthesis status. |
| **Interview Guide** | `/interview-guide` | 6 case questions with multi-market takeaways and verbatim quote cards. |
| **Ask AI (RAG Engine)** | `/ask` | Semantic search with confidence scores and timestamped evidence retrieval. |
| **Themes Matrix** | `/themes` | Cross-market thematic patterns across France, Germany, and the UK. |
| **Disagreements** | `/disagreements` | Neutral analysis of conflicting expert viewpoints (e.g. ROI vs. Clinical focus). |
| **Transcripts** | `/transcripts` | Full dialogue explorer with speaker labels and searchable timestamps. |
| **Evidence Explorer** | `/evidence` | Interactive deep-link explorer for all cited verbatim quotations. |
| **Evaluation Dashboard** | `/evaluation` | Benchmark evaluation showing retrieval accuracy, precision, and grounding. |

---

## 🔧 Troubleshooting & FAQ

- **Port 8000 or 5173 already in use:**
  - Change the backend port: `uvicorn app.main:app --port 8001`
  - Change the frontend port in `frontend/vite.config.ts` or run `npm run dev -- --port 3000`
- **CORS Issues:**
  - Verify that `CORS_ORIGINS` in `backend/app/config.py` or `backend/.env` includes `http://localhost:5173`.
- **Script execution disabled in PowerShell (Windows):**
  - Run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` before activating `.\venv\Scripts\activate`.
