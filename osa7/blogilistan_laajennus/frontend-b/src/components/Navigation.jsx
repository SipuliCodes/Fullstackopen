import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { setUser } from "../reducers/userReducer"

const Navigation = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const navigationStyle = {
    backgroundColor: "lightgrey",
    padding: 2,

  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  return (
    <div style={navigationStyle}>
      <NavLink to="/"> blogs </NavLink>
      <NavLink to="/users"> users </NavLink>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navigation