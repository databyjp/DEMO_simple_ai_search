import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import SearchBox from './SearchBox.jsx'
import SearchDisplay from './SearchDisplay'
import ObjExplorer from './ObjExplorer'

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
            <h1 class="pb-2">My first AI search app</h1>
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
            <h2 class="pb-2">Search results</h2>
            <SearchDisplay searchResults={searchResults} />
          </div>
        </div>

        <div class="row align-items-md-center g-5 py-5">
          <div class="col d-flex flex-column align-items-start gap-2">
            <h2 class="pb-2">Database entries</h2>
            <p class="text-body-secondary">A selection of <i>Jeopardy</i> entries in the database.</p>
            <ObjExplorer />
          </div>
        </div>

        <div>
        <div class="col">
            <div class="row row-cols-1 row-cols-sm-2 g-4">
              <div class="col d-flex flex-column gap-2">
                <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                  <svg class="bi" width="1em" height="1em">
                    <use xlink:href="#collection" />
                  </svg>
                </div>
                <h4 class="fw-semibold mb-0 text-body-emphasis">Semantic search</h4>
                <p class="text-body-secondary">Search objects by similarity.</p>
              </div>

              <div class="col d-flex flex-column gap-2">
                <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-4 rounded-3">
                  <svg class="bi" width="1em" height="1em">
                    <use xlink:href="#gear-fill" />
                  </svg>
                </div>
                <h4 class="fw-semibold mb-0 text-body-emphasis">Hybrid search</h4>
                <p class="text-body-secondary">Combine semantic search with keyword search.</p>
              </div>

              <div class="col d-flex flex-column gap-2">
                <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-4 rounded-3">
                  <svg class="bi" width="1em" height="1em">
                    <use xlink:href="#speedometer" />
                  </svg>
                </div>
                <h4 class="fw-semibold mb-0 text-body-emphasis">Filters</h4>
                <p class="text-body-secondary">Restrict results based con a set of conditions.</p>
              </div>

              <div class="col d-flex flex-column gap-2">
                <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3">
                  <svg class="bi" width="1em" height="1em">
                    <use xlink:href="#table" />
                  </svg>
                </div>
                <h4 class="fw-semibold mb-0 text-body-emphasis">LLM Integration</h4>
                <p class="text-body-secondary">Integrate language models to transform your.</p>
              </div>
            </div>
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
