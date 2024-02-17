import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

import Alert from 'react-bootstrap/Alert'

const LoginForm = () => {
  const notification = useSelector(state => state.notification.value)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const login = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username: username, password: password}))

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      {notification && <Alert variant="danger">{notification}</Alert>}
      <form>
        <div>
                    username
          <input
            type="text"
            value={username}
            name="username"
            id='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            type="password"
            value={password}
						name="password"
						id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button onClick={login} id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm