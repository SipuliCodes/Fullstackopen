import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload
      return notification
    },
    deleteNotification(state, action) {
      return null
    }
  }
})

export const {createNotification, deleteNotification} = notificationSlice.actions
export default notificationSlice.reducer