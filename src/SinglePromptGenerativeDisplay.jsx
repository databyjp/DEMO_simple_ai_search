import GenDataCard from './GenDataCard';

export default function SinglePromptGenerativeDisplay({ singleGenerativeResponse, singleGenerativeIsLoading }) {

  if (singleGenerativeIsLoading == false) {
    if (singleGenerativeResponse == null) {
      return (
        <div>
          Nothing to see here
        </div>
      )
    } else {

      const genData = singleGenerativeResponse.data.Get.JeopardyQuestion

      return (
        <div>
          <div className='border-secondary-subtle-2'>
            {genData.map(s => (<GenDataCard key={s.question} body={s._additional.generate.singleResult} />))}
          </div>
        </div>
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

  // return (
  //   <div>
  //     {JSON.stringify(singleGenerativeResponse)}
  //     <br/>
  //     {JSON.stringify(singleGenerativeIsLoading)}
  //   </div>
  // )
  // if (singleGenerativeIsLoading == false) {
  //   if (singleGenerativeResponse == null) {
  //     return (
  //       <div>
  //         Nothing to see here
  //       </div>
  //     )
  //   } else {
  //     const generatedText = singleGenerativeResponse;
  //     return (
  //       <>
  //         <div className="card my-2">
  //           <div className="card-body">
  //             <div className="card-text">
  //               {generatedText}
  //             </div>
  //           </div>
  //         </div>
  //       </>
  //     )
  //   }
  // } else {
  //   return (
  //     <>
  //       Please wait...
  //       <div className="spinner-border text-secondary" role="status">
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </>
  //   )
  // }
};