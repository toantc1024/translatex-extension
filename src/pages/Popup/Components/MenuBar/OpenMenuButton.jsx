import React from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { SETTING_PAGE } from '../../constants';

const OpenMenuButton = ({ onClickHandler }) => {
  return (
    <div
      onClick={() => onClickHandler(SETTING_PAGE)}
      className="rounded-full w-12 h-12 cursor-pointer  p-2 flex border-[1px] rounded-full hover:bg-gray-100  active:bg-gray-200 items-center justify-center transition-all ease-in-out duration-50"
    >
      <HiOutlineMenu className="text-2xl text-gray-600" />
    </div>
  );
};

export default OpenMenuButton;
