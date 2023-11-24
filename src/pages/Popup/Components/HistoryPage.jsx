import React, { Fragment, useEffect, useState } from 'react';
import { getHistory } from '../../../libs/wordbook.utils';

const HistoryPage = () => {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    (async () => {
      let response = await getHistory();
      const { history } = response;

      let history_fixed = history.reduce((acc, item) => {
        // Convert timestamp to date string
        const date = new Date(item.time).toLocaleDateString();
        (acc[date] = acc[date] || []).push(item);
        return acc;
      }, {});

      setHistory(history_fixed);
    })();
  }, []);

  return (
    <div className="h-[519px] w-full bg-gradient-to-b from-teal-400 to-teal-500 flex items-center justify-center p-4">
      <div className="w-full h-full bg-white border-[1px] rounded-lg shadow-lg p-2  overflow-auto">
        {history &&
          Object.entries(history).map((item) => {
            return (
              <Fragment>
                <div>
                  <h1>{item[0]}</h1>
                </div>
                <div>
                  {item[1].map((w) => (
                    <div className="flex items-center justify-between border-b-[1px] border-gray-300 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-[20px] h-[20px] rounded-full bg-yellow-200"></div>
                        <div className="text-gray-600" onClick={() => {}}>
                          {w.word}
                        </div>
                      </div>
                      <div className="text-gray-600">{`${new Date(
                        w.time
                      ).toLocaleTimeString()} ${new Date(
                        w.time
                      ).toLocaleDateString()}`}</div>
                    </div>
                  ))}
                </div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default HistoryPage;
