# 🏏 Cricket Match Summaries Platform

A **full-stack web application** to manage and showcase cricket match summaries.  
Admins can add matches, edit or delete them, and even generate AI-powered summaries.  
The public homepage displays recent matches with a clean, responsive UI and dark/light theme support.

---

## ✨ Features

### 🌐 Public Features

- Browse recent cricket match summaries.
- Beautiful **dark/light theme toggle**.
- Responsive UI with animated match cards.

### 🔐 Admin Features

- **Authentication** via Firebase (Email/Password).
- Add new matches with teams, scores, and summary.
- Auto-generate summaries using **OpenAI GPT**.
- Edit or delete existing matches.
- Secure admin dashboard layout.

### ⚡ Backend & Database

- **Next.js API routes** for CRUD operations.
- **Prisma ORM** with **PostgreSQL (Neon)**.
- Endpoints include:
- `POST /api/match/add`  
  → Add a new match

- `GET /api/match/list`  
  → Get all matches

- `GET /api/match/get?id=MATCH_ID`  
  → Get a match by ID

- `PUT /api/match/update`  
  → Update a match

- `DELETE /api/match/delete?id=MATCH_ID`  
  → Delete a match

- `POST /api/match/generateSummary`  
  → Generate a match summary using OpenAI

---

## 🏗 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org), [Material UI](https://mui.com)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via [Prisma ORM](https://www.prisma.io))
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **AI Integration**: [OpenAI GPT](https://platform.openai.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📂 Project Structure

```bash
src/
├─ components/ # Reusable UI components (Navbar, MatchCard, etc.)
├─ context/ # Theme context (dark/light mode)
├─ lib/ # Firebase + Prisma setup
├─ pages/
│ ├─ index.tsx # Homepage
│ ├─ auth/ # Login & Register pages
│ ├─ admin/ # Admin dashboard (add, view, edit matches)
│ └─ api/match/ # API routes (CRUD + AI summary)
├─ styles/ # Global and module-based CSS

```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd cricket-match-summaries
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the project root:

```
DATABASE_URL="your-postgres-url"
OPENAI_API_KEY="your-openai-api-key"
NEXT_PUBLIC_CRICKETDATA_API_KEY="your-cricketdata-api-key"
```

### 4. Set up the database

Run Prisma migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Now visit 👉 http://localhost:3000

🗄 Database Schema (Prisma)

```
model Match {
  id        String   @id @default(uuid())
  teamA     String
  teamB     String
  scoreA    String
  scoreB    String
  summary   String
  createdAt DateTime @default(now())
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  isAdmin   Boolean  @default(false)
}

```
