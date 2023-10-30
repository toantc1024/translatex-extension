import React, { useEffect, useState } from 'react';

const Dictionary = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState(null);
  const [suggestWord, setSuggestWord] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);

  const getWordMeaning = async (value) => {
    let response = await fetch('http://127.0.0.1:4000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: value }),
    });
    let { word } = await response.json();
    setData(word);
  };

  const getWordSuggestion = async (value) => {
    setShowSuggest(true);
    let response = await fetch('http://127.0.0.1:4000/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: value }),
    });

    let { suggest } = await response.json();
    if ((suggest != null || suggest != undefined) && suggest.length > 0)
      setSuggestWord(suggest);
    else setSuggestWord([]);
  };

  useEffect(() => {
    console.log({ suggestWord });
  }, [suggestWord]);

  const splitWords = (word, pattern) => {
    let a = word.substr(0, pattern.length);
    let b = word.substr(pattern.length);
    if (b.length) {
      return [a, b];
    }
    return [a];
  };

  return (
    <div className="h-full w-full">
      {/* Word input */}
      <div className="w-full relative p-4 ">
        <div class="relative ">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="dictionary-search"
            autoComplete="off"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:ring-1"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              getWordSuggestion(e.target.value);
            }}
            placeholder="Search word"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                getWordMeaning(e.target.value);
                setShowSuggest(false);
              }
            }}
          />

          {suggestWord && suggestWord.length > 0 && (
            <ul
              tabIndex={0}
              className={` mt-2 w-full max-h-[200px] h-auto border border-gray-300 rounded-md bg-white absolute overflow-y-auto ${
                showSuggest ? '' : 'hidden'
              }`}
            >
              {showSuggest &&
                suggestWord &&
                suggestWord.length > 0 &&
                suggestWord.map((suggest, index) => {
                  return (
                    <li
                      key={index}
                      role="option"
                      aria-selected={true}
                      className="text-sm cursor-pointer active:bg-slate-200 p-4 hover:bg-gray-100 w-full bg-slate-50"
                      onClick={() => {
                        setText(suggest);
                        getWordMeaning(suggest);
                        setShowSuggest(false);
                      }}
                    >
                      {splitWords(suggest, text).map((part, i) => {
                        return (
                          <a
                            className={`${
                              i == 0
                                ? 'font-bold text-sky-500'
                                : 'text-gray-600'
                            }`}
                          >
                            {part}
                          </a>
                        );
                      })}
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
        {data && (
          <div>
            {/* Word title */}
            <div className="p-4 border-b-[1px] flex gap-2">
              <span className="text-2xl font-bold">{data['word']}</span>
              <span className="text-xl font-light">{data['phonetic']}</span>
            </div>

            {/* Meaning */}
            <div className="mt-2 bg-white border-[1px] rounded-lg">
              {data.meanings &&
                data.meanings.map((meaning) => {
                  return (
                    <div className="p-2">
                      <h1 className="text-lg italic p-2">
                        {meaning.partOfSpeech}
                      </h1>
                      <div className="border-gray border-[1px] rounded-lg p-2">
                        <h1 className="font-extrabold bg-blue-600 rounded-lg p-2 text-white ">
                          Định nghĩa
                        </h1>
                        {meaning.definitions &&
                          meaning.definitions.map((definition, i) => {
                            return (
                              <div className="text-2sm p-2 text-gray-600 flex flex-col">
                                <span className="font-bold ">
                                  {definition['definition']}
                                </span>
                                <span>{definition['definition_vi']}</span>

                                {definition['example'] && (
                                  <li>{definition['example']}</li>
                                )}

                                <div className="flex gap-2">
                                  {definition['synonyms'].map((synonym) => {
                                    return (
                                      <div className="bg-red-400 p-2 rounded-lg">
                                        {synonym}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
