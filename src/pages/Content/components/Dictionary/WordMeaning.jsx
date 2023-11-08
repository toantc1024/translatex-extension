import React, { Fragment } from 'react';
import { HiOutlineVolumeUp } from 'react-icons/hi';
import Sentence from '../../../Popup/Components/WordCard/Sentence';

const WordMeaning = ({ data }) => {
  return (
    <Fragment>
      {data.phonetics && data.phonetics.length > 0 && (
        <div className="word-meaning-container bg-emerald-400">
          {data.phonetics
            .sort((a, b) => (a.audio ? (b.audio ? 0 : -1) : 1))
            .map((phonetic) => {
              return (
                <div className="phonetic-container">
                  {phonetic.text && (
                    <span
                      className="phonetic-text"
                      style={{
                        fontSize: '15px',
                        fontWeight: '300',
                        color: 'gray',
                      }}
                    >
                      {phonetic.text}
                    </span>
                  )}
                  {phonetic.audio && (
                    <button
                      className="audio-button"
                      onClick={() => {
                        let audio = document.getElementById('currentAudio');
                        audio.pause();
                        audio.src = phonetic.audio;
                        audio.play();
                      }}
                    >
                      <audio id="currentAudio" src=""></audio>
                      <HiOutlineVolumeUp className="volume-icon" />
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* Meaning */}
      {data.meanings &&
        data.meanings.map((meaning) => {
          return (
            <div
              className="word-meaning-container"
              style={{ backgroundColor: '#2563eb' }}
            >
              <div style={{ margin: '.25rem' }}>
                <h1
                  style={{ color: 'white', fontStyle: 'italic' }}
                  className="font-bold"
                >
                  {meaning.partOfSpeech}
                </h1>
                <div>
                  {meaning.definitions && (
                    <Fragment>
                      {meaning.definitions.map((definition, i) => {
                        return (
                          <div
                            style={{
                              fontSize: '0.875rem',
                              padding: '0.5rem',
                              color: '#718096',
                              display: 'flex',
                              flexDirection: 'column',
                              borderColor: 'gray',
                              borderWidth: '1px',
                              borderRadius: '0.375rem',
                              gap: '0.5rem',
                              backgroundColor: 'white',
                              marginTop: '5px',
                            }}
                          >
                            <div
                              style={{
                                padding: '0.5rem',
                                borderColor: 'gray',
                                borderWidth: '1px',
                                borderRadius: '0.375rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem',
                              }}
                            >
                              <span
                                style={{
                                  color: '#718096',
                                  fontWeight: 'bold',
                                }}
                              >
                                {definition['definition']}
                              </span>
                              <span style={{ fontStyle: 'italic' }}>
                                {definition['definition_vi']}
                              </span>
                            </div>
                            {definition.example && (
                              <div
                                style={{
                                  padding: '0.5rem',
                                  borderColor: 'gray',
                                  borderWidth: '1px',
                                  borderRadius: '0.375rem',
                                }}
                              >
                                <h1
                                  style={{
                                    fontStyle: 'italic',
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: '1px',
                                    paddingTop: '0.25rem',
                                    paddingBottom: '0.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                  }}
                                >
                                  Ví dụ
                                </h1>
                                <Sentence
                                  content={definition.example}
                                  word={data['word']}
                                />
                              </div>
                            )}
                            {definition.synonyms.length > 0 && (
                              <div
                                style={{
                                  padding: '0.5rem',
                                  borderColor: 'gray',
                                  borderWidth: '1px',
                                  borderRadius: '0.375rem',
                                }}
                              >
                                <h1
                                  style={{
                                    fontStyle: 'italic',
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: '1px',
                                    paddingTop: '0.25rem',
                                    paddingBottom: '0.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                  }}
                                >
                                  Đồng nghĩa
                                </h1>
                                <div
                                  style={{ display: 'flex', flexWrap: 'wrap' }}
                                >
                                  {definition.synonyms.map((synonym) => {
                                    return (
                                      <span
                                        style={{
                                          borderColor: 'gray',
                                          borderWidth: '1px',
                                          borderRadius: '0.375rem',
                                          backgroundColor: '#3182CE',
                                          borderColor: '#2C5282',
                                          color: 'white',
                                          transition: 'all 0.1s ease-in-out',
                                          cursor: 'pointer',
                                          padding: '0.25rem',
                                          margin: '0.25rem',
                                        }}
                                        onClick={() => {
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
    </Fragment>
  );
};

export default WordMeaning;
