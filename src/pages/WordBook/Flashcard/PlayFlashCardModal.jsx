import React from 'react';
import Card from './Card/Card';

const PlayFlashCardModal = () => {
  return (
    <div
      className="absolute bg-white w-full h-full flex items-center justify-center"
      style={{ zIndex: 99999999999999 }}
    >
      <Card />
    </div>
  );
};

export default PlayFlashCardModal;
