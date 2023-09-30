import { useState } from 'react'

export default function SearchBox({ setSearchResults }) {

  const [searchString, setSearchString] = useState('');

  const clickHandler = () => {
    // TODO - perform search with search string
    console.log(searchString)

    // TODO - update search results using search string
    setSearchResults(searchString)
  }

  return (
    <>
      <div className="card">
        <div>
        What are you looking for today?
        </div>
        <div>
          <textarea
            name="Search"
            defaultValue="Enter your search text here."
            rows={4}
            cols={40}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
        <button onClick={clickHandler}>
          Go!
        </button>
      </div>
    </>
  )
}