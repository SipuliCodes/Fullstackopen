import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
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
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={event => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={event => setUrl(event.target.value)}
                    />
                </div>
                <button onClick={addBlog} type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm