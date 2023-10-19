import QuestionCard from './QuestionCard';

export default function SearchDisplay({ searchResults }) {
  if (searchResults == null) {
    return (
      <>
        <div className='border-secondary-subtle-2'>
          Try entering something in the search box!
        </div>
      </>
    )
  } else if (searchResults.length == 0) {
    return (
      <>
        <div className='border-secondary-subtle-2'>
          No results found :(
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='border-secondary-subtle-2'>
          {searchResults.map(s => (<QuestionCard key={s._additional.id} title={s.answer} category={s.hasCategory[0].title} body={s.question} uuid={s._additional.id} />))}
        </div>
      </>
    )
  };
}