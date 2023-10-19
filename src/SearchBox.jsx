import { useState } from 'react';
import weaviate from 'weaviate-ts-client';

export default function SearchBox({
  setSearchResults,
  setGroupedGenerativeResponse,
  setGroupedGenerativeIsLoading,
  setSingleGenerativeResponse,
  setSingleGenerativeIsLoading
}) {

  const [searchString, setSearchString] = useState('');
  const [generativePrompt, setGenerativePrompt] = useState('Write a tweet based on these results promoting playing an online trivia game at http://127.0.0.1:5173/');

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
        query: queryString,
        properties: ['question']
      })
      .withLimit(5)
      .withFields('question answer _additional {id} hasCategory {... on JeopardyCategory {title} }')
      .do();
    console.log('BM25 results:');
    console.log(result);

    return result;
  };

  async function generatePromo(queryString) {

    setGroupedGenerativeIsLoading(true); // Set loading to true when starting the data fetching

    const client = await connectToWeaviate();

    // ===== Perform a query =====
    let result = await client.graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withBm25({
        query: queryString,
        properties: ['question']
      })
      .withGenerate({
        // groupedTask: 'Write a tweet promoting playing this online trivia game, based on these results',
        groupedTask: generativePrompt,
        groupedProperties: ['question']
      })
      .withLimit(5)
      .withFields('question answer')
      .do();

    setGroupedGenerativeIsLoading(false);

    return result;
  };

  async function generateSinglePrompt(queryString) {

    setSingleGenerativeIsLoading(true); // Set loading to true when starting the data fetching

    const client = await connectToWeaviate();

    // ===== Perform a query =====
    let result = await client.graphql
      .get()
      .withClassName('JeopardyQuestion')
      .withBm25({
        query: queryString,
        properties: ['question']
      })
      .withGenerate({
        singlePrompt: 'Provide a hint for people answering: {question} where the right answer is {answer}',
      })
      .withLimit(5)
      .withFields('question answer')
      .do();

    setSingleGenerativeIsLoading(false);

    return result;
  };

  const clickHandler = async () => {

    console.log(`Search string: ${searchString}`);

    let result = keywordSearch(searchString);
    result.then(r => {
      setSearchResults(r.data.Get['JeopardyQuestion']);
    });


    let groupedResult = generatePromo(searchString);
    groupedResult.then(r => {
      setGroupedGenerativeResponse(r);
    });

    let singleResult = generateSinglePrompt(searchString);
    singleResult.then(r => {
      setSingleGenerativeResponse(r);
    });
  }

  return (
    <>
      <label className="text-body-secondary text-align-left">Find questions containing...</label>
      <input
        type="text"
        className="form-control"
        name="Search"
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            clickHandler();
          }
        }}
      />

      <label className="text-body-secondary text-align-left mt-4">And also, do this with the results...</label>
      <input
        type="text"
        className="form-control"
        name="GenerativeInput"
        value={generativePrompt}
        onChange={(e) => setGenerativePrompt(e.target.value)}
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