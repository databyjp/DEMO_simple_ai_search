import React, { useState } from "react";

const ObjCard = ({title="", body="", uuid=""}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = (e) => {
    e.preventDefault();
    setShowAnswer(!showAnswer);
  }

  let content = body;
  let imageURL = '';

  if (body.includes('<a href=')) {
    const urlMatch = body.match(/<a href="([^"]*)" target="_blank">([^<]+)<\/a>/);
    if (urlMatch && urlMatch[1]) {
      imageURL = urlMatch[1];
      content = body.replace(urlMatch[0], urlMatch[2]);
    }
  }

  return (
    <>
      <div>
        <div class="card my-2">
          <div class="card-body">
            <p class="card-text">
              {imageURL && <img src={imageURL} alt="Content visual representation" style={{ maxWidth: '100%' }} />}
              <p className="card-text">
                {content}
              </p>
            </p>
            {
              showAnswer ? (
                <>
                  <p><strong>{title}</strong></p>
                  <span class="badge bg-secondary"><a href="#" class="text-white" onClick={toggleAnswer}>Hide the answer</a></span>
                </>
              ) : (
                <span class="badge bg-secondary"><a href="#" class="text-white" onClick={toggleAnswer}>See the answer</a></span>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ObjCard;