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
        <div className='border-secondary-subtle-2'>
          No results found :(
        </div>
      </>
    )
  } else {
    console.log(`search display response: ${JSON.stringify(singleGenerativeResponse)}`);

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
              key={s._additional.id}
              title={s.answer}
              body={s.question}
              uuid={s._additional.id}
              category={s.hasCategory[0].title}
              generated={genResponses ? genResponses[i] : null }
            />
          ))}
        </div>
      </>
    )
  };
}