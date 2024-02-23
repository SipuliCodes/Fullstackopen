import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const LoginForm = ({ setToken, switchSite  }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      switchSite('books')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name<input onChange={({ target }) => setUsername(target.value)} value={username} />
        </div>
        <div>
          password<input onChange={({target}) => setPassword(target.value)} value={password} type="password"/>
        </div>
        <button type="submit" >login</button>
      </form>
    </div>
  )
}

export default LoginForm