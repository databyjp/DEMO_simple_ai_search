"use strict";

import { useState } from "react";
import weaviate from "weaviate-ts-client";

export default function SearchBox({
  setSearchResults,
  setGroupedGenerativeResponse,
  setGroupedGenerativeIsLoading,
  setSingleGenerativeResponse,
  setSingleGenerativeIsLoading,
}) {
  const [searchString, setSearchString] = useState("");
  const [generativePrompt, setGenerativePrompt] = useState(
    "Write a tweet with emojis using these facts promoting a trivia board game! Make up a name for the game.",
  );

  async function connectToWeaviate() {
    // ===== Connect to the vector database (Weaviate instance) =====
    const client = await weaviate.client({
      scheme: "https",
      host: "edu-demo.weaviate.network",
      apiKey: new weaviate.ApiKey("learn-weaviate"),
      headers: { "X-OpenAI-Api-Key": import.meta.env.VITE_OPENAI_APIKEY },
    });
    return client;
  }

  const queryBuilder = async (queryString, limit = 5) => {
    try {
      const client = await connectToWeaviate();

      let baseQuery = client.graphql
        .get()
        .withClassName("JeopardyQuestion")
        .withLimit(limit)
        .withFields(
          "question answer hasCategory {... on JeopardyCategory {title} }",
        )

        // TODO - Search method
        .withBm25({  // Keyword search
          query: queryString,
          properties: ["question"],
        })
        // Let's try a vector search

      return baseQuery;
    } catch (error) {
      console.error("Error occurred while building the base query: ", error);
    }
  };

  async function mainSearch(queryString) {
    let baseQuery = await queryBuilder(queryString);
    let result = await baseQuery.do();

    return result;
  }

  async function generateSinglePrompt(queryString) {

    setSingleGenerativeIsLoading(true);

    let baseQuery = await queryBuilder(queryString);
    let result = await baseQuery
      // TODO - Can we provide hints for the users?
      // Suggested prompt: 'Provide a short hint for the user to help them answer {question}. The hint should lead them to {answer} without mentioning it.'
      .do();

    setSingleGenerativeIsLoading(false);

    return result;
  }


  async function generateGroupedTask(queryString) {

    setGroupedGenerativeIsLoading(true);

    let baseQuery = await queryBuilder(queryString);
    let result = await baseQuery
      // TODO - Can we add a grouped generative search (prompt: generativePrompt, only use 'question')
      .do();

    setGroupedGenerativeIsLoading(false);

    return result;
  }

  const clickHandler = async () => {
    let result = mainSearch(searchString);
    result.then((r) => {
      setSearchResults(r.data.Get["JeopardyQuestion"]);
    });

    let groupedResult = generateGroupedTask(searchString);
    groupedResult.then((r) => {
      setGroupedGenerativeResponse(r);
    });

    let singleResult = generateSinglePrompt(searchString);
    singleResult.then((r) => {
      setSingleGenerativeResponse(r);
    });
  };

  return (
    <>
      <label className="text-body-secondary text-align-left">
        Find questions containing...
      </label>
      <input
        type="text"
        className="form-control"
        name="Search"
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            clickHandler();
          }
        }}
      />

      {/* TODO - unhide div */}
      {/* <div> */}
      <div style={{ display: 'none'}}>
        <label className="text-body-secondary text-align-left mt-4">
          And also, do this with the results...
        </label>
        <textarea
          className="form-control"
          name="GenerativeInput"
          value={generativePrompt}
          onChange={(e) => setGenerativePrompt(e.target.value)}
          rows="2"
        />
      </div>

      <div className="mb-5">
        <button
          type="button"
          className="btn btn-primary btn"
          onClick={clickHandler}
        >
          Let's go!
        </button>
      </div>
    </>
  );
}
