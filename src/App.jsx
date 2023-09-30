import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBox from './Search.jsx'

function App() {

  return (
    <>
      <h1>Some Stuff</h1>
      <SearchBox />

      <p className="read-the-docs">
        Add AI to your app with Weaviate 😉. <br />
        Learn how at <a href="https://weaviate.io/developers/weaviate/quickstart">weaviate.io</a>
      </p>
    </>
  )
}

export default App
