import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import JobCard from '../components/JobCard'

export default function Saved() {
  const saved = useSelector(s => s.saved.list)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Saved Jobs ❤️</h1>
        <p className="text-slate-500 mt-1">{saved.length} saved job{saved.length !== 1 ? 's' : ''}</p>
      </div>

      {saved.length === 0 ? (
        <div className="card p-16 text-center space-y-4">
          <p className="text-5xl">🤍</p>
          <p className="text-slate-500">No saved jobs yet.</p>
          <Link to="/jobs" className="btn-primary inline-block">Browse Jobs →</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </main>
  )
}
