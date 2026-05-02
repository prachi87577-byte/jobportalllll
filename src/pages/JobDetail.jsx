import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSave } from '../redux/slices/savedSlice'
import { addApplication } from '../redux/slices/applicationSlice'

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const job      = useSelector(s => s.jobs.list.find(j => j.id === Number(id)))
  const isSaved  = useSelector(s => s.saved.list.some(j => j.id === Number(id)))
  const isApplied= useSelector(s => s.application.list.some(a => a.jobId === Number(id)))

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="text-slate-500 mb-6">Job not found.</p>
        <button onClick={() => navigate('/jobs')} className="btn-primary">← Back to Jobs</button>
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1">
        ← Back
      </button>

      {/* Header card */}
      <div className="card p-6 space-y-4">
        <div className="flex items-start gap-4">
          {job.company_logo ? (
            <img src={job.company_logo} alt={job.company_name} className="w-16 h-16 rounded-2xl object-contain border border-slate-100 dark:border-slate-700 p-2 bg-white" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-2xl font-bold text-brand-600">
              {job.company_name?.[0]}
            </div>
          )}
          <div className="flex-1">
            <p className="text-slate-500 text-sm">{job.company_name}</p>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{job.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="badge bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-300">{job.category}</span>
              <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">{job.job_type?.replace('_', ' ')}</span>
              <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">📍 {job.candidate_required_location || 'Remote'}</span>
              <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">📅 {new Date(job.publication_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {job.salary && (
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">💰 {job.salary}</p>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(addApplication({ jobId: job.id, title: job.title, company: job.company_name, url: job.url }))}
            disabled={isApplied}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              isApplied ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'btn-primary'
            }`}
          >
            {isApplied ? '✅ Applied' : 'Apply Now'}
          </button>
          <button
            onClick={() => dispatch(toggleSave(job))}
            className="btn-outline px-5"
          >
            {isSaved ? '❤️ Saved' : '🤍 Save'}
          </button>
          <a href={job.url} target="_blank" rel="noreferrer" className="btn-outline px-5">
            🔗 Source
          </a>
        </div>
      </div>

      {/* Description */}
      <div className="card p-6">
        <h2 className="font-display text-xl font-bold mb-4 text-slate-800 dark:text-white">Job Description</h2>
        <div
          className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>
    </main>
  )
}
