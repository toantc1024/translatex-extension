import React, { Fragment, useEffect, useState } from 'react';
import './WordBook.css';
import { deleteWord, getWords } from '../../libs/wordbook.utils';
import WordCard from '../Popup/Components/WordCard/WordCard';
import {
  FLASHCARD_PAGE,
  QUIZ_PAGE,
  ROOT_ROUTE,
  WORDLIST_PAGE,
} from '../Popup/constants';
import RoutesTool from './Components/setRouteTool/RoutesTool';
import SearchBar from '../Popup/Components/SearchBar/SearchBar';
import ConfirmModal from './Components/ConfirmModal';
import FlashCard from './Flashcard/FlashCard';
const WordBook = ({ title }) => {
  const [wordList, setWordList] = useState([]);
  const [route, setRoute] = useState(WORDLIST_PAGE);
  const [searchKey, setSearchKey] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteWordUID, setDeleteWordUID] = useState(null);

  const onDeleteHandler = (uid) => {
    if (!uid) return;
    setDeleteWordUID(uid);
    setDeleteModal(true);
  };

  useEffect(() => {
    const getData = async () => {
      let response = await getWords();
      setWordList(response);
    };

    getData();
  }, []);

  return (
    <Fragment>
      <div className="h-screen w-full overflow-hidden  flex relative">
        <RoutesTool setRoute={(value) => setRoute(value)} />
        {/* Comfirm modal */}

        {/* Content */}
        <div className="w-full h-screen overflow-hidden relative">
          {deleteModal && (
            <ConfirmModal
              uid={deleteWordUID}
              onCancelHandler={() => {
                setDeleteModal(false);
              }}
              onConfirmHandler={async (uid) => {
                let response = await deleteWord(uid);
                if (response) {
                  setWordList(
                    wordList.filter((word) => word['uid'] != deleteWordUID)
                  );
                }
                setDeleteModal(false);
              }}
              data={wordList.find((word) => word['uid'] == deleteWordUID)}
            />
          )}
          {route == WORDLIST_PAGE ? (
            <div>
              <div className="p-4">
                <SearchBar
                  getWordMeaning={() => {}}
                  text={searchKey}
                  setText={(value) => setSearchKey(value)}
                  route={`${ROOT_ROUTE}/wordbook`}
                />
              </div>

              <div className=" grid grid-cols-3 p-4 gap-2">
                {wordList.map((word) => {
                  return (
                    <div className="w-auto max-h-[400px] overflow-auto border-[1px] rounded-xl">
                      <WordCard
                        data={word}
                        isWordBookCard={true}
                        onDeleteHandler={(uid) => {
                          onDeleteHandler(uid);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : route == FLASHCARD_PAGE ? (
            <div>
              <FlashCard />
            </div>
          ) : route == QUIZ_PAGE ? (
            <div>QUIZ</div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default WordBook;
