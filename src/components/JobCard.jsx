import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSave } from '../redux/slices/savedSlice'
import { addApplication } from '../redux/slices/applicationSlice'

const JobCard = memo(function JobCard({ job }) {
  const dispatch = useDispatch()
  const isSaved  = useSelector(s => s.saved.list.some(j => j.id === job.id))
  const isApplied= useSelector(s => s.application.list.some(a => a.jobId === job.id))

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(toggleSave(job))
  }

  const handleApply = (e) => {
    e.preventDefault()
    dispatch(addApplication({ jobId: job.id, title: job.title, company: job.company_name, url: job.url }))
  }

  // Category badge color
  const categoryColor = 'bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-300'

  return (
    <Link to={`/jobs/${job.id}`} className="card p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {job.company_logo ? (
            <img src={job.company_logo} alt={job.company_name} className="w-10 h-10 rounded-xl object-contain bg-slate-50 border border-slate-100 dark:border-slate-700 p-1" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-700/20 flex items-center justify-center text-lg font-bold text-brand-600">
              {job.company_name?.[0]}
            </div>
          )}
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{job.company_name}</p>
            <h3 className="font-semibold text-slate-800 dark:text-white text-sm leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
              {job.title}
            </h3>
          </div>
        </div>
        <button onClick={handleSave} className="text-xl flex-shrink-0 hover:scale-110 transition-transform" title={isSaved ? 'Remove' : 'Save'}>
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        <span className={`badge ${categoryColor}`}>{job.category}</span>
        {job.job_type && (
          <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
            {job.job_type.replace('_', ' ')}
          </span>
        )}
        {job.candidate_required_location && (
          <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            📍 {job.candidate_required_location || 'Remote'}
          </span>
        )}
      </div>

      {/* Salary + Date */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs text-slate-500">{job.salary || '💰 Salary not listed'}</p>
        <p className="text-xs text-slate-400">{new Date(job.publication_date).toLocaleDateString()}</p>
      </div>

      {/* Apply button */}
      <button
        onClick={handleApply}
        disabled={isApplied}
        className={`w-full py-2 rounded-xl text-sm font-semibold transition-all ${
          isApplied
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default'
            : 'bg-brand-600 hover:bg-brand-700 text-white active:scale-95'
        }`}
      >
        {isApplied ? '✅ Applied' : 'Quick Apply'}
      </button>
    </Link>
  )
})

export default JobCard
