import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'


const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped="columns" variant="dark" >
        <thead>
        <tr>
          <th>User</th>
          <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}><td><Nav hover > <Nav.Link as={Link} to={user.id}> {user.name}</Nav.Link> </Nav></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Users