import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiBackspace, HiStar } from 'react-icons/hi';
import { checkWord } from '../../libs/wordbook.utils';
const ResultPanel = ({ hideResult }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  useEffect(() => {
    // Listen to message from content.js using storage update

    chrome.storage.onChanged.addListener(function (changes, namespace) {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key == 'word') {
          // Check if word is in wordbook
          const getData = async () => {
            // Send message runtime to background.js
            chrome.runtime.sendMessage(
              { type: 'checkWord', text: newValue },
              function ({ data }) {
                setIsFavorite(data);
              }
            );
          };

          getData();
        }
      }
    });
  }, []);

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
          <button
            id="result-panel-header-bookmark"
            className={`${isFavorite ? 'favorited' : ''}`}
            onClick={async () => {
              // Send chrome message to storage
              // Read currentWordData from chrome.storage.sync
              // Check if currentWordData is in wordbook
              chrome.storage.sync.get(
                ['currentWordData'],
                async function (result) {
                  if (result.currentWordData) {
                    // Send message runtime to background.js
                    chrome.runtime.sendMessage(
                      {
                        type: 'addWord',
                        data: result.currentWordData,
                      },
                      function ({ data }) {
                        setIsFavorite(data);
                      }
                    );
                  }
                }
              );
            }}
          >
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
