import React, { useState } from 'react';
import { MdOutlineKeyboardVoice } from 'react-icons/md';
const SearchBar = ({ wordMeaning, getWordMeaning, text, setText, route }) => {
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestWord, setSuggestWord] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const getWordSuggestion = async (value) => {
    setShowSuggest(true);
    let response = await fetch(`${route}/suggest`, {
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

  const splitWords = (word, pattern) => {
    let a = word.substr(0, pattern.length);
    let b = word.substr(pattern.length);
    if (b.length) {
      return [a, b];
    }
    return [a];
  };

  return (
    <div class="relative ">
      <div
        class={`absolute top-0 bottom-0 m-auto  inset-y-0 left-[5px]  flex items-center flex items-center justify-center w-[40px] h-[40px]  rounded-full w- cursor-pointer ${
          isSpeaking
            ? 'text-blue-400 bg-blue-200 animate-pulse'
            : 'text-gray-600  hover:text-gray-400'
        }`}
        onClick={async () => {
          const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
          setIsSpeaking(true);
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          recognition.start();
          recognition.continuous = false;
          recognition.interimResults = true;
          // Set time out for 2s
          let timeOut = setTimeout(() => {
            recognition.stop();
          }, 3000);
          recognition.onresult = async (event) => {
            setIsSpeaking(false);
            let text = event.results[0][0].transcript;
            if (!text) return;
            setText(text);
            clearTimeout(timeOut);
            await getWordMeaning(text);
            console.log(wordMeaning);
          };
          recognition.onend = () => {
            setIsSpeaking(false);
            clearTimeout(timeOut);
            // You can restart the service if needed
          };
        }}
      >
        <MdOutlineKeyboardVoice className="text-2xl" />
      </div>
      <input
        type="search"
        id="dictionary-search"
        autoComplete="off"
        class="block w-full p-4 pl-[50px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:ring-1"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          getWordSuggestion(e.target.value);
        }}
        placeholder="Bạn cần tìm từ gì?"
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            console.log(e.target.nextSibling.firstChild);
            e.target.nextSibling.firstChild.focus();
          }
          if (e.key === 'Enter') {
            getWordMeaning(e.target.value);
            setShowSuggest(false);
          }
        }}
      />

      {suggestWord && suggestWord.length > 0 && (
        <ul
          tabIndex={0}
          className={`z-10 mt-2 w-full max-h-[200px] h-auto border border-gray-300 rounded-md bg-white absolute overflow-y-auto ${
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
                  className="focus:bg-red-400 text-sm cursor-pointer active:bg-slate-200 p-4 hover:bg-gray-100 w-full bg-slate-50 z-10"
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
                          i == 0 ? 'font-bold text-blue-500' : 'text-gray-600'
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
  );
};

export default SearchBar;
