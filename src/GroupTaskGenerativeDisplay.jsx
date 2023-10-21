"use strict";

import weaviateLogo from "./assets/weaviate-logo-light-transparent-200.png";

export default function GroupTaskGenerativeDisplay({
  groupedGenerativeResponse,
  groupedGenerativeIsLoading,
}) {
  let generatedText;

  if (groupedGenerativeIsLoading == false) {
    if (groupedGenerativeResponse == null) {
      // Is there a value
      return <div />;
    } else {
      if (groupedGenerativeResponse.data.Get.JeopardyQuestion.length > 0) {
        // Are there results?
        try {
          generatedText =
            groupedGenerativeResponse.data.Get.JeopardyQuestion[0]._additional
              .generate.groupedResult;
          try {
            generatedText = JSON.parse(generatedText);
          } catch (error) {
            console.log(`Error parsing text: ${error}. Source data:`);
            console.log(generatedText);
            <div />;
          }
        } catch (error) {
          console.log(`No generated data found.`);
          generatedText = "Sorry, nothing here.";
          return <div />;
        }
      } else {
        generatedText = "Sorry, nothing here.";
        <div />;
      }

      return (
        <>
          <div
            className="container px-4 py-4 my-4 border border-dark rounded"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <div className="row row-cols-1 align-items-md-center g-5 py-2">
              <div className="col d-flex flex-column align-items-md-center gap-2">
                <h2 className="py-2 border-bottom">
                  <img
                    src={weaviateLogo}
                    width="40px"
                    style={{ marginTop: "-5px" }}
                  ></img> Generative output</h2>
                <div className="card my-2">
                  <div className="card-body">
                    <div
                      className="card-text"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {generatedText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div
          className="container px-4 py-4 my-4 border border-dark rounded"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div className="row row-cols-1 align-items-md-center g-5 py-2">
            <div className="col d-flex flex-column align-items-md-center gap-2">
              Please wait...
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
