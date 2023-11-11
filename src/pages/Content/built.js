import React from 'react';
// import WordCard from '../Popup/Components/WordCard/WordCard';
import { render } from 'react-dom';

import ResultPanel from './ResultPanel';
import WordCardResult from './components/Dictionary/WordCardResult';

export const buildResultPanel = (target, hideResult) => {
  render(<ResultPanel hideResult={hideResult} />, target);
};

export const buildResultPanelContent = (target, data) => {
  if (!data) {
    return;
  }
  // Remove word from chrome.storage
  chrome.storage.sync.remove(['word']);
  // Set word to trigger event in chrome.storage.onChanged
  chrome.storage.sync.set({ word: data.word });
  chrome.storage.sync.set({ currentWordData: data });

  render(<WordCardResult data={data} />, target);
};
