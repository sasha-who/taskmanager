import {CRITICAL_NUMBER} from "./const.js";

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (elements) => {
  const randomIndex = getRandomIntegerNumber(0, elements.length);

  return elements[randomIndex];
};

const castomizeTimeFormat = (value) => {
  return value < CRITICAL_NUMBER ? `0${value}` : value.toString();
};

const formatTime = (date) => {
  const hours = castomizeTimeFormat(date.getHours() % 12);
  const minutes = castomizeTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export {getRandomIntegerNumber, getRandomArrayItem, formatTime};
