import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import SearchBox from './SearchBox.jsx'
import SearchDisplay from './SearchDisplay'
import ObjExplorer from './ObjExplorer'

function App() {

  const [searchResults, setSearchResults] = useState(Array(1).fill(null))

  const searchHandler = () => {
    console.log("Something")
  }

  return (
    <>
      <div class="container px-4 pt-5">
        <h2 class="pb-2 border-bottom">My first AI search app</h2>

        <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-2">
          <div class="col d-flex flex-column align-items-start gap-2">
            <h2 class="fw-bold text-body-emphasis">Perform a search</h2>
            <SearchBox setSearchResults={setSearchResults} />
          </div>

          <div class="col">
            <div class="row row-cols-1 row-cols-sm-2 g-4">
              <div class="col d-flex flex-column gap-2">
                <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                  <svg class="bi" width="1em" height="1em">
                    <use xlink:href="#collection" />
                  </svg>
                </div>
                <h4 class="fw-semibold mb-0 text-body-emphasis">Vector search</h4>
                <p class="text-body-secondary">Paragraph of text beneath the heading to explain the heading.</p>
              </div>

              <div class="col d-flex flex-column gap-2">
                <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-4 rounded-3">
                  <svg class="bi" width="1em" height="1em">
                    <use xlink:href="#gear-fill" />
                  </svg>
                </div>
                <h4 class="fw-semibold mb-0 text-body-emphasis">Hybrid search</h4>
                <p class="text-body-secondary">Paragraph of text beneath the heading to explain the heading.</p>
              </div>

              <div class="col d-flex flex-column gap-2">
                <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3">
                  <svg class="bi" width="1em" height="1em">
                    <use xlink:href="#speedometer" />
                  </svg>
                </div>
                <h4 class="fw-semibold mb-0 text-body-emphasis">Filters</h4>
                <p class="text-body-secondary">Paragraph of text beneath the heading to explain the heading.</p>
              </div>

              <div class="col d-flex flex-column gap-2">
                <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3">
                  <svg class="bi" width="1em" height="1em">
                    <use xlink:href="#table" />
                  </svg>
                </div>
                <h4 class="fw-semibold mb-0 text-body-emphasis">LLM Integration</h4>
                <p class="text-body-secondary">Paragraph of text beneath the heading to explain the heading.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
          <div class="col d-flex flex-column align-items-start gap-2">
            <h2 class="fw-bold text-body-emphasis">Search results</h2>

            <p class="text-body-secondary">Search results go here:</p>
            <SearchDisplay searchResults={searchResults} />
          </div>
        </div>

        <div class="row align-items-md-center g-5 py-5">
          <div class="col d-flex flex-column align-items-start gap-2">
            <h2 class="fw-bold text-body-emphasis">Database entries</h2>

            <p class="text-body-secondary">A selection of <i>Jeopardy</i> entries in the database.</p>
            <ObjExplorer />
          </div>
        </div>

        <div class="card my-2">
          <div class="card-header">
            Want to learn more?
          </div>
          <div class="card-body">
            <p class="card-text">Check out the <a href="https://weaviate.io/developers/weaviate/quickstart">Weaviate documentation</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
