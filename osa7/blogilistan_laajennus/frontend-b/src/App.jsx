import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route } from 'react-router-dom'
import User from './components/User'

import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Home from './components/Home'


const App = () => {  
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification.value)
  const user = useSelector(state => state.user)
    
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
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
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<Home />} />
      </Routes>
  

    </div>
  )

}

export default App