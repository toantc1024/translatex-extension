import React, { useState } from 'react';
import WordCard from './WordCard/WordCard';
import SearchBar from './SearchBar/SearchBar';
import { ROOT_ROUTE } from '../constants';
import DictionaryPlaceHolder from './Placeholder/DictionaryPlaceHolder';
const Dictionary = () => {
  const [data, setData] = useState(null);
  const [text, setText] = useState('');

  const getWordMeaning = async (value) => {
    let response = await fetch(`${ROOT_ROUTE}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: value }),
    });
    let { word } = await response.json();
    setData(word);
  };

  return (
    <div className="h-full max-h-[519px] overflow-auto w-auto">
      {/* Word input */}
      <div className="w-full relative p-4 ">
        <SearchBar
          getWordMeaning={getWordMeaning}
          text={text}
          setText={(value) => setText(value)}
          route={ROOT_ROUTE}
        />
        {data ? (
          <WordCard
            data={data}
            searchWord={(word) => {
              setText(word);
              getWordMeaning(word);
              // setShowSuggest(false);
            }}
          />
        ) : (
          <DictionaryPlaceHolder
            searchWord={(word) => {
              setText(word);
              getWordMeaning(word);
              // setShowSuggest(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dictionary;
