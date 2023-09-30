import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SearchBox from './Search.jsx'

function App() {

  const [searchResults, setSearchResults] = useState(Array(1).fill(null))

  const searchHandler = () => {
    console.log("Something")
  }

  return (
    <>
      <h1>Some Stuff</h1>

      <SearchBox setSearchResults={setSearchResults} />

      <p className="read-the-docs">
        Add AI to your app with Weaviate 😉. <br />
        Learn how at <a href="https://weaviate.io/developers/weaviate/quickstart">weaviate.io</a>
      </p>
    </>
  )
}

export default App
