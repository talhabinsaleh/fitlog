# 💪 FitLog — Workout Library

**Live site:** _coming soon_
**Repository:** https://github.com/talhabinsaleh/fitlog

FitLog is a dark, no-nonsense gym companion. Browse a library of twelve lifts, open any workout to see its full specs and step-by-step instructions, lock it into **Today's Plan** (capped at five lifts) or **save it for later**, and watch your minutes and calories add up on the **My Plan** page.

Workout data comes from the FitLog API:

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 16 (App Router)** | Pages, routing and dynamic `/workouts/[id]` route |
| **React 19 + TypeScript** | Components, state and type-safe workout data |
| **Tailwind CSS v4** | Styling and responsive layout |
| **React Context API** | Shares Today's Plan and Saved lists across pages |
| **react-toastify** | Toast notifications for every action |
| **react-icons (Lucide)** | Icons for stats, buttons and navigation |
| **localStorage** | Keeps the plan and saved lists after a page reload |
| **Vercel** | Deployment |

---

## ✨ Key Features

1. **Workout Library** — all 12 workouts load from the API into a responsive 3 × 4 grid (3 → 2 → 1 columns), with a loading spinner while the data is fetched.
2. **Workout Details Page** — two-column layout with a large image, category tags, a key-specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered instructions.
3. **Today's Plan & Saved lists** — "Add to today's plan" and "Save for later" buttons update the navbar **Plan** / **Saved** badges instantly and show a toast. The plan is capped at **5 lifts** and the button is disabled once it is full.
4. **My Plan Dashboard** — live **Exercises / Minutes / Calories** summary, `Today's Plan` / `Saved` tabs, **Mark as Done** and **Remove (✕)** actions with toasts, and a friendly empty state.
5. **Sort By dropdown** — re-sort the library and plan lists by **Duration**, **Calories** or **Rating**.
6. **Persistent data** — plan, saved and completed lifts are stored in `localStorage`, so nothing is lost on reload.
7. **Custom 404 page** — shown for any unknown route or invalid workout id, and every page reloads safely after deployment.

---

## 📁 Project Structure

```
app/
  layout.tsx            # fonts, navbar, footer, toast container, PlanProvider
  page.tsx              # Home: hero + library
  workouts/[id]/        # Workout details page (+ loading state)
  my-plan/page.tsx      # My Plan page
  not-found.tsx         # 404 page
components/             # Navbar, Footer, Hero, Library, WorkoutCard, PlanItem, ...
context/PlanContext.tsx # Today's Plan / Saved state + localStorage
lib/                    # API helpers, sorting and TypeScript types
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/talhabinsaleh/fitlog.git
cd fitlog
npm install
npm run dev
```

Then open http://localhost:3000.
