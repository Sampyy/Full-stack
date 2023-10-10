import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Notify from "./components/Notify"
import Recommendations from "./components/Recommendations"
import { useApolloClient, useQuery } from "@apollo/client"
import { ALL_AUTHORS, ME } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  useEffect(() => {
    const oldToken = localStorage.getItem("bookapp-user-token")
    if (oldToken) {
      setToken(oldToken)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <tr>
        <td>
          <button onClick={() => setPage("authors")}>authors</button>
        </td>
        <td>
          <button onClick={() => setPage("books")}>books</button>
        </td>

        <td>
          <button hidden={token === null} onClick={() => setPage("add")}>
            add book
          </button>
        </td>
        <td>
          <button
            hidden={token === null}
            onClick={() => setPage("recommendations")}
          >
            recommendations
          </button>
        </td>

        {token ? (
          <td>
            <button onClick={() => logout()}>logout</button>
          </td>
        ) : (
          <td>
            <button onClick={() => setPage("loginForm")}>login</button>
          </td>
        )}
      </tr>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} setError={notify} />

      <Books show={page === "books"} setError={notify} />

      <NewBook show={page === "add"} setError={notify} />
      <Recommendations show={page === "recommendations"} setError={notify} />

      <LoginForm
        show={page === "loginForm"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
