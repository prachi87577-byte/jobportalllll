import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (category = '') => {
  const url = category
    ? `https://remotive.com/api/remote-jobs?category=${encodeURIComponent(category)}&limit=100`
    : 'https://remotive.com/api/remote-jobs?limit=100'
  const { data } = await axios.get(url)
  return data.jobs
})

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    list:    [],
    status:  'idle',   // idle | loading | succeeded | failed
    error:   null,
    currentPage: 1,
    itemsPerPage: 9,
  },
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload
    },
    resetPage(state) {
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending,   (state) => { state.status = 'loading'; state.error = null })
      .addCase(fetchJobs.fulfilled, (state, action) => { state.status = 'succeeded'; state.list = action.payload })
      .addCase(fetchJobs.rejected,  (state, action) => { state.status = 'failed';    state.error = action.error.message })
  },
})

export const { setPage, resetPage } = jobsSlice.actions
export default jobsSlice.reducer
