export default function SearchBox() {
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
          />
        </div>
        <button>Go!</button>
      </div>
    </>
  )
}