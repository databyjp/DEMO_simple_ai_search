import ObjCard from './Card'

export default function SearchDisplay({ searchResults }) {
  if (searchResults != null) {
    if (searchResults.length == 0) {
      return (
        <>
          <div>
            "No results to display!"
          </div>
        </>
      )
    } else {
      return (
        <>
          <div>

            {searchResults.map(s => (<ObjCard title={s['answer']} body={s['question']} uuid={s['_additional']['uuid']} />))}
          </div>
        </>
      )
    }
  }
}