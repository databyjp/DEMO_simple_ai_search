import { useEffect, useState } from 'react';
import weaviate from 'weaviate-ts-client';

export default function ObjExplorer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function GetObjs() {
      const client = weaviate.client({
        scheme: 'https',
        host: 'edu-demo.weaviate.network',
        apiKey: new weaviate.ApiKey('learn-weaviate'),
        headers: { 'X-OpenAI-Api-Key': import.meta.env.REACT_APP_OPENAI_APIKEY },
      });

      try {
        let result = await client
          .graphql
          .get()
          .withClassName('JeopardyQuestion')
          .withFields('question')
          .withLimit(5)
          .do();

        console.log(result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    GetObjs();
  }, []);

  return (
    <>
      <div>
        "Hiya"
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
      </div>
    </>
  );
}
