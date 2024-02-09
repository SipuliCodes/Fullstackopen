import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import loginService from '../services/login'
import { deleteNotification, setNotification } from "./notificationReducer"


const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
        blogService.setToken(user.token)
    }
  }
}

export const loginUser = (userObject) => {
  return async dispatch => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 2000)
    }
  }
}

export const {setUser} = userSlice.actions

export default userSlice.reducer