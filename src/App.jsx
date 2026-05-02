import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import ErrorBoundary from './components/ErrorBoundary'

const Home     = lazy(() => import('./pages/Home'))
const Jobs     = lazy(() => import('./pages/Jobs'))
const JobDetail= lazy(() => import('./pages/JobDetail'))
const Saved    = lazy(() => import('./pages/Saved'))
const Applied  = lazy(() => import('./pages/Applied'))

export default function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <BrowserRouter>
          <Navbar dark={dark} setDark={setDark} />
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/"          element={<Home />} />
                <Route path="/jobs"      element={<Jobs />} />
                <Route path="/jobs/:id"  element={<JobDetail />} />
                <Route path="/saved"     element={<Saved />} />
                <Route path="/applied"   element={<Applied />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </div>
    </div>
  )
}
