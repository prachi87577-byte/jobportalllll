import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar({ dark, setDark }) {
  const savedCount = useSelector(s => s.saved.list.length)
  const appliedCount = useSelector(s => s.application.list.length)

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-bold text-brand-600 tracking-tight">
          Job<span className="text-slate-800 dark:text-white">Hunt</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <NavLink to="/"       className={linkClass} end>Home</NavLink>
          <NavLink to="/jobs"   className={linkClass}>Jobs</NavLink>
          <NavLink to="/saved"  className={linkClass}>
            Saved {savedCount > 0 && <span className="ml-1 bg-brand-600 text-white text-xs rounded-full px-1.5">{savedCount}</span>}
          </NavLink>
          <NavLink to="/applied" className={linkClass}>
            Applied {appliedCount > 0 && <span className="ml-1 bg-green-500 text-white text-xs rounded-full px-1.5">{appliedCount}</span>}
          </NavLink>
        </nav>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
