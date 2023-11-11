import React, { Fragment, useEffect, useState } from 'react';
import { HiOutlineVolumeUp, HiStar, HiX } from 'react-icons/hi';
import Sentence from './Sentence';
import { addWord, checkWord } from '../../../../libs/wordbook.utils';
const WordCard = ({
  data,
  searchWord,
  isWordBookCard = false,
  onDeleteHandler = () => {},
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let response = await checkWord(data['word']);
      setIsFavorite(response);
    };

    getData();
  }, [data]);

  return (
    <div>
      {/* Word title */}
      <div className="p-4 border-b-[1px] flex gap-2 flex items-center justify-between">
        <span className="text-2xl font-bold">{data['word']}</span>
        <div
          className={`flex gap-2 items-center justify-between group relative transition-all ease-in-out duration-150`}
        >
          {!isWordBookCard ? (
            <button
              className={`border-[1px] text-shadow shadow-lg hover:bg-slate-100  rounded-full group`}
              onClick={async () => {
                let added = await addWord(data);
                console.log(added);
                setIsFavorite(added);
              }}
            >
              <HiStar
                className={` text-3xl  ${
                  isFavorite
                    ? 'text-yellow-600'
                    : 'text-gray-200 group-hover:text-yellow-400'
                } `}
              />
            </button>
          ) : (
            <button
              className={`border-[1px] text-shadow shadow-lg hover:bg-red-400   rounded-full group`}
              onClick={() => {
                onDeleteHandler(data['uid']);
              }}
            >
              <HiX className="text-3xl text-gray-600 group-hover:text-white" />
            </button>
          )}
        </div>

        {/* <span className="text-xl font-light">{data['phonetic']}</span> */}
      </div>

      {/* Phonetics */}
      {data.phonetics && data.phonetics.length > 0 && (
        <div className="mt-2 bg-white border-[1px] rounded-lg border-teal-500 text-gray-800 bg-gradient-to-b from-teal-400 to-teal-300">
          <div className="p-2">
            <h1 className="text-lg font-extrabold italic p-2 text-white">
              Phát âm
            </h1>
            <div className="border-gray border-[1px] border-teal-500 bg-white rounded-lg p-2">
              {data.phonetics
                //   Prioritize which phonetic has audio
                .sort((a, b) => (a.audio ? (b.audio ? 0 : -1) : 1))
                .map((phonetic) => {
                  return (
                    <div className="flex border-[1px] rounded-lg gap-2 p-2 m-1 ">
                      {phonetic.text && (
                        <span className="text-lg font-light text-gray-600">
                          {phonetic.text}
                        </span>
                      )}
                      {phonetic.audio && (
                        <button
                          className="bg-white flex items-center justify-center w-[30px] h-[30px] p-1 border-[1px] rounded-full hover:bg-gray-100 active:bg-emerald-100 transition-bg ease-in-out duration-500"
                          onClick={() => {
                            let audio = document.getElementById('currentAudio');
                            audio.pause();

                            // Set audio source
                            audio.src = phonetic.audio;

                            // Play audio
                            audio.play();
                          }}
                        >
                          <audio id="currentAudio" src=""></audio>
                          <HiOutlineVolumeUp className="text-emerald-400 text-[1005px]" />
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Meaning */}
      {data.meanings &&
        data.meanings.map((meaning) => {
          return (
            <div className="mt-2 bg-white border-[1px] rounded-lg bg-blue-600">
              <div className="p-2">
                <h1 className="text-lg font-extrabold italic p-2 text-white">
                  {meaning.partOfSpeech}
                </h1>
                <div className="border-gray border-[1px] rounded-lg p-2  bg-white flex flex-col gap-1">
                  {meaning.definitions && (
                    <Fragment>
                      {meaning.definitions.map((definition, i) => {
                        return (
                          <div className="text-2sm p-2 text-gray-600 flex flex-col border-[1px] rounded-lg gap-2">
                            <div className="p-2 border-[1px] rounded-lg flex flex-col gap-1">
                              <span className="text-gray-500 font-bold">
                                {definition['definition']}
                              </span>
                              <span className="italic">
                                {definition['definition_vi']}
                              </span>
                            </div>
                            {definition.example && (
                              <div className="p-2 border-[1px] rounded-lg">
                                <h1 className="italic border-b-[1px] pt-1 pb-1 flex items-center font-bold mb-2">
                                  Ví dụ
                                </h1>
                                {/* In order to high light our word in an example, we can use an algorithm O(n*m),
                                    however, this algorithm is not good enough for us
                                    We will use KMP searching algorithm to solve this problem
                                  */}
                                <Sentence
                                  content={definition.example}
                                  word={data['word']}
                                />
                              </div>
                            )}

                            {definition.synonyms.length > 0 && (
                              <div className="p-2 border-[1px] rounded-lg">
                                <h1 className="italic border-b-[1px] pt-1 pb-1 flex items-center font-bold mb-2">
                                  Đồng nghĩa
                                </h1>
                                {/* In order to high light our word in an example, we can use an algorithm O(n*m),
                                    however, this algorithm is not good enough for us
                                    We will use KMP searching algorithm to solve this problem
                                  */}
                                <div className="flex flex-wrap">
                                  {definition.synonyms.map((synonym) => {
                                    return (
                                      <span
                                        className=" border-[1px] rounded-lg hover:bg-blue-600 hover:border-blue-700 hover:text-white duration-100 ease-in-out transition-all cursor-pointer p-1 m-1"
                                        onClick={() => {
                                          // Search for this word
                                          searchWord(synonym);
                                        }}
                                      >
                                        {synonym}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WordCard;
