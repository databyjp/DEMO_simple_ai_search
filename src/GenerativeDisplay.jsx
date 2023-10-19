export default function GenerativeDisplay({ generativeResponse, generativeIsLoading }) {
  if (generativeIsLoading == false) {
    if (generativeResponse == null) {
      return (
        <div>
          Nothing to see here
        </div>
      )
    } else {
      const generatedText = generativeResponse.data.Get['JeopardyQuestion'][0]['_additional']['generate']['groupedResult'];
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
        <div class="spinner-border text-secondary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </>
    )
  }
};