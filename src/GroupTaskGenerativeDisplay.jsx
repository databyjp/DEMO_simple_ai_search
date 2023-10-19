export default function GroupTaskGenerativeDisplay({ groupedGenerativeResponse, groupedGenerativeIsLoading }) {
  if (groupedGenerativeIsLoading == false) {
    if (groupedGenerativeResponse == null) {
      return (
        <div>
          Nothing to see here
        </div>
      )
    } else {
      const generatedText = groupedGenerativeResponse.data.Get['JeopardyQuestion'][0]['_additional']['generate']['groupedResult'];
      return (
        <>
          <div className="card my-2">
            <div className="card-body">
              <div className="card-text">
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