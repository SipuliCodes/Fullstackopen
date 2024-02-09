import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, setUser } from './reducers/userReducer'


const App = () => {  
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification.value)
  const blogs = useSelector(state => state.blog)
  const blogFormRef = useRef()
  const user = useSelector(state => state.user)
    
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <LoginForm/>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      {notification && notification}

      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm/>
      </Togglable>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          name={user.name}
        />)}

    </div>
  )

}

export default App