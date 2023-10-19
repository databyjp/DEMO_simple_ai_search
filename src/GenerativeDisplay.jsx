export default function GenerativeDisplay({ generativeResponse }) {
  if (generativeResponse === null) {
    return (
      <div>
        Nothing to see here
      </div>
    )
  } else {
    const generatedText = generativeResponse.data.Get['JeopardyQuestion'][0]['_additional']['generate']['groupedResult'];
    return (
      <>
        <div>
          {generatedText}
        </div>
      </>
    )
  }
};