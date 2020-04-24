import {CRITICAL_NUMBER} from "./const.js";

export const RenderPosition = {
  BEFOREAND: `beforeand`,
  AFTERBEGIN: `afterbegin`
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (elements) => {
  const randomIndex = getRandomIntegerNumber(0, elements.length);

  return elements[randomIndex];
};

const castomizeTimeFormat = (value) => {
  return value < CRITICAL_NUMBER ? `0${value}` : value.toString();
};

export const formatTime = (date) => {
  const hours = castomizeTimeFormat(date.getHours() % 12);
  const minutes = castomizeTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const createElement = (template) => {
  const container = document.createElement(`div`);

  container.innerHTML = template;

  return container.firstChild;
};

export const render = (element, container, position) => {
  switch (position) {
    case RenderPosition.BEFOREAND:
      container.append(element);
      break;

    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
  }
};
