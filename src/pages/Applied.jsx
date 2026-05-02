import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateStatus, updateNotes, deleteApplication } from '../redux/slices/applicationSlice'
import { Link } from 'react-router-dom'
import { STATUS_OPTIONS, STATUS_COLORS } from '../utils/constants'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function Applied() {
  const dispatch = useDispatch()
  const apps = useSelector(s => s.application.list)
  const [editNotes, setEditNotes] = useState({})

  // Chart data
  const chartData = STATUS_OPTIONS.map(s => ({
    name: s,
    count: apps.filter(a => a.status === s).length,
  }))

  const BAR_COLORS = { Applied: '#6366f1', Interview: '#f59e0b', Offer: '#10b981', Rejected: '#ef4444' }

  if (apps.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center space-y-4">
        <div className="card p-16 space-y-4">
          <p className="text-5xl">📋</p>
          <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">No Applications Yet</h1>
          <p className="text-slate-500">Start applying to jobs to track them here.</p>
          <Link to="/jobs" className="btn-primary inline-block">Find Jobs →</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-800 dark:text-white">My Applications ✅</h1>
        <p className="text-slate-500 mt-1">{apps.length} total application{apps.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Analytics Chart */}
      <div className="card p-5">
        <h2 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Application Status Overview</h2>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={chartData} barSize={40}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={25} />
            <Tooltip />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {chartData.map(entry => (
                <Cell key={entry.name} fill={BAR_COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status columns */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUS_OPTIONS.map(status => {
          const group = apps.filter(a => a.status === status)
          return (
            <div key={status} className="space-y-3">
              <div className={`badge ${STATUS_COLORS[status]} text-sm font-bold px-3 py-1.5`}>
                {status} ({group.length})
              </div>
              {group.map(app => (
                <div key={app.id} className="card p-4 space-y-3">
                  <div>
                    <p className="font-semibold text-sm text-slate-800 dark:text-white line-clamp-2">{app.title}</p>
                    <p className="text-xs text-slate-500">{app.company}</p>
                    <p className="text-xs text-slate-400 mt-1">Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
                  </div>

                  {/* Status selector */}
                  <select
                    value={app.status}
                    onChange={e => dispatch(updateStatus({ id: app.id, status: e.target.value }))}
                    className="input text-xs py-1.5"
                  >
                    {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>

                  {/* Notes */}
                  <textarea
                    value={editNotes[app.id] ?? app.notes}
                    onChange={e => setEditNotes(prev => ({ ...prev, [app.id]: e.target.value }))}
                    onBlur={() => {
                      dispatch(updateNotes({ id: app.id, notes: editNotes[app.id] ?? app.notes }))
                    }}
                    placeholder="Add notes..."
                    rows={2}
                    className="input text-xs py-1.5 resize-none"
                  />

                  <div className="flex gap-2">
                    {app.url && (
                      <a href={app.url} target="_blank" rel="noreferrer" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">
                        View Job ↗
                      </a>
                    )}
                    <button
                      onClick={() => dispatch(deleteApplication(app.id))}
                      className="text-xs text-red-500 hover:text-red-700 ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </main>
  )
}
