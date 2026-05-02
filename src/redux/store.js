import { configureStore } from '@reduxjs/toolkit'
import jobsReducer        from './slices/jobsSlice'
import savedReducer       from './slices/savedSlice'
import filtersReducer     from './slices/filtersSlice'
import applicationReducer from './slices/applicationSlice'

export const store = configureStore({
  reducer: {
    jobs:        jobsReducer,
    saved:       savedReducer,
    filters:     filtersReducer,
    application: applicationReducer,
  },
})
