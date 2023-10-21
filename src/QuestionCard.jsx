"use strict";

import React, { useState } from "react";
import parse from "html-react-parser";
import axios from 'axios';

const QuestionCard = ({
  answer = "",
  question = "",
  category = "",
  generatedIsLoading,
  generated,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerAttempt, setAnswerAttempt] = useState('');
  const [answerAnalysis, setAnswerAnalysis] = useState('');
  const [answerDistance, setAnswerDistance] = useState(null);

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_APIKEY;

  const toggleAnswer = (e) => {
    e.preventDefault();
    setShowAnswer(!showAnswer);
  };

  function dotProduct(vecA, vecB) {
    if (vecA.length !== vecB.length) {
      throw 'Vectors are of different lengths!';
    }

    let product = 0;
    for (let i = 0; i < vecA.length; i++) {
      product += vecA[i] * vecB[i];
    }

    return product;
  }

  function magnitude(vec) {
    return Math.sqrt(vec.reduce((sum, val) => sum += val * val, 0));
  }

  function cosineSimilarity(vecA, vecB) {
    const dotProductAB = dotProduct(vecA, vecB);
    const magnitudeA = magnitude(vecA);
    const magnitudeB = magnitude(vecB);

    if (magnitudeA === 0 || magnitudeB === 0) {
      throw 'One of the vectors has zero magnitude!';
    }

    return dotProductAB / (magnitudeA * magnitudeB);
  }

  const getEmbedding = async (source_text) => {
    return axios.post('https://api.openai.com/v1/embeddings', {
      input: source_text,
      model: 'text-embedding-ada-002',
      encoding_format: 'float'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    })
    .then(response => {
      return response.data.data[0].embedding
    })
    .catch(error => console.error('Error:', error));
  }

  const clickHandler = async () => {

    setAnswerAnalysis('loading...');

    axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Answer very briefly whether ${answerAttempt} will be deemed correct against the provided answer of ${answer} to the Jeopardy! question: ${question}. Keep the explanation very brief, to two sentences to four sentences maximum.`,
      max_tokens: 200,
      temperature: 0
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    })
    .then(response => {
      setAnswerAnalysis(response.data.choices[0].text)
    })
    .catch(error => console.error('Error:', error));

    Promise.all([getEmbedding(answerAttempt), getEmbedding(answer)])
    .then(([userAnswerEmbedding, correctAnswerEmbedding]) => {
      const cosDist = 1 - cosineSimilarity(userAnswerEmbedding, correctAnswerEmbedding);
      setAnswerDistance(cosDist);
    })
    .catch(error => console.error('Error:', error));
  }

  let content = question;
  let imageURL = "";

  if (question.includes("(<a href=")) {
    const urlMatch = question.match(
      /<a href="([^"]*)" target="_blank">([^<]+)<\/a>/,
    );
    if (urlMatch && urlMatch[1]) {
      imageURL = urlMatch[1];
      content = question.replace(urlMatch[0], urlMatch[2]);
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

              <div className="card my-2">
                <div className="card-body">
                  <div className="card-text">
                    <label className="text-body-secondary text-align-left">
                      Can you answer the question?
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Answer"
                      onChange={(e) => setAnswerAttempt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          clickHandler();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm my-2"
                      onClick={clickHandler}
                    >
                      Check answer
                    </button>
                  </div>
                  {
                    answerDistance ? (
                      <div className="my-2">
                        <small>Vector distance vs correct answer: <span class="badge rounded-pill bg-light text-dark"> {answerDistance.toFixed(4)} </span></small></div>
                    ) : (
                      null
                    )
                  }
                  {answerAnalysis.length > 0 ? (
                    <div className="text-secondary">
                      <small>{answerAnalysis}</small>
                    </div>
                  ) : (
                    null
                  )}
                </div>
              </div>

              {showAnswer ? (
                <>
                  <p>
                    <strong>{answer}</strong>
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
        {generatedIsLoading ? (
          <div className="col-md-6">Loading AI-generated hint...</div>
        ) : null}
        {generated ? (
          <div className="col-md-6">
            <div className="card my-2">
              <div className="card-header">AI-generated hint:</div>
              <div className="card-body">
                <div className="card-text">{generated}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default QuestionCard;
