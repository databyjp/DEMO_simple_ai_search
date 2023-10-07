import ObjCard from './Card'

export default function SearchDisplay({ searchResults }) {
  if (searchResults == null | searchResults.length == 0) {
    return (
      <>
        <div>
          Nothing to see here... try entering something else in the search box.
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          {searchResults.map(s => (<ObjCard key={s._additional.id} title={s.answer} body={s.question} uuid={s._additional.id} />))}
        </div>
      </>
    )
  }
}