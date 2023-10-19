import { useState } from 'react'
import weaviateLogo from './assets/weaviate-logo-light-transparent-200.png'
import SearchBox from './SearchBox.jsx'
import SearchDisplay from './SearchDisplay'

function App() {

  const [searchResults, setSearchResults] = useState([])

  const searchHandler = () => {
    console.log("Something")
  }

  return (
    <>
      <div class="container my-5">
        <div class="p-5 text-center bg-body-tertiary rounded-3">
          <div class="container px-4 pt-5">
            <img src={weaviateLogo} width="80px"></img>
            <h1 class="pb-2">Quizmaster 5000</h1>
          </div>
          <div class="row row-cols-1 align-items-md-center g-5 py-2">
            <div class="col d-flex flex-column align-items-center gap-2">
              <SearchBox setSearchResults={setSearchResults} />
            </div>
          </div>
        </div>
      </div>

      <div class="container px-4 pt-2">
        <div class="row row-cols-1 align-items-md-center g-5 py-2">
          <div class="col d-flex flex-column align-items-start gap-2">
            <h2 class="pb-2">Questions</h2>
            <SearchDisplay searchResults={searchResults} />
          </div>
        </div>
      </div>

      <div class="container px-4 pt-2">
        <div class="card mt-5 mb-2">
          <div class="card-header">
            Want to learn more?
          </div>
          <div class="card-body">
            <p class="card-text">Check out the <a href="https://weaviate.io/developers/weaviate/quickstart">Weaviate documentation</a></p>
          </div>
        </div>
      </div>
      <div class="container px-4">
        <small>
          Original questions from TV show <i>Jeopardy!</i>. Dataset from <a href="https://www.kaggle.com/datasets/tunguz/200000-jeopardy-questions">Kaggle</a>.
        </small>
      </div>
    </>
  )
}

export default App
