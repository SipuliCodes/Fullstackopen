import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'


const App = () => {
    const noteFormRef = useRef()
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [succesMessage, setSuccesMessage] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])
    
    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const loginUser = async (userObject) => {
        try {
            const user = await loginService.login(userObject)

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            setErrorMessage('wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 2000)
        }
    }

    const addBlog = async (blogObject) => {
        try {
            noteFormRef.current.toggleVisibility()
            const blog = await blogService.create(blogObject)
            setBlogs(blogs.concat(blog))
            setSuccesMessage(`a new blog ${blog.title} by ${blog.author} added`)
            setTimeout(() => { setSuccesMessage(null) }, 2000)
        } catch (exception) {
        }
    }
    
    if (user === null) {
        return (
            <LoginForm
                login={loginUser}
                errorMessage={errorMessage}
            />
        )
    }

    return (
        <div>
            <h2>blogs</h2>

            {succesMessage && succesMessage}

            <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel="create new blog" ref={noteFormRef}>
                <BlogForm
                    succesMessage={succesMessage}
                    handleLogout={handleLogout}
                    createBlog={addBlog}
                    blogs={blogs}
                    user={user}
                />
            </Togglable>

            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                />)}

        </div>
    )

}

export default App