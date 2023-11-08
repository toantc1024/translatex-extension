import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiBackspace, HiStar } from 'react-icons/hi';
const ResultPanel = ({ hideResult }) => {
  return (
    <div id="result-panel">
      <div id="result-panel-header">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '.15rem',
          }}
        >
          <button id="result-panel-header-bookmark">
            {/* When I click in this button, store the word */}
            <HiStar className="text-4xl text-gray-400" />
          </button>
          <button
            id="result-panel-header-close"
            onClick={() => {
              hideResult();
            }}
          >
            <AiOutlineClose className="text-4xl text-gray-400" />
          </button>
        </div>
      </div>
      <div id="result-content">
        {/* Pronunciation  */}
        <div role="pronouncation">
          <span></span>
        </div>

        {/* Meaning  */}

        {/* Examples */}
      </div>
    </div>
  );
};

export default ResultPanel;
