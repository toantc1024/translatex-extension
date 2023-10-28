import React, { useEffect, useState } from 'react';
import './Popup.css';
import Main from './Components/Main';
import { DICTIONARY_PAGE, SETTING_PAGE } from './constants';
import MenuBar from './Components/MenuBar/MenuBar';
import SettingPage from './Components/SettingPage';

const Popup = () => {
  const [currentPage, setCurrentPage] = useState(DICTIONARY_PAGE);

  return (
    <div className="App">
      <MenuBar
        page={currentPage}
        updatePage={(newPage) => setCurrentPage(newPage)}
      />
      <Main isHidden={currentPage !== DICTIONARY_PAGE} />
      {currentPage === SETTING_PAGE && <SettingPage />}
    </div>
  );
};

export default Popup;
