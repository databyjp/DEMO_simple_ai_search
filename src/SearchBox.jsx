import { useState } from 'react';
import weaviate from 'weaviate-ts-client';

export default function SearchBox({ setSearchResults, setGenerativeResults }) {

  async function connectToWeaviate() {
    // ===== Connect to the vector database (Weaviate instance) =====
    const client = await weaviate.client({
      scheme: 'https',
      host: 'edu-demo.weaviate.network',
      apiKey: new weaviate.ApiKey('learn-weaviate'),
      headers: { 'X-OpenAI-Api-Key': import.meta.env.VITE_OPENAI_APIKEY },
    });
    return client
  };

  async function keywordSearch(queryString) {

    const client = await connectToWeaviate();

    // ===== Perform a query =====
    let result = await client.graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withBm25({
        query: queryString[0],
        properties: ['question']
      })
      .withLimit(10)
      .withFields('question answer _additional {id} hasCategory {... on JeopardyCategory {title} }')
      .do();
    console.log('BM25 results:');
    console.log(result);

    return result;
  };

  async function singlePromptGenerate(queryString) {

    const client = await connectToWeaviate();

    // ===== Perform a query =====
    let result = await client.graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withNearText({
        concepts: [queryString[0]]
      })
      .withGenerate({
        singlePrompt: "Re-write the following only using emojis: {question}"
      })
      .withLimit(2)
      .withFields('question answer')
      .do();

    return result;
  };

  const [searchString, setSearchString] = useState('');

  const clickHandler = () => {
    console.log(`Search string: ${searchString}`);
    let result = keywordSearch(searchString);
    let genResult = singlePromptGenerate(searchString);

    result.then(r => {
      setSearchResults(r.data.Get['JeopardyQuestion']);
    });

    genResult.then(r => {
      setGenerativeResults(r);
    });
  }

  return (
    <>
      <label className="text-body-secondary text-align-left">Find questions containing...</label>
      <input
        type="text"
        className="form-control"
        name="Search"
        onChange={(e) => setSearchString([e.target.value])}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            clickHandler();
          }
        }}
      />
      <div className="mb-5">
        <button type="button" className="btn btn-primary btn" onClick={clickHandler}>
          Let's go!
        </button>
      </div>
      {/* Try AI search */}
      {/* Add a filter */}
      {/* Augment your data */}
    </>
  )
}