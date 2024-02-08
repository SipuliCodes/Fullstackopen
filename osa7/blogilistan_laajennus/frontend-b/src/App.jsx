import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotification, setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'


const App = () => {  
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification.value)
  const blogs = useSelector(state => state.blog)
  const noteFormRef = useRef()
  const [user, setUser] = useState(null)
    
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginUser = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 2000)
    }
  }
  
  console.log(blogs)

  if (user === null) {
    return (
      <LoginForm
        login={loginUser}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      {notification && notification}

      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
        <BlogForm
          user={user}
        />
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