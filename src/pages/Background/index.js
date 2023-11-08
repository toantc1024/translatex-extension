// Create receive message from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'translate') {
    // Send response with data
    lookUpWordData(request.text).then((data) => sendResponse({ data }));
  }
  return true;
});
//

// Create function fetch data from localhost:3000 and response
const lookUpWordData = (text) => {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:4000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: text }),
    })
      .then((response) => response.json())
      .then(({ word }) => resolve(word))
      .catch((error) => reject(error));
  });
};
