import React from 'react';
import { HiBookOpen, HiBookmark, HiClock } from 'react-icons/hi';

const SettingPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <button className="bg-white border-[1px] border-gray-200 p-4 rounded-lg w-[350px] flex items-center justify-between text-xl group hover:bg-blue-600 text-gray-600 hover:text-white">
        <span>Sổ tay từ vựng</span>
        <span className="text-2xl group-hover:scale-[1.5] transition-all ease-in-out duration-150">
          <HiBookmark />
        </span>
      </button>
      <button className="bg-white border-[1px] border-gray-200 p-4 rounded-lg w-[350px] flex items-center justify-between text-xl group hover:bg-blue-600 text-gray-600 hover:text-white">
        <span>Lịch sử tra cứu</span>
        <span className="text-2xl  group-hover:scale-[1.5] transition-all ease-in-out duration-150">
          <HiClock />
        </span>
      </button>
      <button className="bg-white border-[1px] border-gray-200 p-4 rounded-lg w-[350px] flex items-center justify-between text-xl group hover:bg-blue-600 text-gray-600 hover:text-white">
        <span>Quản lý từ điển </span>
        <span className="text-2xl group-hover:scale-[1.5] transition-all ease-in-out duration-150">
          <HiBookOpen />
        </span>
      </button>
    </div>
  );
};

export default SettingPage;
