import { useState } from 'react'
import weaviate from 'weaviate-ts-client';

export default function SearchBox({ setSearchResults }) {

  async function performSearch(queryString) {
    const client = weaviate.client({
      scheme: 'https',
      host: 'edu-demo.weaviate.network',
      apiKey: new weaviate.ApiKey('learn-weaviate'),
      headers: { 'X-OpenAI-Api-Key': import.meta.env.REACT_APP_OPENAI_APIKEY },
    });

    let result = await client.graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withBm25({
        query: queryString[0],
      })
      .withLimit(5)
      .withFields('question answer _additional {id}')
      .do();
    console.log(result)

    return result;
  }

  const [searchString, setSearchString] = useState('');

  const clickHandler = () => {
    // TODO - perform search with search string
    console.log(searchString)

    // TODO - update search results using search string
    // setSearchResults(searchString)

    let result = performSearch(searchString);

    result.then(r => {
      setSearchResults(r.data.Get['JeopardyQuestion'])
    })
  }

  return (
    <>

      <label for="exampleFormControlInput1" class="text-body-secondary">Try it out!</label>
      <textarea
        class="form-control"
        name="Search"
        onChange={(e) => setSearchString([e.target.value])}
      />
      <div class="mb-5">
        <button type="button" class="btn btn-primary btn-lg" onClick={clickHandler}>
          Go!
        </button>
      </div>
    </>
  )
}