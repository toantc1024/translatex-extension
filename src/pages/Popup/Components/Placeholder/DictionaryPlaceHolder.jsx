import React, { Fragment, useEffect, useState } from 'react';
import { getWordOfTheDay } from '../../../../libs/wordbook.utils';

const DictionaryPlaceHolder = ({ searchWord }) => {
  const [word, setWord] = useState(null);

  useEffect(() => {
    (async () => {
      let data = await getWordOfTheDay();
      setWord(data);
    })();
  }, []);

  useEffect(() => {}, [word]);

  return (
    <div className="z-0 relative text-gray-600 border-[1px] p-2 rounded-lg  mt-2 text-4xl h-[400px] flex flex-col items-center justify-center">
      {word && (
        <Fragment>
          <div></div>
          <span className="text-2xl">Từ của ngày hôm nay</span>
          <div
            className="p-4 border-[1px] rounded-full hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-600 transition-all ease-in-out duration-150 hover:text-white m-2 cursor-pointer z-0"
            onClick={() => {
              searchWord(word['word']);
            }}
          >
            {word['word']}
          </div>
          <div className="text-sm flex  text-center items-center justify-center">
            {JSON.stringify(
              word['meanings'][0]['definitions'][0]['definition_vi']
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default DictionaryPlaceHolder;
