import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchJobs } from '../redux/slices/jobsSlice'
import { setCategory, setSearch } from '../redux/slices/filtersSlice'
import { useDebounce } from '../hooks/useDebounce'
import Filters from '../components/Filters'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'

export default function Jobs() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { list, status, currentPage, itemsPerPage } = useSelector(s => s.jobs)
  const { category, jobType, sortBy } = useSelector(s => s.filters)

  const [rawSearch, setRawSearch] = useState('')
  const search = useDebounce(rawSearch, 350)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchJobs())
    const cat = searchParams.get('category')
    if (cat) dispatch(setCategory(cat))
  }, [])

  // Filter + sort (memoized)
  const filtered = useMemo(() => {
    let out = [...list]
    if (search)   out = out.filter(j =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company_name.toLowerCase().includes(search.toLowerCase())
    )
    if (category) out = out.filter(j => j.category === category)
    if (jobType)  out = out.filter(j => j.job_type === jobType)

    if (sortBy === 'newest')  out.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
    if (sortBy === 'oldest')  out.sort((a, b) => new Date(a.publication_date) - new Date(b.publication_date))
    if (sortBy === 'company') out.sort((a, b) => a.company_name.localeCompare(b.company_name))

    return out
  }, [list, search, category, jobType, sortBy])

  // Pagination slice
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, currentPage, itemsPerPage])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Remote Jobs</h1>
        <p className="text-slate-500 mt-1">
          {status === 'succeeded' ? `${filtered.length} jobs found` : 'Loading...'}
        </p>
      </div>

      <Filters searchValue={rawSearch} onSearchChange={setRawSearch} />

      {status === 'loading' && <Loader />}
      {status === 'failed'  && <p className="text-red-500 card p-4">Failed to fetch jobs. Check your internet connection.</p>}

      {status === 'succeeded' && (
        <>
          {paginated.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-slate-500">No jobs match your filters. Try resetting.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}
          <Pagination totalItems={filtered.length} />
        </>
      )}
    </main>
  )
}
