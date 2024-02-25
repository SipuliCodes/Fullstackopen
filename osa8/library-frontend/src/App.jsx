import { useEffect, useState } from "react"

import Authors from "../components/Authors"
import Books from "../components/Books"
import BookForm from "../components/BookForm"
import LoginForm from "../components/LoginForm"
import { useSubscription, useApolloClient } from "@apollo/client"
import RecommendedBooks from "../components/RecommendedBooks"
import { BOOK_ADDED, ALL_BOOKS } from "../queries"

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook))
    }
  })
}



const App = () => {
  const [token, setToken] = useState(null)
  const [site, setSite] = useState("authors")
  const client = useApolloClient()

    useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      updateCache(client.cache, {query: ALL_BOOKS}, addedBook)
      window.alert(`Book ${addedBook.title} added`)
    }
  })


  useEffect(() => {
    const localToken = localStorage.getItem("library-user-token")
    if (localToken) {
      setToken(localToken)
    }
  }, [])

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
        <button onClick={() => switchSite("recommend")}>recommend</button>
          <button onClick={logout}>logout</button>
        </>
      }
      {!token && <button onClick={() => switchSite("login")}>login</button>}
      
      {site === "authors" && <Authors token={token} />}
      {site === "books" && <Books />}
      {site === "add_book" && <BookForm />}
      {site === "login" && <LoginForm setToken={setToken} switchSite={switchSite} />}
      {site === "recommend" && <RecommendedBooks />}
    </div>
  )
}

export default App
