import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../redux/slices/jobsSlice'

export default function Pagination({ totalItems }) {
  const dispatch = useDispatch()
  const { currentPage, itemsPerPage } = useSelector(s => s.jobs)
  const total = Math.ceil(totalItems / itemsPerPage)

  if (total <= 1) return null

  const pages = Array.from({ length: total }, (_, i) => i + 1)
    .filter(p => p === 1 || p === total || Math.abs(p - currentPage) <= 2)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        className="btn-outline px-3 py-2 text-sm"
        disabled={currentPage === 1}
        onClick={() => dispatch(setPage(currentPage - 1))}
      >
        ← Prev
      </button>

      {pages.map((p, i) => (
        <span key={p}>
          {i > 0 && pages[i - 1] !== p - 1 && <span className="px-1 text-slate-400">…</span>}
          <button
            onClick={() => dispatch(setPage(p))}
            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
              p === currentPage
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {p}
          </button>
        </span>
      ))}

      <button
        className="btn-outline px-3 py-2 text-sm"
        disabled={currentPage === total}
        onClick={() => dispatch(setPage(currentPage + 1))}
      >
        Next →
      </button>
    </div>
  )
}
