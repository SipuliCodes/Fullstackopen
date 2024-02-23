import { useState } from "react"

import Authors from "../components/Authors"
import Books from "../components/Books"
import BookForm from "../components/BookForm"
import LoginForm from "../components/LoginForm"
import { useApolloClient } from "@apollo/client"



const App = () => {
  const [token, setToken] = useState(null)
  const [site, setSite] = useState("authors")
  const client = useApolloClient()

  const switchSite = (site) => {
    setSite(site)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <button onClick={() => switchSite("authors")}>authors</button>
      <button onClick={() => switchSite("books")}>books</button>
      {token &&
        <>
          <button onClick={() => switchSite("add_book")}>add book</button>
        <button onClick={logout}>logout</button>
        </>
      }
      {!token && <button onClick={() => switchSite("login")}>login</button>}
      
      {site === "authors" && <Authors token={token} />}
      {site === "books" && <Books />}
      {site === "add_book" && <BookForm />}
      {site === "login" && <LoginForm setToken={setToken} switchSite={switchSite} />}
    </div>
  )
}

export default App
