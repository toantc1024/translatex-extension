import React, { Fragment, useEffect, useState } from 'react';
import WordCard from '../../Popup/Components/WordCard/WordCard';

const ConfirmModal = ({
  data = {},
  uid = null,
  onConfirmHandler = () => {},
  onCancelHandler = () => {},
}) => {
  const [deleteUID, setDeleteUID] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    setCurrentData(data);
    console.log(uid, data);
  }, [uid]);
  return (
    <div
      id="default-modal"
      tabindex="-1"
      className="absolute bg-[rgba(0,0,0,.2)] top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Bạn có muốn xóa từ này?
            </h3>
            <button
              onClick={() => onCancelHandler()}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6 max-h-[500px] overflow-auto">
            {currentData && <WordCard data={currentData} />}
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              className="text-gray-600 bg-white hover:bg-red-400 hover:text-white border-[1px] rounded-lg p-4 text-lg"
              onClick={() => onConfirmHandler(uid)}
            >
              Okay
            </button>
            <button
              onClick={() => onCancelHandler()}
              type="button"
              className="text-gray-600 bg-white hover:bg-teal-400 hover:text-white border-[1px] rounded-lg p-4 text-lg"
            >
              Hông
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
