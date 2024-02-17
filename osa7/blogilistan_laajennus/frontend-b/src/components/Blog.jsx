import { useNavigate, useParams } from 'react-router-dom'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

const Blog = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const id = useParams().id
  const blog = useSelector(state => state.blog.find(blog => blog.id === id))

  useEffect(() => {
    if (!blog) {
      navigate('/')
    }
  }, [blog])

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

  const commentOnBlog = (event) => {
    event.preventDefault()
    dispatch(commentBlog({
      comment: comment
    }, blog.id))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div className='blog'>
      <div>
        <h2>{blog.title}</h2>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <br></br>
        {blog.likes} likes <Button variant='success' onClick={like}>like</Button>
        <br></br>
        added by {blog.user.name}
        <br></br>
        {user.name === blog.user.name && <Button onClick={remove} variant='danger'>remove</Button>}
      </div>
      <div>
        <h3>comments</h3>
        <input value={comment} onChange={(event) => setComment(event.target.value)}></input>
        <Button onClick={commentOnBlog}>add comment</Button>
        <ul>
          {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog