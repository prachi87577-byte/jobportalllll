# 🧳 JobHunt — Remote Job Portal

A React-based remote job portal built with Vite, Redux Toolkit, React Router, and Tailwind CSS.
Powered by the [Remotive API](https://remotive.com/api/remote-jobs).

## Tech Stack
- **Frontend**: React 18 + Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **API**: Remotive (free, no auth needed)
- **Charts**: Recharts

## Features
- 🔍 Search + Filter + Sort jobs
- ⚡ Debounced search (350ms)
- 📄 Pagination (9 jobs per page)
- ❤️ Save / Wishlist jobs (persisted in localStorage)
- ✅ Track applications with Kanban board
- 📊 Application analytics chart
- 🌙 Dark mode toggle (persisted)
- ⚠️ Error Boundary
- 🚀 Lazy loading for all pages

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

## Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel
```

## Project Structure
```
src/
├── components/     # Navbar, JobCard, Filters, Loader, Pagination, ErrorBoundary
├── pages/          # Home, Jobs, JobDetail, Saved, Applied
├── redux/
│   ├── store.js
│   └── slices/     # jobsSlice, savedSlice, filtersSlice, applicationSlice
├── hooks/          # useDebounce
├── utils/          # constants
└── App.jsx
```

## Advanced Features Covered
| Feature | Implementation |
|---|---|
| Search + Filter + Sort | Filters component + Redux |
| Debounced API calls | useDebounce hook |
| Pagination | Pagination component + Redux |
| Dark mode | Tailwind dark: + localStorage |
| Error boundary | Class component wrapping all routes |
| Memoization | useMemo on filtered list, React.memo on JobCard |
| Dashboard with charts | Recharts BarChart on Applied page |
| Lazy loading | React.lazy + Suspense for all pages |
