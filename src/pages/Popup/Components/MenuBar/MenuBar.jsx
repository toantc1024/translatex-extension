import React from 'react';
import { SETTING_PAGE, DICTIONARY_PAGE } from '../../constants/';
import BackButton from './BackButton';
import OpenMenuButton from './OpenMenuButton';
const MenuBar = ({ page, updatePage }) => {
  return (
    <div className="px-4 py-4 h-18 bg-white border-b-[1px]">
      {page === SETTING_PAGE ? (
        <BackButton onClickHandler={(value) => updatePage(value)} />
      ) : (
        <OpenMenuButton onClickHandler={(value) => updatePage(value)} />
      )}
    </div>
  );
};

export default MenuBar;
