"use strict";

import { useState } from 'react';
import weaviateLogo from './assets/weaviate-logo-light-transparent-200.png';
import heroBg from './assets/bg.png';
import SearchBox from './SearchBox.jsx';
import SearchDisplay from './SearchDisplay';
import GroupTaskGenerativeDisplay from './GroupTaskGenerativeDisplay';

function App() {

  const [searchResults, setSearchResults] = useState(null);
  const [groupedGenerativeResponse, setGroupedGenerativeResponse] = useState(null);
  const [groupedGenerativeIsLoading, setGroupedGenerativeIsLoading] = useState(false);
  const [singleGenerativeResponse, setSingleGenerativeResponse] = useState(null);
  const [singleGenerativeIsLoading, setSingleGenerativeIsLoading] = useState(false);

  return (
    <>
      <div className="container my-5">
        <div className="p-5 text-center rounded-3 border border-light rounded" style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          backgroundImage: `url(${heroBg})`, // Add this line
          backgroundSize: 'cover', // Optional: you might want to cover the entire element
          backgroundPosition: 'center' // Optional: center the image
          }}
        >
          <div className="container px-4 pt-5">
            <img src={weaviateLogo} width="80px"></img>
            <h1 className="pb-2">QuizBuddAI</h1>
            <h4 className="text-secondary">Test your trivia knowledge with a 🤖 friend.</h4>
          </div>
          <div className="row row-cols-1 align-items-md-center g-5 pt-4 pb-2">
            <div className="col d-flex flex-column align-items-left gap-2" style={{ paddingLeft: '20%', paddingRight: '20%' }}>
              <SearchBox
                setSearchResults={setSearchResults}
                setGroupedGenerativeResponse={setGroupedGenerativeResponse}
                setGroupedGenerativeIsLoading={setGroupedGenerativeIsLoading}
                setSingleGenerativeResponse={setSingleGenerativeResponse}
                setSingleGenerativeIsLoading={setSingleGenerativeIsLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-4 my-4 border border-dark rounded" style={{backgroundColor: '#f5f5f5'}}>
        <div className="row row-cols-1 align-items-md-center g-5 py-2">
          <div className="col d-flex flex-column align-items-md-center gap-2">
            <h2 className="py-2 border-bottom">Generative output</h2>
            <GroupTaskGenerativeDisplay groupedGenerativeResponse={groupedGenerativeResponse} groupedGenerativeIsLoading={groupedGenerativeIsLoading} />
          </div>
        </div>
      </div>

      <div className="container px-4 py-4 my-4 border border-dark rounded" style={{backgroundColor: '#f5f5f5'}}>
        <div className="row row-cols-1 align-items-md-center g-5 py-2">
          <div className="col d-flex flex-column align-items-md-center gap-2">
            <h2 className="py-2 border-bottom">Search results</h2>
            <SearchDisplay searchResults={searchResults} singleGenerativeResponse={singleGenerativeResponse} singleGenerativeIsLoading={singleGenerativeIsLoading} />
          </div>
        </div>
      </div>

      <div className="container px-4 pt-2">
        <div className="card mt-1 mb-4">
          <div className="card-header">
            Built with Weaviate <img src={weaviateLogo} width="30px" style={{ marginTop: '-5px' }}></img>
          </div>
        </div>
      </div>
      <div className="container px-4 pb-5">
        <small>
          Original questions from TV show <i>Jeopardy!</i>. Dataset from <a href="https://www.kaggle.com/datasets/tunguz/200000-jeopardy-questions">Kaggle</a>.
        </small>
      </div>
    </>
  )
}

export default App
