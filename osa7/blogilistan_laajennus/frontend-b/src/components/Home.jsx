import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import Blogs from "./Blogs"
import { useRef } from "react"

const Home = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <br></br>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default Home