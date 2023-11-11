import React, { useState } from 'react';
import './custom.css';
import { BsArrowUp, BsArrowUpLeft } from 'react-icons/bs';
const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className={`w-[400px] h-[500px] max-h-[500px] overflow-hidden cursor-pointer bg-teal-200 text-teal-600 bg-white rounded-xl items-center flex justify-center z-100 relative group text-8xl hover:scale-[1.02] transition-all ease-in-out duration-300 border-[1px] card ${
        isFlipped ? 'flipped' : ''
      }`}
    >
      Card
      <div className="rounded-full p-0 absolute bottom-0  bg-white w-[80px] h-[80px] flex flex-col items-center justify-center text-4xl font-extrabold bottom-[-160px] right-[50%] translate-x-[50%] group-hover:bottom-[80px] transition-all ease-in-out duration-150 active:rounded-t-0 hover:p-4 card">
        {/* <div className="rounded-t-full w-[100px] h-[80px] bg-gray-200"></div> */}
        <BsArrowUp className="text-gray-600  hover:animate-pulse" />
        <span>Flip</span>
      </div>
    </div>
  );
};

export default Card;
