import QuestionCard from './QuestionCard';

export default function SearchDisplay({ searchResults, singleGenerativeResponse, singleGenerativeIsLoading }) {

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
        <div className="card my-2">
          <div className="card-body">
            <div className="card-text" style={{ whiteSpace: 'pre-line' }}>
              No results found :(
            </div>
          </div>
        </div>
      </>
    )
  } else {

    let genResponses;
    if (singleGenerativeResponse) {
      genResponses = singleGenerativeResponse.data.Get.JeopardyQuestion.map(s => (s._additional.generate.singleResult));
    } else {
      genResponses = [];
    };

    return (
      <>
        <div className='border-secondary-subtle-2'>
          {searchResults.map((s, i) => (
            <QuestionCard
              key={s.question}
              title={s.answer}
              body={s.question}
              category={s.hasCategory[0].title}
              generatedIsLoading={singleGenerativeIsLoading}
              generated={genResponses ? genResponses[i] : null }
            />
          ))}
        </div>
      </>
    )
  };
}