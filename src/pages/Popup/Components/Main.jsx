import React from 'react';
import Dictionary from './Dictionary';

const Main = ({ isHidden }) => {
  return (
    <div className={`h-full ${isHidden ? 'hidden' : ''}`}>
      <Dictionary />
    </div>
  );
};

export default Main;
