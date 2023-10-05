import { useEffect, useState } from 'react';
import weaviate from 'weaviate-ts-client';
import Card from './Card'

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
        {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'} */}
        <div class="row">
        {data ? data.map(d => <Card title={d.answer} body={d.question} btn_body={d._additional.id} />) : 'Loading...'}
        </div>
      </div>
    </>
  );
}
