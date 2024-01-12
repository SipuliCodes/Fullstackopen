import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload
      return notification
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }

}


export default notificationSlice.reducer