import React, { useEffect, useState } from 'react';
import { updateFreq } from '../../../../libs/wordbook.utils';

const Fill = ({ data }) => {
  const [isTried, setIsTried] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  useEffect(() => {
    if (isTried) {
      if (!isCorrect) {
        setTimeout(() => {
          setIsTried(false);
        }, 1000);
      }
    }
  }, [isTried]);

  return (
    <div className="flex flex-col gap-8 w-full items-center">
      {isTried && (
        <div
          className={`transition-all ease-in-out duration-200 absolute  m-4 ${
            isTried ? 'right-0 rotate-[15deg]' : ' right-[-50px]'
          } p-2 rounded-lg border-[1px] shadow-lg`}
        >
          <span className="text-6xl  text-teal-800">
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </span>
        </div>
      )}
      {data && (
        <div className="flex flex-col gap-4 h-full w-full">
          {
            <span className="flex gap-2 items-center text-2xl">
              {data.question_content.map((part) => {
                return (
                  <div>
                    {part.toLowerCase() === data.answer.toLowerCase() ? (
                      !isCorrect ? (
                        <input className="border-2 border-gray-300 rounded-md w-20 h-10" />
                      ) : (
                        <input
                          className="border-2 border-gray-300 rounded-md w-20 h-10 text-blue-600"
                          value={data.answer}
                        />
                      )
                    ) : (
                      part
                    )}
                  </div>
                );
              })}
            </span>
          }

          <div className="flex gap-4 items-center justify-center">
            {data.choices.map((choice) => {
              return (
                <button
                  className="p-4 bg-blue-500 text-4xl  hover:bg-blue-400 text-white hover:bg-blue-700 transition-all ease-in-out duration-150 rounded-lg"
                  onClick={() => {
                    let check =
                      data.answer.toLowerCase() === choice.toLowerCase();

                    if (check) {
                      setIsCorrect(true);
                      updateFreq(data.word);
                    }

                    setIsTried(true);
                  }}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Fill;
