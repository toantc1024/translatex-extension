import React from 'react';
import { HiBookOpen, HiBookmark, HiClock, HiStar } from 'react-icons/hi';
import { HISTORY_PAGE } from '../constants';

const SettingPage = ({ setCurrentPage }) => {
  return (
    <div className="h-[400px] flex flex-col items-center justify-center gap-2">
      <button
        className="bg-white border-[1px] border-gray-200 p-4 rounded-lg w-[350px] flex items-center justify-between text-xl group hover:bg-blue-600 text-gray-600 hover:text-white"
        onClick={() => {
          let panelTab = chrome.runtime.getURL('wordbook.html');
          // Check if the options page exists, if so focus it, if not open it
          chrome.tabs.query({ url: panelTab }, (tabs) => {
            if (tabs.length) {
              chrome.tabs.update(tabs[0].id, { active: true });
            } else {
              chrome.tabs.create({ url: panelTab });
            }
          });
        }}
      >
        <span>Sổ tay từ vựng</span>
        <span className="text-2xl group-hover:scale-[1.5] transition-all ease-in-out duration-150">
          <HiStar />
        </span>
      </button>
      <button
        className="bg-white border-[1px] border-gray-200 p-4 rounded-lg w-[350px] flex items-center justify-between text-xl group hover:bg-blue-600 text-gray-600 hover:text-white"
        onClick={() => {
          setCurrentPage(HISTORY_PAGE);
        }}
      >
        <span>Lịch sử tra cứu</span>
        <span className="text-2xl  group-hover:scale-[1.5] transition-all ease-in-out duration-150">
          <HiClock />
        </span>
      </button>
      {/* <button className="bg-white border-[1px] border-gray-200 p-4 rounded-lg w-[350px] flex items-center justify-between text-xl group hover:bg-blue-600 text-gray-600 hover:text-white">
        <span>Quản lý từ điển </span>
        <span className="text-2xl group-hover:scale-[1.5] transition-all ease-in-out duration-150">
          <HiBookOpen />
        </span>
      </button> */}
    </div>
  );
};

export default SettingPage;
