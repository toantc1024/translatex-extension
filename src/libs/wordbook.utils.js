import { KMPSearch } from '../libs/KMP-Search';
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

export const generateQuestions = async () => {
  let response = await fetch(`${route_word_book}/generate_questions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let { questions } = await response.json();
  return questions;
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

export const FLASH_CARD_QUESTION = 'FLASH_CARD_QUESTION';
export const TYPING_QUESTION = 'TYPING_QUESTION';
export const FILL_QUESTION = 'FILL_QUESTION';
export const BLANK_RATE = 0.4;
const pickRandomElementFromAnArray = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const generateBlank = (word, rate) => {
  let k = Math.floor(word.length * rate);
  let indices = [];
  while (indices.length < k) {
    let randomIndex = Math.floor(Math.random() * word.length);
    if (!indices.includes(randomIndex) && randomIndex > 0) {
      indices.push(randomIndex);
    }
  }

  let wordArray = word.split('');
  indices.forEach((index) => (wordArray[index] = '_'));
  return wordArray.join('');
};

// Generate a random string from a given string
const shuffleWord = (word) => {
  let wordArray = word.split('');
  let shuffledWord = '';
  while (wordArray.length > 0) {
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    shuffledWord += wordArray[randomIndex];
    wordArray.splice(randomIndex, 1);
  }
  return shuffledWord;
};

const getParts = (content, word) => {
  if (!word) return [content];
  var parts = [];
  var positions = [];
  var firstCharUppercaseWord = word.charAt(0).toUpperCase() + word.slice(1);
  positions = KMPSearch(content, word);
  positions.push(...KMPSearch(content, firstCharUppercaseWord));

  for (let i = 0; i < positions.length; i++) {
    let start = positions[i];
    let end = start + word.length;
    parts.push(content.slice(0, start));
    parts.push(content.slice(start, end));
    content = content.slice(end);
  }
  parts.push(content);
  if (!parts) return [content];
  return parts;
};

export const compareWords = (word1, word2) => {
  return word1.toLowerCase() === word2.toLowerCase();
};

export const buildQuestionForWord = async (word) => {
  // PARSE DATA
  let phonetic, word_key, meaning, word_type, example, meaning_vi;

  if (word['phonetic']) {
    phonetic = word['phonetic'];
  }

  if (word['word']) {
    word_key = word['word'];
  }

  if (word['meanings'] && word['meanings'].length > 0) {
    // Get random
    let randomMeaning = pickRandomElementFromAnArray(word['meanings']);
    meaning = randomMeaning['definitions'][0]['definition'];
    meaning_vi = randomMeaning['definitions'][0]['definition_vi'];
    word_type = randomMeaning['partOfSpeech'];
    example = randomMeaning['definitions'][0]['example'];
  }

  // IF PARSED DATA SUCCESSFULLY
  // FLASHCARD
  let questions = [];
  if (meaning && word_type && word_key) {
    let flash_card_question = {
      meaning: meaning,
      word: word_key,
      meaning_vi: meaning_vi,
      type: word_type,
      question_type: FLASH_CARD_QUESTION,
    };
    questions.push(flash_card_question);

    let generate_type = Math.floor(Math.random() * 2) % 2 == 0;
    let typing_question = {
      meaning: meaning,
      word: word_key,
      answer: word_key,
      question_content_title: generate_type
        ? 'Guess the word'
        : 'Fill the blank',
      question_content: generate_type
        ? shuffleWord(word_key).split('')
        : generateBlank(word_key, BLANK_RATE).split(''),
      type: word_type,
      question_type: TYPING_QUESTION,
    };

    questions.push(typing_question);
    if (example) {
      let choices = await getRandomWords(word_key, 3);
      choices.push(word_key);
      choices = choices.sort(() => Math.random() - 0.5);
      // Split word from example
      let parts = getParts(example, word_key);
      let fill_question = {
        word: word_key,
        answer: word_key,
        choices: choices,
        question_content: parts,
        type: word_type,
        question_type: FILL_QUESTION,
      };
      questions.push(fill_question);
    }
    console.log({ questions });

    return questions;
  }
};

export const makeQuestions = async (words) => {
  let questions = [];

  for (let word of words) {
    let questions_sequence = await buildQuestionForWord(word);
    questions.push(...questions_sequence);
  }
  return questions;
};

export const addToMemory = (word, type) => {
  return new Promise((resolve, reject) => {
    fetch(`${route_word_book}/add_memory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, type }),
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

export const getAllWord = () => {
  return new Promise((resolve, reject) => {
    fetch(`${route_word_book}/get_memory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.memory);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getFreq = () => {
  return new Promise((resolve, reject) => {
    fetch(`${route_word_book}/get_memory_freq`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.freq);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateFreq = (word) => {
  return new Promise((resolve, reject) => {
    fetch(`${route_word_book}/update_freq`, {
      method: 'POST',
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

export const getRandomWords = (word, number) => {
  return new Promise((resolve, reject) => {
    fetch(`${route}/random/get_random_words`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, number }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.words);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getHistory = () => {
  return new Promise((resolve, reject) => {
    fetch(`${route}/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
