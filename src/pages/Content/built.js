import React from 'react';
// import WordCard from '../Popup/Components/WordCard/WordCard';
import { render } from 'react-dom';

import ResultPanel from './ResultPanel';
import WordCardResult from './components/Dictionary/WordCardResult';
export const buildResultPanel = (target, hideResult) => {
  render(<ResultPanel hideResult={hideResult} />, target);
};

export const buildResultPanelContent = (target, data) => {
  console.log(target, data);
  render(<WordCardResult data={data} />, target);
};
