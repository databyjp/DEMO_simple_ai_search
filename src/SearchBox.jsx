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
    "",
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

        // Search method
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

  async function generateGroupedTask(queryString) {
    setGroupedGenerativeIsLoading(true);

    let baseQuery = await queryBuilder(queryString);
    let result = await baseQuery
      // Can we add a grouped generative search (prompt: generativePrompt)
      .do();

    setGroupedGenerativeIsLoading(false);

    return result;
  }

  async function generateSinglePrompt(queryString) {
    setSingleGenerativeIsLoading(true);

    let baseQuery = await queryBuilder(queryString);
    let result = await baseQuery
      // Can we provide hints for the users?
      .do();

    setSingleGenerativeIsLoading(false);

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
