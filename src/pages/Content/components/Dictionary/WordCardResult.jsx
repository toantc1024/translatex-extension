import React from 'react';
import WordMeaning from './WordMeaning';

const WordCardResult = ({ data }) => {
  return (
    <div
      style={{
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
    >
      {data ? <WordMeaning data={data} /> : null}
    </div>
  );
};

export default WordCardResult;
