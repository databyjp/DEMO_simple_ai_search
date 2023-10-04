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

      <label for="exampleFormControlInput1" class="text-body-secondary">What are you looking for today?</label>
      <textarea
        class="form-control"
        name="Search"
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div class="mb-5">
        <button type="button" class="btn btn-primary btn-lg" onClick={clickHandler}>
          Go!
        </button>
      </div>
    </>
  )
}