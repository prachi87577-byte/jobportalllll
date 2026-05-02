import { createSlice } from '@reduxjs/toolkit'

const load = () => {
  try { return JSON.parse(localStorage.getItem('savedJobs')) || [] }
  catch { return [] }
}

const savedSlice = createSlice({
  name: 'saved',
  initialState: { list: load() },
  reducers: {
    toggleSave(state, action) {
      const job = action.payload
      const idx = state.list.findIndex(j => j.id === job.id)
      if (idx === -1) state.list.push(job)
      else state.list.splice(idx, 1)
      localStorage.setItem('savedJobs', JSON.stringify(state.list))
    },
  },
})

export const { toggleSave } = savedSlice.actions
export default savedSlice.reducer
