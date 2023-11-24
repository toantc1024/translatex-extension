import React, { useEffect, useState } from 'react';
import { updateFreq } from '../../../../libs/wordbook.utils';

const Typing = ({ data }) => {
  const [inputValues, setInputValues] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isTried, setIsTried] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsTried(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isTried]);

  useEffect(() => {
    setInputValues(new Array(data['question_content'].length).fill(''));
  }, [data]);

  const handleInputChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
    let inputContent = document.getElementById('input-content').children;
    console.log(inputContent);
    if (!inputContent) return;
    for (let i = index; i < inputContent.length; i++) {
      if (!inputContent[i].value) inputContent[i].focus();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <div className="text-6xl flex gap-2 relative" id="input-content">
        {data &&
          data['question_content'].map((char, index) => {
            return (
              <input
                key={index}
                className={`text-6xl  text-gray-600 w-[70px] text-center flex items-center justify-center h-auto border-[1px] rounded-xl p-2 ${
                  isCorrect
                    ? 'bg-green-400'
                    : 'focus:outline-blue-600 focus:outline-2'
                }   `}
                disabled={true}
                value={!isCorrect ? char : data['answer'][index]}
              />
            );
          })}
      </div>

      <div className="max-w-[400px] flex items-center justify-center">
        <span className="italic text-gray-600 text-lg  text-wrap">
          Hint: {data['meaning']}
        </span>
      </div>

      {isTried && (
        <div
          className={`transition-all ease-in-out duration-200 absolute  m-4 ${
            isTried ? 'right-0 rotate-[15deg]' : ' right-[-150px]'
          } p-2 rounded-lg border-[1px] shadow-lg`}
        >
          <span className="text-6xl  text-teal-800">
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </span>
        </div>
      )}
      <div>
        <div>
          <h1>{data['question_content_title']}</h1>
        </div>
        <input
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              if (
                e.target.value.toLowerCase() === data['answer'].toLowerCase()
              ) {
                setIsCorrect(true);
                setIsTried(true);
                await updateFreq(data['word']);
              } else {
                setIsCorrect(false);
                setIsTried(true);
              }
            }
          }}
          placeholder="Type your answer"
          type="te xt"
          className={`p-2 h-[75px]  transition-outline ease-in-out duration-150  text-xl border-[5px] focus:outline-2 ${
            isCorrect
              ? 'focus:bg-teal-100 bg-teal-200'
              : 'focus:bg-blue-100 focus:outline-blue-600 border-blue-500'
          } w-full rounded-lg`}
        />
      </div>
    </div>
  );
};

export default Typing;
