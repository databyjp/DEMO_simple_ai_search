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
    // This will build a base query for re-use
    const client = await connectToWeaviate();

    let baseQuery = client.graphql
      .get()
      .withClassName("JeopardyQuestion")
      .withLimit(limit)
      .withFields(
        "question answer hasCategory {... on JeopardyCategory {title} }",
      )

      // TODO - Search method
      // Keyword search
      // .withBm25({
      //   query: queryString,
      //   properties: ["question"],
      // });
    // Let's try a vector search instead
    .withNearText({
      concepts: [queryString]
    })

    return baseQuery;
  };

  // The search function
  async function mainSearch(queryString) {
    let baseQuery = await queryBuilder(queryString);
    let result = await baseQuery.do();

    return result;
  }

  // Generate hints
  async function generateSinglePrompt(queryString) {
    setSingleGenerativeIsLoading(true);

    let baseQuery = await queryBuilder(queryString);
    let result = await baseQuery
      // TODO - Trivia can be a bit difficult - can we provide hints?
      // Suggested prompt: 'Provide a short hint for the user to help them answer {question}. The hint should lead them to {answer} without mentioning it.'
      .withGenerate({
        singlePrompt: 'Provide a short hint for the user to help them answer {question}. The hint should lead them to {answer} without mentioning it.'
      })
      .do();

    setSingleGenerativeIsLoading(false);

    return result;
  }

  // Generate additional output
  async function generateGroupedTask(queryString) {
    setGroupedGenerativeIsLoading(true);

    let baseQuery = await queryBuilder(queryString);
    let result = await baseQuery
      // TODO - Can we add a grouped generative search (prompt: generativePrompt, only use 'question')
      .withGenerate({
        groupedTask: generativePrompt,
        groupedProperties: ['question']
      })
      .do();

    setGroupedGenerativeIsLoading(false);

    return result;
  }

  const clickHandler = async () => {
    let result = mainSearch(searchString);
    result.then((r) => {
      setSearchResults(r.data.Get.JeopardyQuestion);
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
      <div>
      {/* <div style={{ display: "none" }}> */}
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
          className="btn btn-primary"
          onClick={clickHandler}
        >
          Let's go!
        </button>
      </div>
    </>
  );
}
