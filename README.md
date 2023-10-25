# Weaviate DEMO - AI search app

This is a minimal demo app to show how to use Weaviate in a React app to perform AI-powered search.

The app uses the [Weaviate Javascript/Typescript client](https://www.npmjs.com/package/weaviate-ts-client), and the [OpenAI API](https://beta.openai.com/).

It connects to a Weaviate instance running on the cloud (at https://edu-demo.weaviate.network), with a read-only Weaviate API key that allows you to perform search queries.

## Key components

The bulk of the `AI` functionality is implemented in the `SearchBox` component.

- `connectToWeaviate` is a helper function that creates a Weaviate client and connects to the Weaviate instance.
- `queryBuilder` is a helper function that builds the base query, upon which the search query can be built.
- The vector search functionality is implemented via the `mainSearch` function.
- The RAG (retrieval augmented generation) functionality is implemented via the `generateSinglePrompt` and `generateGroupedTask` purposes.

For demonstration purposes, the `QuestionCard` component implements some additional RAG functionality and vector distance calculation, by directly leveraging the OpenAI API. Note that in the `SearchBox` component, similar functionalities are abstracted and implemented via the Weaviate API.



## How to run

1. Clone this repo

2. Install dependencies

```bash
npm install
```

3.  Add your OpenAI API key to the `.env` file

Create a file called `.env` in the root of the project and add your OpenAI API key to it, with the following format:

```bash
VITE_OPENAI_APIKEY=<your-api-key>
```

You can get an API key from the OpenAI site (https://platform.openai.com).

4. Run the app

```bash
npm run dev
```

5. Open the app in your browser at http://127.0.0.1:5173/

## Further resources

### Other demo apps

For another amazing demo app, check out [Verba](https://github.com/weaviate/Verba)!

### Learn more about Weaviate

Check out the [Quickstart guide](https://weaviate.io/developers/weaviate/quickstart) to get started with Weaviate in just 20 or so minutes.

### How do vectors work?

This blog post explains how [vectorization works](https://weaviate.io/blog/vector-embeddings-explained). It's a great read!

We also have [this app](https://huggingface.co/spaces/jphwang/colorful_vectors) to visually explain how vectorization can represent meaning and similarity.
