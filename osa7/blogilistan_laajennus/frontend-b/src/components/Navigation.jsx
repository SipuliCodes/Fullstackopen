import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { setUser } from "../reducers/userReducer"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

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
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/"> blogs </Nav.Link>
          <Nav.Link as={NavLink} to="/users"> users </Nav.Link>
        </Nav>
        {user.name} logged in
        <Button onClick={handleLogout} variant="outline-light">Log out</Button>
      </Container>
    </Navbar>
  )

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