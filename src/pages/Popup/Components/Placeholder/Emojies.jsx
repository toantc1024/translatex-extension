import React, { useEffect, useState } from 'react';

const DictionaryPlaceHolder = () => {
  const DEFAULT_EMOJIES = [
    ['🤠', '🌵 Cowboy'],
    ['👨‍🚀', '🚀 Astronaut'],
    ['👨‍🍳', '🍳 Chef'],
    ['👨‍🎨', '🎨 Artist'],
    ['👨‍🔬', '🔬 Scientist'],
    ['👨‍💻', '💻 Programmer'],
    ['👨‍🏫', '🏫 Teacher'],
    ['👨‍🚒', '🚒 Firefighter'],
    ['👮‍♂️', '🚓 Police Officer'],
    ['👷‍♂️', '🚧 Construction Worker'],
  ];
  const [emojies, setEmojies] = useState(DEFAULT_EMOJIES[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let new_index = index + 1;
      if (new_index >= DEFAULT_EMOJIES.length) {
        new_index = 0;
      }
      setIndex(new_index);
    }, 4750);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="z-0 flex items-center justify-center mt-48 relative">
      <div className="p-4 bg-white border-[1px] rounded-full w-[100px] h-[100px] flex items-center justify-center">
        <span className="text-4xl">{'🤔'}</span>
      </div>
      <div className="absolute top-[-65px] right-[25px] p-4 bg-white border-[1px] shadow-lg rounded-full min-w-[50px] w-auto h-[50px] flex items-center justify-center ">
        <span className="text-2xl">{DEFAULT_EMOJIES[index][1]}</span>
      </div>
    </div>
  );
};

export default DictionaryPlaceHolder;
