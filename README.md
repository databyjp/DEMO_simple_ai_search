# Weaviate DEMO - AI search app

This is a minimal demo app to show how to use Weaviate in a React app to perform AI-powered search.

The app uses the [Weaviate Javascript/Typescript client](https://www.npmjs.com/package/weaviate-ts-client), and the [OpenAI API](https://beta.openai.com/).

It connects to a Weaviate instance running on the cloud (at https://edu-demo.weaviate.network), with a read-only Weaviate API key that allows you to perform search queries.

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

4. Run the app

```bash
npm run dev
```

5. Open the app in your browser at http://127.0.0.1:5173/
