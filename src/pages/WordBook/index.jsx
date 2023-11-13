import React from 'react';
import { render } from 'react-dom';

import WordBook from './WordBook';
import './index.css';
import '../../assets/styles/tailwind.css';

render(
  <WordBook title={'WordBook'} />,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
