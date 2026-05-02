import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchJobs } from '../redux/slices/jobsSlice'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'
import { JOB_CATEGORIES } from '../utils/constants'

export default function Home() {
  const dispatch = useDispatch()
  const { list, status } = useSelector(s => s.jobs)
  const savedCount   = useSelector(s => s.saved.list.length)
  const appliedCount = useSelector(s => s.application.list.length)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchJobs())
  }, [])

  const featured = list.slice(0, 6)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">

      {/* Hero */}
      <section className="text-center space-y-5 py-8">
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-700/20 text-brand-700 dark:text-brand-300 text-sm font-semibold px-4 py-2 rounded-full">
          🌍 100% Remote Jobs
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Find Your Next<br />
          <span className="text-brand-600">Remote Career</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
          Browse thousands of remote jobs from top companies worldwide. Filter by category, type, and location.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/jobs" className="btn-primary text-center">Browse All Jobs →</Link>
          <Link to="/applied" className="btn-outline text-center">My Applications</Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[
          { label: 'Jobs Available', value: list.length || '100+', emoji: '💼' },
          { label: 'Jobs Saved',     value: savedCount,             emoji: '❤️'  },
          { label: 'Applied',        value: appliedCount,           emoji: '✅'  },
        ].map(s => (
          <div key={s.label} className="card p-5 text-center">
            <div className="text-3xl mb-1">{s.emoji}</div>
            <div className="font-display text-2xl font-bold text-brand-600">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section>
        <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-2">
          {JOB_CATEGORIES.map(cat => (
            <Link
              key={cat}
              to={`/jobs?category=${encodeURIComponent(cat)}`}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium hover:border-brand-500 hover:text-brand-600 dark:hover:border-brand-400 dark:hover:text-brand-400 transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured jobs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Featured Jobs</h2>
          <Link to="/jobs" className="text-brand-600 dark:text-brand-400 text-sm font-semibold hover:underline">View all →</Link>
        </div>

        {status === 'loading' && <Loader />}
        {status === 'failed'  && <p className="text-red-500">Failed to load jobs. Please refresh.</p>}
        {status === 'succeeded' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </section>
    </main>
  )
}
