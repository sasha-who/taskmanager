import {getRandomIntegerNumber, getRandomArrayItem} from "../utils.js";
import {COLORS} from "../const.js";

const MIN_DIFF = -8;
const MAX_DIFF = 8;

const TASKS_DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false
};

const getRandomDate = () => {
  const date = new Date();

  date.setDate(date.getDate() + getRandomIntegerNumber(MIN_DIFF, MAX_DIFF));

  return date;
};

const generateRepeatingDays = () => ({
  "mo": Math.random() > 0.5,
  "tu": Math.random() > 0.5,
  "we": Math.random() > 0.5,
  "th": Math.random() > 0.5,
  "fr": Math.random() > 0.5,
  "sa": Math.random() > 0.5,
  "su": Math.random() > 0.5
});

const generateTask = () => {
  const dueDate = (Math.random() > 0.5) ? null : getRandomDate();

  return {
    description: getRandomArrayItem(TASKS_DESCRIPTIONS),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(COLORS),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

export const generateAllTasks = (count) => (
  Array(count)
  .fill()
  .map(() => generateTask())
);
