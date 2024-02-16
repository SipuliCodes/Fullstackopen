import { useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const id = useParams().id
  const blog = useSelector(state => state.blog.find(blog => blog.id === id))
  console.log(blog)

  const remove = (event) => {
    event.preventDefault()
    dispatch(removeBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author
    }))
  }

  const like = (event) => {
    event.preventDefault()
    dispatch(likeBlog({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id ))

  }

  if (!blog) {
    return null
  }

  return (
    <div className='blog'>
      <div>
        <h1>{blog.title}</h1>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <br></br>
        {blog.likes} likes <button onClick={like}>like</button>
        <br></br>
        added by {blog.user.name}
        <br></br>
        {user.name === blog.user.name && <button onClick={remove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog