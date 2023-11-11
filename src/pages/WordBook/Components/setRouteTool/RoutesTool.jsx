import React from 'react';
import { FaBrain } from 'react-icons/fa6';
import { HiStar } from 'react-icons/hi';
import {
  PiCarDuotone,
  PiCardsBold,
  PiCardsDuotone,
  PiCardsThin,
} from 'react-icons/pi';
import {
  FLASHCARD_PAGE,
  QUIZ_PAGE,
  WORDLIST_PAGE,
} from '../../../Popup/constants';

const RoutesTool = ({ setRoute }) => {
  return (
    <div className="px-4 bg-slate-200 flex flex-col py-4 align-center justify-start border-r-[1px] gap-4">
      <div className="relative flex items-center justify-center group">
        <button
          className="relative p-2 rounded-full border-[1px] border-gray-300 group group-hover:bg-yellow-400 outline-none active:bg-yellow-500 transition-all ease-in-out duration-150 group-hover:text-white group-hover:rotate-[8deg] "
          style={{ zIndex: 10000 }}
          onClick={() => setRoute(WORDLIST_PAGE)}
        >
          <HiStar className="text-4xl text-gray-600 group-hover:text-white" />
        </button>
        {/* <div
          className="w-[250px]  flex items-center justify-center text-center font-bold  absolute hidden group-hover:block right-[-170px] transition-all ease-in-out fade-in right-[-200px] border-[1px] text-lg bg-white text-gray-600 p-4 rounded-full right-0 w-auto z-100"
          style={{ zIndex: 1000 }}
        >
          Danh sách từ vựng
        </div> */}
      </div>

      <div className="relative flex items-center justify-center group">
        <button
          className="relative p-2 rounded-full border-[1px] border-gray-300 group group-hover:bg-teal-400 outline-none active:bg-yellow-500 transition-all ease-in-out duration-150 group-hover:text-white group-hover:rotate-[8deg] "
          onClick={() => setRoute(FLASHCARD_PAGE)}
        >
          <PiCardsDuotone className="text-4xl text-gray-600  group-hover:text-white" />
        </button>
        {/* <div
          className="w-[150px] flex items-center justify-center text-center font-bold text-2sm absolute hidden group-hover:block right-[-170px] transition-all ease-in-out fade-in right-[-150px] border-[1px] bg-white text-gray-600 p-4 rounded-full right-0 w-auto z-100"
          style={{ zIndex: 1000 }}
        >
          Flashcard
        </div> */}
      </div>
      <div className="relative flex items-center justify-center group">
        <button
          className="relative p-2 rounded-full border-[1px] border-gray-300 group group-hover:bg-sky-400 outline-none active:bg-yellow-500 transition-all ease-in-out duration-150 group-hover:text-white group-hover:rotate-[8deg] "
          onClick={() => setRoute(QUIZ_PAGE)}
        >
          <FaBrain className="text-4xl text-gray-600  group-hover:text-white" />
        </button>
        {/* <div
          className="w-[150px] flex items-center justify-center text-center font-bold text-2sm absolute hidden group-hover:block right-[-170px] transition-all ease-in-out fade-in right-[-150px] border-[1px] bg-white text-gray-600 p-4 rounded-full right-0 w-auto z-100"
          style={{ zIndex: 1000 }}
        >
          Quiz
        </div> */}
      </div>
    </div>
  );
};

export default RoutesTool;
