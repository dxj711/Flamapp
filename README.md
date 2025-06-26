# 💼 HR Dashboard

A modern, responsive HR Performance Dashboard for managers to track employee performance, manage bookmarks, and view analytics.

---

## 🚀 Features

- **Dashboard Homepage**: User cards with search & filter, performance ratings, and actions (View, Bookmark, Promote)
- **Employee Details**: Dynamic profile page with tabs (Overview, Projects, Feedback)
- **Bookmarks Manager**: List and manage bookmarked employees
- **Analytics**: Department-wise average ratings and bookmark trends (Chart.js)
- **State Management**: Zustand for bookmarks and UI state
- **Reusable Components**: Card, Badge, Button, Modal, Tabs, StarRating, DarkModeToggle

---

## 🛠️ Tech Stack

- [Next.js (App Router, TypeScript)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Chart.js + react-chartjs-2](https://www.chartjs.org/)
- [React](https://react.dev/)

---

## 📁 Project Structure

```
src/
  app/
    page.tsx           // Dashboard homepage
    bookmarks/
    analytics/
    employee/[id]/
  components/          // Card, Badge, Modal, Button, Tabs, StarRating, DarkModeToggle
  hooks/               // useBookmarks, useSearch
  lib/                 // mockData, utils
```

---

## ⚡ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

---

## ☁️ Deployment

- **Vercel:**
  - Push your code to GitHub.
  - Import your repo at [vercel.com](https://vercel.com) and deploy (auto-detects Next.js).
---

