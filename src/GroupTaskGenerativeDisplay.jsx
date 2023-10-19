export default function GroupTaskGenerativeDisplay({ groupedGenerativeResponse, groupedGenerativeIsLoading }) {

  let generatedText;

  if (groupedGenerativeIsLoading == false) {
    if (groupedGenerativeResponse == null) {
      return (
        <div>
          Nothing to see here
        </div>
      )
    } else {
      if (groupedGenerativeResponse.data.Get['JeopardyQuestion'].length > 0) {
        generatedText = groupedGenerativeResponse.data.Get['JeopardyQuestion'][0]['_additional']['generate']['groupedResult'];
      } else {
        generatedText = 'Sorry, nothing here.';
      }

      return (
        <>
          <div className="card my-2">
            <div className="card-body">
              <div className="card-text" style={{ whiteSpace: 'pre-line' }}>
                {generatedText}
              </div>
            </div>
          </div>
        </>
      )
    }
  } else {
    return (
      <>
        Please wait...
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </>
    )
  }
};