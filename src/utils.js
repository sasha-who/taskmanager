const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const castomizeTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castomizeTimeFormat(date.getHours() % 12);
  const minutes = castomizeTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export {getRandomIntegerNumber, getRandomArrayItem, formatTime};
