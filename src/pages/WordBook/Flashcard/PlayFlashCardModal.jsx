import React, { useEffect, useState } from 'react';
import Card from './Card/Card';
import {
  FILL_QUESTION,
  FLASH_CARD_QUESTION,
  TYPING_QUESTION,
  addToMemory,
  buildQuestionForWord,
  makeQuestions,
} from '../../../libs/wordbook.utils';
import Typing from './Typing/Typing';
import Fill from './Fill/Fill';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { HiStar, HiX } from 'react-icons/hi';

const PlayFlashCardModal = ({ questionList, exit, numberOfWords }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionSequence, setQuestionSequence] = useState(null);
  const [isAnswered, setIsAnswered] = useState(undefined);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLearned, setIsLearned] = useState(false);
  const resetState = () => {
    setIsAnswered(false);
    setIsFlipped(undefined);
    setIsLearned(false);
  };

  const [resultModal, setResultModal] = useState(false);

  const showResultModal = () => {
    setResultModal(true);
    // exit();
  };

  useEffect(() => {
    (async () => {
      let questions = await makeQuestions(questionList);
      console.log(questions);
      setQuestionSequence(questions);
    })();
  }, []);

  return (
    <div
      className="absolute bg-white w-full h-full flex items-center justify-center"
      style={{ zIndex: 99999999999999 }}
    >
      {resultModal && (
        <div
          className="absolute w-full h-full bg-blue-600 flex items-center justify-center"
          style={{ zIndex: 99999999999999 }}
        >
          <div className="w-[500px] h-[500px] bg-white rounded-xl flex items-center justify-center flex-col gap-4">
            <div className="text-2xl font-bold text-gray-600">Result</div>
            <div className=" font-bold  text-4xl bg-blue-600 p-2 rounded-lg text-white">
              You have learned {numberOfWords} words
            </div>
            <div className="">
              {[
                ...new Array(
                  Math.floor(numberOfWords / 10) == 0
                    ? 1
                    : Math.floor(numberOfWords / 10) >= 5
                    ? 5
                    : Math.floor(numberOfWords / 10)
                ),
              ].map((item, index) => (
                <HiStar className="text-4xl text-yellow-400 animate-bounce" />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-full flex items-center justify-center">
        {questionSequence && (
          <div>
            {questionSequence[currentQuestionIndex].question_type ===
            FLASH_CARD_QUESTION ? (
              <Card
                isFlipped={isFlipped}
                setIsFlipped={(value) => setIsFlipped(value)}
                data={questionSequence[currentQuestionIndex]}
              />
            ) : questionSequence[currentQuestionIndex].question_type ===
              TYPING_QUESTION ? (
              <Typing
                data={questionSequence[currentQuestionIndex]}
                setIsAnswered={(value) => setIsAnswered(value)}
              />
            ) : questionSequence[currentQuestionIndex].question_type ===
              FILL_QUESTION ? (
              <Fill data={questionSequence[currentQuestionIndex]} />
            ) : null}
          </div>
        )}
        <div
          className="absolute w-[50px] h-[50px] flex items-center justify-center rounded-full border-[1px] top-0 right-0 hover:bg-blue-600 group transition-all ease-in-out duration-150 m-2 cursor-pointer"
          onClick={() => {
            exit();
          }}
        >
          <HiX className="text-6xl text-gray-600 group-hover:text-white transition-all ease-in-out duration-150" />
        </div>

        <div className="flex justify-center gap-8 py-4 w-full text-2xl absolute bottom-0 gap-2">
          <button
            className="hover:bg-blue-600 hover:text-white transition-all ease-in-out duration-150 p-4 rounded-xl bg-white text-gray-600 border-[1px] flex gap-2 items-center justify-between"
            onClick={() => {
              resetState();
              if (currentQuestionIndex > 0)
                setCurrentQuestionIndex(currentQuestionIndex - 1);
            }}
          >
            <BsArrowLeft />
            <span>Previous</span>
          </button>
          {questionSequence &&
            questionSequence[currentQuestionIndex].question_type !==
              FLASH_CARD_QUESTION &&
            questionSequence[currentQuestionIndex].question_type !=
              TYPING_QUESTION && (
              <button
                className="hover:bg-teal-600 hover:text-white transition-all ease-in-out duration-150 p-4 rounded-xl bg-white text-gray-600 border-[1px] flex gap-2 items-center justify-between"
                onClick={() => {}}
              >
                Check
              </button>
            )}

          {questionSequence &&
            questionSequence[currentQuestionIndex].question_type ===
              FLASH_CARD_QUESTION && (
              <button
                className={`${
                  isLearned ? 'bg-teal-400' : 'bg-white hover:bg-teal-600'
                } hover:text-white transition-all ease-in-out duration-150 p-4 rounded-xl  text-gray-600 border-[1px] flex gap-2 items-center justify-between`}
                onClick={async () => {
                  await addToMemory(
                    questionSequence[currentQuestionIndex].word,
                    questionSequence[currentQuestionIndex].type
                  );
                  setIsLearned(true);
                }}
              >
                Learn
              </button>
            )}

          <button
            className="hover:bg-blue-600 hover:text-white transition-all ease-in-out duration-150 p-4 rounded-xl bg-white text-gray-600 border-[1px] flex gap-2 items-center justify-between"
            onClick={() => {
              resetState();
              if (currentQuestionIndex === questionSequence.length - 1) {
                showResultModal();
              } else {
                if (
                  questionSequence &&
                  currentQuestionIndex < questionSequence.length - 1
                )
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
              }
            }}
          >
            <span>Next</span>
            <BsArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayFlashCardModal;
