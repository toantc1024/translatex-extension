import { buildResultPanel, buildResultPanelContent } from './built.js';

const contentStyle = document.createElement('link');
contentStyle.rel = 'stylesheet';
contentStyle.type = 'text/css';
contentStyle.href = chrome.runtime.getURL('content.styles.css');
document.head.appendChild(contentStyle);

// Components
let translateButton = document.createElement('translate');
translateButton.innerText = '🤔';
translateButton.setAttribute('id', '#app-translate-button');

let resultPanel = document.createElement('div');
resultPanel.innerText = 'Result container';
resultPanel.setAttribute('id', 'app-result-panel');
document.documentElement.appendChild(resultPanel);
resultPanel.style.display = 'none';

const hideResult = () => {
  resultPanel.style.display = 'none';
};

buildResultPanel(resultPanel, hideResult);
const showResult = (queryText) => {
  // resultPanel.textContent = queryText;
  resultPanel.style.display = 'block';
  resultPanel.style.top = translateButton.style.top;
  resultPanel.style.left = translateButton.style.left;
};

function detectSelect(targetElement, actionAfterSelect, actionAfterNotSelect) {
  // Remember whether mouse moved.
  let moved = false;

  // inner listener for detecting mousemove and mouseup.
  const detectMouseMove = () => {
    moved = true;
  };

  const detectMouseUp = (event) => {
    // select action detected
    if (moved) {
      if (typeof actionAfterSelect === 'function') actionAfterSelect(event);
    } else if (typeof actionAfterNotSelect === 'function') {
      // select action isn't detected
      actionAfterNotSelect(event);
    }
    // remove inner event listeners.
    targetElement.removeEventListener('mousemove', detectMouseMove);
    targetElement.removeEventListener('mouseup', detectMouseUp);
  };

  // add inner event listeners
  targetElement.addEventListener('mousemove', detectMouseMove);
  targetElement.addEventListener('mouseup', detectMouseUp);
}

document.addEventListener('dblclick', (event) => {
  selectTranslate(event, true);
});

document.addEventListener('click', (event) => {
  // triple click

  if (event.detail === 3) {
    selectTranslate(event, true);
  }
});

document.addEventListener('mousedown', (event) => {
  disappearButton();
  console.log(event.target, event.target.closest('#app-result-panel'));
  if (!event.target.closest('#app-result-panel')) {
    hideResult();
    // return;
  }

  // whether user take a select action
  detectSelect(document, (event) => {
    selectTranslate(event);
  });
});

let isButtonShown = false;

const shouldTranslate = () => {
  // Get current selection
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  if (!selectedText) return false;

  return true;
};

function cancelTextSelection() {
  if (window.getSelection) {
    if (window.getSelection().empty) {
      // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
      // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) {
    // IE
    document.selection.empty();
  }
}
function selectTranslate(event) {
  // if (event.targetElement === resultPanel) {
  //   return;
  // }
  if (!shouldTranslate()) return;
  showButton(event);
}

const disappearButton = () => {
  if (isButtonShown) {
    // alert('remove!');
    document.documentElement.removeChild(translateButton);
    isButtonShown = false;
  }
};

const showButton = (event) => {
  document.documentElement.appendChild(translateButton);
  translateButton.addEventListener('mousedown', buttonClickHandler);
  const OffsetXValue = 10,
    OffsetYValue = 10;
  let XBias, YBias;
  let XPosition = event.pageX + XBias;
  let YPosition = event.pageY + YBias;

  // If the icon is beyond the side of the page, we need to reposition the icon inside the page.
  if (
    XPosition <= 0 ||
    XPosition + translateButton.clientWidth > window.innerWidth
  )
    XPosition = event.pageX - XBias - translateButton.clientWidth;
  if (
    YPosition <= 0 ||
    YPosition + translateButton.clientHeight > window.innerHeight
  )
    YPosition = event.pageY - YBias - translateButton.clientHeight;

  // console.log(event.x, event.y, event.clientWidth, event.pageX);
  let selection = window.getSelection();
  let range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
  let selectionHeight = range ? range.getBoundingClientRect().height : 0;

  // set the new position of the icon
  translateButton.style.left = `${event.pageX}px`;
  translateButton.style.top = `${event.pageY + selectionHeight}px`;
  // set the new position of the icon
  isButtonShown = true;
};

function querySelect() {
  let selection = window.getSelection();
  let text = '';
  let position;
  if (selection.rangeCount > 0) {
    text = selection.toString().trim();
  }
  return { text, position };
}

const getResultFromServer = async () => {
  let queryText = querySelect().text;

  if (queryText && queryText.length > 0) {
    // Calculate time execute the func below
    showResult(queryText);
    disappearButton();

    chrome.runtime.sendMessage(
      {
        type: 'translate',
        text: queryText,
      },
      (response) => {
        // let loader = document.getElementById('evtd-loader');
        // loader.style.display = 'none';
        // content.style.display = 'block';
        console.log({ response });
        let { data } = response;
        buildResultPanelContent(
          document.getElementById('result-content'),
          data
        );
        // displayResult(content, response);
      }
    );

    // Add loader

    cancelTextSelection();
  }
};

const buttonClickHandler = (event) => {
  event.preventDefault();
  event.stopPropagation();
  getResultFromServer();
};
