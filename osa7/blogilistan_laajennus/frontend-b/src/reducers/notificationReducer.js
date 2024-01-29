import { createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    value: null
  },
  reducers: {
    setNotification(state, action) {
      state.value = action.payload
    },
    deleteNotification(state, action) {
      state.value = null
    }
  }
})

export const { setNotification, deleteNotification } = notificationSlice.actions

export default notificationSlice.reducer