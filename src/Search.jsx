import { useState } from 'react'

export default function SearchBox() {

  const [searchString, setSearchString] = useState('');

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
        <button onClick={() => console.log(searchString)}>
          Go!
        </button>
      </div>
    </>
  )
}