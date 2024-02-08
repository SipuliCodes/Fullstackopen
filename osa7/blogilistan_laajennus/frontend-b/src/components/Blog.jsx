import { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, name }) => {
  const [visibleInfo, setVisibleInfo] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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

  const toggleVisibility = () => {
    setVisibleInfo(!visibleInfo)
  }

  return (
    <div className='blog' style={ blogStyle }>
      <div>
        {blog.title} {blog.author}
        {!visibleInfo && <button onClick={toggleVisibility}>view</button>}
        {visibleInfo && <button onClick={toggleVisibility}>hide</button>}
      </div>
      {visibleInfo &&
                <div>
                  {blog.url}
                  <br />
                    likes {blog.likes} <button onClick={like}>like</button>
                  <br />
                  {blog.user.name}
                  {name === blog.user.name &&
                        <div>
                          <button onClick={remove}>remove</button>
                        </div>
                  }
                </div>
      }

    </div>
  )
}

Blog.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Blog