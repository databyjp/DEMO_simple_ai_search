import { useState } from 'react'
import weaviate from 'weaviate-ts-client';

export default function SearchBox({ setSearchResults }) {

  async function keywordSearch(queryString) {

    // ===== Connect to the vector database (Weaviate instance) =====
    const client = weaviate.client({
      scheme: 'https',
      host: 'edu-demo.weaviate.network',
      apiKey: new weaviate.ApiKey('learn-weaviate'),
      headers: { 'X-OpenAI-Api-Key': import.meta.env.REACT_APP_OPENAI_APIKEY },
    });

    // ===== Perform a query =====
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
    console.log(searchString)
    let result = keywordSearch(searchString);

    result.then(r => {
      setSearchResults(r.data.Get['JeopardyQuestion'])
    })
  }

  return (
    <>
      <label for="exampleFormControlInput1" class="text-body-secondary">Test your trivia knowledge about...</label>
      <input
        type="text"
        class="form-control"
        name="Search"
        onChange={(e) => setSearchString([e.target.value])}
      />
      <div class="mb-5">
        <button type="button" class="btn btn-primary btn" onClick={clickHandler}>
          Let's go!
        </button>
      </div>
      {/* Try AI search */}
      {/* Add a filter */}
      {/* Augment your data */}
    </>
  )
}