let route = 'http://127.0.0.1:4000';
let route_data = `${route}/data`;
let route_word_book = `${route}/wordbook`;

export const addWord = (word) => {
  return new Promise((resolve, reject) => {
    fetch(`${route_word_book}/add`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.status);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteWord = async (uid) => {
  let response = await fetch(`${route_word_book}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid }),
  });

  let { status } = await response.json();
  return status;
};

export const checkWord = async (word) => {
  let response = await fetch(`${route_word_book}/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word }),
  });

  let { status } = await response.json();
  console.log({ status });
  return status;
};

export const getWords = async () => {
  let response = await fetch(`${route_word_book}/get`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let { words } = await response.json();
  return words;
};

export const getWordOfTheDay = async () => {
  // alert(`${route_data}/wordoftheday`);
  let response = await fetch(`${route_data}/wordoftheday`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let { word } = await response.json();
  return word;
};
