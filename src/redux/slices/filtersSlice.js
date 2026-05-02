import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search:   '',
    category: '',
    jobType:  '',
    sortBy:   'newest',
  },
  reducers: {
    setSearch  (state, action) { state.search   = action.payload },
    setCategory(state, action) { state.category = action.payload },
    setJobType (state, action) { state.jobType  = action.payload },
    setSortBy  (state, action) { state.sortBy   = action.payload },
    resetFilters(state) {
      state.search = ''; state.category = ''; state.jobType = ''; state.sortBy = 'newest'
    },
  },
})

export const { setSearch, setCategory, setJobType, setSortBy, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
