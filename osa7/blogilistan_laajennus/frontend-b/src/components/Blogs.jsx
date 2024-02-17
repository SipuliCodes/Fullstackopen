import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'

const Blogs = () => {
  const blogs = useSelector(state => state.blog)

  return (
    <Table striped bordered hover variant="primary">
      <thead>
        <tr>
          <th>Blogs</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog => <tr key={blog.id}> <td><Nav.Link as={Link} to={`blogs/${blog.id}`}>{blog.title}</Nav.Link></td> </tr>)}
      </tbody>
    </Table>
  )
}

export default Blogs