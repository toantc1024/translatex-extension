import React, { useEffect, useState } from 'react';
import { getAllWord, getFreq } from '../../../libs/wordbook.utils';

const Memory = () => {
  const [wordList, setWordList] = useState([]);
  const [freqList, setFreqList] = useState(null);
  useEffect(() => {
    (async () => {
      let response = await getAllWord();
      console.log(response);
    })();
    (async () => {
      let response = await getFreq();
      console.log(response);
      setFreqList(response);
    })();
  }, []);
  const getColor = (freq) => {
    if (freq > 5) {
      return '#60a5fa'; // blue in HSL
    } else if (freq > 2) {
      return '#38bdf8'; // yellow in HSL
    } else {
      return '#06b6d4   '; // green in HSL
    }
  };

  useEffect(() => {
    console.log(freqList);
  }, [freqList]);
  return (
    <div className="w-full h-full">
      <div className="py-4 px-4 bg-blue-500 text-white border-b-[1px] text-gray-600 font-bold w-full z-[1000] bg-white text-2xl">
        Long-term memory-list
      </div>
      <div className="flex flex-col gap-2 p-2">
        {freqList &&
          Object.entries(freqList)
            .sort((a, b) => {
              if (a[1] > b[1]) return -1;
              if (a[1] < b[1]) return 1;
              return 0;
            })
            .map((entry) => {
              return (
                <div
                  className={`bg-blue-600 text-white p-4 w-full rounded-lg`}
                  style={{ backgroundColor: getColor(entry[1]) }}
                >
                  {entry[0]}: {entry[1]}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Memory;
