import React, { useEffect, useState } from 'react';
import './custom.css';
import { BsArrowRight, BsArrowUp, BsArrowUpLeft } from 'react-icons/bs';
const Card = ({ data, isFlipped, setIsFlipped }) => {
  const [isJustFlipped, setIsJustFlipped] = useState(false);
  useEffect(() => {
    console.log(data);
  }, []);
  useEffect(() => {
    if (isFlipped == undefined) {
      return;
    }
    setIsJustFlipped(true);
    setTimeout(() => {
      setIsJustFlipped(false);
    }, 500);
  }, [isFlipped]);

  return (
    <div
      class={`card w-[300px] h-[400px] relative transition-all ease-in-out duration-[1000ms] cursor-pointer rounded-xl ${
        isFlipped ? 'active' : ''
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div class="front border-[5px] border-blue-600 group rounded-xl bg-white  overflow-auto">
        <p className="text-2xl">
          <b>{data.word}</b>
        </p>
        <span className="italic">{data.type}</span>
        <div className="absolute transition-left ease-in-out duration-150 bottom-[10px]  left-[-150px] group-hover:left-[10px]  text-2xl rounded-2xl w-[65px] h-[65px] flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 p-4 gap-2">
          <BsArrowRight className="text-white text-4xl  hover:animate-pulse" />
          Flip
        </div>
      </div>
      <div class="back absolute top-0 left-0 w-full h-full bg-white border-[5px] border-teal-400 rounded-xl text-sm p-4 flex flex-col items-center justify-center gap-2">
        <p className="text-2xl">
          <b>{data.word}</b>
        </p>
        <span className="italic">{data.type}</span>

        <span className="font-light">Meaning: {data.meaning}</span>

        <span className="font-light">Nghĩa: {data.meaning_vi}</span>
        {/* <img src="https://dillionmegida.com/img/deee.jpg" />
        <p>He simplifies coding</p> */}
      </div>
    </div>
  );
};

export default Card;
