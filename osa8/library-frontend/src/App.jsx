import { useState } from "react"

import Authors from "../components/Authors"
import Books from "../components/Books"
import BookForm from "../components/BookForm"



const App = () => {
  const [site, setSite] = useState("authors")

  const switchSite = (site) => {
    setSite(site)
  }

  return (
    <div>
      <button onClick={() => switchSite("authors")}>authors</button>
      <button onClick={() => switchSite("books")}>books</button>
      <button onClick={() => switchSite("add_genre")}>add book</button>
      {site === "authors" && <Authors />}
      {site === "books" && <Books />}
      {site === "add_genre" && <BookForm />}
    </div>
  )
}

export default App
