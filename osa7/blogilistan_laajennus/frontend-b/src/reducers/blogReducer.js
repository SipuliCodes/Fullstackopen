import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification, deleteNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState:[],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },

    appendBlog(state, action) {
      state.push(action.payload)
    },

    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog)
    },

    deleteBlog(state, action) {
      const deletedBlog = action.payload
      console.log(deleteBlog)
      const new_state = state.filter((blog) => blog.id !== deletedBlog.id)
      console.log(new_state)
      return new_state
    }
  }
})

export const initializeBlogs = () => {
  const sortBlog = (blogA, blogB) => {
        if (blogA.likes > blogB.likes) {
          return -1
        } else if (blogA.likes < blogB.likes) {
          return 1
        }
        return 0
  }
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(sortBlog)))
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const blog = await blogService.create(blogObject)
    dispatch(appendBlog(blog))
    dispatch(setNotification((`a new blog ${blog.title} by ${blog.author} added`)))
    setTimeout(() => { dispatch(deleteNotification()) }, 2000)
  }
}

export const likeBlog = (blogObject, id) => {
  return async dispatch => {
    const updatedBlog = await blogService.like(blogObject, id)
    dispatch(updateBlog(updatedBlog))
  }
}

export const commentBlog = (blogObject, id) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(blogObject, id)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (blogObject) => {
  return async dispatch => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      await blogService.remove(blogObject.id)
      dispatch(deleteBlog(blogObject))
    }
  }
}

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions

export default blogSlice.reducer