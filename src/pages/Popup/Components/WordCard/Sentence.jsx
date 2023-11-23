// Todolist
// 1. Highlight the word in the sentence
// 2. Add a button to add the word to the dictionary
// 3. Add a button to add the word to the flashcard
// 4. Add a button to add the word to the note
// 5. Add a button to add the word to the bookmark
// 6. Add a button to add the word to the history

import React from 'react';
import { KMPSearch } from '../../../../libs/KMP-Search';
const Sentence = ({ content, word }) => {
  // Upercase
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

  const compare = (word1, word2) => {
    return word1.toLowerCase() === word2.toLowerCase();
  };

  return (
    <span>
      {getParts(content, word)
        .filter((part) => part)
        .map((part, i) =>
          compare(part, word) ? (
            <span className="bg-sky-400 text-white font-bold " key={i}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
    </span>
  );
};

export default Sentence;
