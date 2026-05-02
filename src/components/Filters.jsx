import { useDispatch, useSelector } from 'react-redux'
import { setSearch, setCategory, setJobType, setSortBy, resetFilters } from '../redux/slices/filtersSlice'
import { resetPage } from '../redux/slices/jobsSlice'
import { JOB_CATEGORIES, JOB_TYPES } from '../utils/constants'

export default function Filters({ searchValue, onSearchChange }) {
  const dispatch = useDispatch()
  const { category, jobType, sortBy } = useSelector(s => s.filters)

  const handleCategory = (e) => { dispatch(setCategory(e.target.value)); dispatch(resetPage()) }
  const handleJobType  = (e) => { dispatch(setJobType(e.target.value));  dispatch(resetPage()) }
  const handleSort     = (e) => { dispatch(setSortBy(e.target.value));   dispatch(resetPage()) }
  const handleReset    = ()  => { dispatch(resetFilters()); dispatch(resetPage()); onSearchChange('') }

  return (
    <div className="card p-4 flex flex-wrap gap-3 items-end">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <label className="text-xs font-semibold text-slate-500 mb-1 block">Search</label>
        <input
          className="input text-sm"
          placeholder="Job title, company..."
          value={searchValue}
          onChange={e => { onSearchChange(e.target.value); dispatch(resetPage()) }}
        />
      </div>

      {/* Category */}
      <div className="min-w-[160px]">
        <label className="text-xs font-semibold text-slate-500 mb-1 block">Category</label>
        <select className="input text-sm" value={category} onChange={handleCategory}>
          <option value="">All Categories</option>
          {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Job type */}
      <div className="min-w-[140px]">
        <label className="text-xs font-semibold text-slate-500 mb-1 block">Type</label>
        <select className="input text-sm" value={jobType} onChange={handleJobType}>
          <option value="">All Types</option>
          {JOB_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
        </select>
      </div>

      {/* Sort */}
      <div className="min-w-[140px]">
        <label className="text-xs font-semibold text-slate-500 mb-1 block">Sort By</label>
        <select className="input text-sm" value={sortBy} onChange={handleSort}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="company">Company A–Z</option>
        </select>
      </div>

      <button onClick={handleReset} className="btn-outline text-sm py-2.5">
        Reset
      </button>
    </div>
  )
}
