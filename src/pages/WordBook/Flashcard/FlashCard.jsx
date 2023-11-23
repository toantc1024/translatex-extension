import React, { Fragment, useEffect, useState } from 'react';
import PlayFlashCardModal from './PlayFlashCardModal';
import { HiStar } from 'react-icons/hi';
import { generateQuestions } from '../../../libs/wordbook.utils';

const FlashCard = () => {
  const [isFlashCardModalOpen, setIsFlashCardModalOpen] = useState(false);

  const [wordbookQuestions, setWordbookQuestions] = useState(null);
  const [questionList, setQuestionList] = useState(null);

  useEffect(() => {
    (async () => {
      const wordBookList = await generateQuestions();
      setWordbookQuestions(wordBookList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const wordBookList = await generateQuestions();
      setWordbookQuestions(wordBookList);
    })();
  }, [isFlashCardModalOpen]);

  return (
    <div className="w-full h-full">
      {isFlashCardModalOpen && (
        <PlayFlashCardModal
          exit={() => {
            setIsFlashCardModalOpen(false);
          }}
          questionList={questionList}
        />
      )}
      <div className="py-4 px-4 bg-white border-[1px] text-gray-600 font-light w-full z-[1000] bg-white text-2xl">
        Flashcard
      </div>
      <div className="h-screen w-full overflow-auto relative  items-center p-8">
        <div className="w-full h-full mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-2xl items-center justify-between">
            <div
              onClick={() => {
                if (wordbookQuestions && wordbookQuestions.length > 0) {
                  setQuestionList(wordbookQuestions);
                  setIsFlashCardModalOpen(true);
                }
              }}
              className="h-[200px]  bg-blue-500 hover:bg-blue-600 to-blue-600 text-white flex items-center justify-center font-extrabold text-4xl cursor-pointer border-[1px] rounded-lg relative overflow-hidden group transition-all ease-in-out duration-150 relative"
            >
              {wordbookQuestions && (
                <div className="w-[40px] h-[40px] top-0 right-0 flex items-center justify-center rounded-full bg-red-300 absolute text-[30px] m-4">
                  {wordbookQuestions.length}
                </div>
              )}

              <div>
                <HiStar className="text-[50px] absolute bottom-[10px] left-[10px] rotate-[8deg] shadow-2xl rounded-full rounded-full text-[rgba(255,255,255,.9)]" />
              </div>
              <span>My words</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
