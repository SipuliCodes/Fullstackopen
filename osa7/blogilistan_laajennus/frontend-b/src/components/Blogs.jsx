import { useSelector } from "react-redux"
import Blog from "./Blog"

const Blogs = () => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)

  return (
    blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          name={user.name}
        />)
  )
}

export default Blogs