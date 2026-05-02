import { createSlice } from '@reduxjs/toolkit'

const load = () => {
  try { return JSON.parse(localStorage.getItem('applications')) || [] }
  catch { return [] }
}

const save = (list) => localStorage.setItem('applications', JSON.stringify(list))

const applicationSlice = createSlice({
  name: 'application',
  initialState: { list: load() },
  reducers: {
    addApplication(state, action) {
      const exists = state.list.find(a => a.jobId === action.payload.jobId)
      if (!exists) {
        state.list.push({ ...action.payload, id: Date.now(), status: 'Applied', appliedAt: new Date().toISOString(), notes: '' })
        save(state.list)
      }
    },
    updateStatus(state, action) {
      const { id, status } = action.payload
      const app = state.list.find(a => a.id === id)
      if (app) { app.status = status; save(state.list) }
    },
    updateNotes(state, action) {
      const { id, notes } = action.payload
      const app = state.list.find(a => a.id === id)
      if (app) { app.notes = notes; save(state.list) }
    },
    deleteApplication(state, action) {
      state.list = state.list.filter(a => a.id !== action.payload)
      save(state.list)
    },
  },
})

export const { addApplication, updateStatus, updateNotes, deleteApplication } = applicationSlice.actions
export default applicationSlice.reducer
