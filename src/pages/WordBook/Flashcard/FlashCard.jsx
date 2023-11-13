import React, { Fragment, useEffect, useState } from 'react';
import PlayFlashCardModal from './PlayFlashCardModal';

const FlashCard = () => {
  const [isFlashCardModalOpen, setIsFlashCardModalOpen] = useState(true);
  useEffect(() => {}, []);

  return (
    <div className="w-full h-full">
      {isFlashCardModalOpen && <PlayFlashCardModal />}
      <div className="py-4 px-4 fixed bg-teal-400 text-white font-bold w-full z-[1000] bg-white text-xl">
        Flashcard
      </div>
      <div className="h-screen w-full overflow-auto relative  items-center p-8">
        <div className="w-full h-full mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-2xl items-center justify-between">
            {[...new Array(26)].map((word, _) => (
              <div className="h-[400px] bg-white bg-yellow-400 text-white flex items-center justify-center font-extrabold text-8xl cursor-pointer border-[1px] rounded-lg">
                {_}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
