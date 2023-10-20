"use strict";

import React, { useState } from "react";
import parse from "html-react-parser";

const QuestionCard = ({
  title = "",
  body = "",
  category = "",
  generatedIsLoading,
  generated,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = (e) => {
    e.preventDefault();
    setShowAnswer(!showAnswer);
  };

  let content = body;
  let imageURL = "";

  if (body.includes("(<a href=")) {
    const urlMatch = body.match(
      /<a href="([^"]*)" target="_blank">([^<]+)<\/a>/,
    );
    if (urlMatch && urlMatch[1]) {
      imageURL = urlMatch[1];
      content = body.replace(urlMatch[0], urlMatch[2]);
    }
  }

  const options = {
    replace: ({ attribs }) => {
      if (!attribs) return;

      if (attribs.href) {
        return (
          <img
            src={attribs.href}
            width="50%"
            alt={` (Jeopardy image at: ${attribs.href}) `}
          />
        );
      }
    },
  };

  return (
    <>
      <div className="row my-4 align-items-start">
        <div className={`col-md-${generated ? 6 : 12}`}>
          <div className="card my-2">
            <div className="card-body">
              <div className="card-text">
                <p>
                  <small>
                    Category:{" "}
                    <span className="badge bg-secondary">{category}</span>
                  </small>
                </p>
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Content visual representation"
                    style={{ maxWidth: "100%" }}
                  />
                )}
                <p className="card-text">Question: {parse(content, options)}</p>
              </div>
              {showAnswer ? (
                <>
                  <p>
                    <strong>{title}</strong>
                  </p>
                  <a href="#" onClick={toggleAnswer}>
                    Hide the answer
                  </a>
                </>
              ) : (
                <a href="#" onClick={toggleAnswer}>
                  See the answer
                </a>
              )}
            </div>
          </div>
        </div>
        {
          generatedIsLoading ? (
            <div className="col-md-6">
              Loading AI-generated hint...
            </div>
          ) :
          ( null )
        }
        {
          generated ? (
            <div className="col-md-6">
            <div className="card my-2">
              <div className="card-header">AI-generated hint:</div>
                <div className="card-body">
                  <div className="card-text">{generated}</div>
                </div>
            </div>
          </div>
          ) :
          ( null )
        }
      </div>
    </>
  );
};

export default QuestionCard;
