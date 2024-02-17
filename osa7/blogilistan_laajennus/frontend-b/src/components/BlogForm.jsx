import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({blogFormRef}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title,
      author: author,
      url: url
    }))
    
    setTitle('')
    setAuthor('')
    setUrl('')
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>

      <h2>create new</h2>
      <form>
        <div>
                    title:
          <input
            type="text"
            value={title}
            name="title"
            placeholder='title'
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
                    author:
          <input
            type="text"
            value={author}
            name="author"
            placeholder='author'         
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
                    url:
          <input
            type="text"
            value={url}
						name="url"
						placeholder='url'
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button onClick={addBlog} id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm