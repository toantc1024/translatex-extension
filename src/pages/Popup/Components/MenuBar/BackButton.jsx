import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { DICTIONARY_PAGE, HISTORY_PAGE, SETTING_PAGE } from '../../constants';

const BackButton = ({ page, onClickHandler }) => {
  return (
    <div
      onClick={() =>
        onClickHandler(page === HISTORY_PAGE ? SETTING_PAGE : DICTIONARY_PAGE)
      }
      className="rounded-full w-12 h-12 cursor-pointer  p-2 flex border-[1px] rounded-full hover:bg-gray-100  active:bg-gray-200 items-center justify-center transition-all ease-in-out duration-50"
    >
      <HiArrowLeft className="text-2xl text-gray-600" />
    </div>
  );
};

export default BackButton;
