import { useEffect, useState } from 'react';
import weaviate from 'weaviate-ts-client';
import ObjCard from './ObjCard'

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
          .withFields('question answer _additional { id }')
          .withLimit(6)
          .do();

        console.log(result);
        setData(result.data.Get.JeopardyQuestion);
      } catch (error) {
        console.error(error);
      }
    }

    GetObjs();
  }, []);

  return (
    <>
      <div>
        <div class="row">
        {data ? data.map(d => <ObjCard key={d._additional.id} title={d.answer} body={d.question} uuid={d._additional.id} />) : 'Loading...'}
        </div>
      </div>
    </>
  );
}
