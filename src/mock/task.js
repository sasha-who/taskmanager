const MIN_DIFF = 0;
const MAX_DIFF = 8;

const TasksDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const Colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
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

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDate = () => {
  const sign = (Math.random() > 0.5) ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(MIN_DIFF, MAX_DIFF);
  const date = new Date();

  return date.setDate(date.getDate() + diffValue);
};

const generateRepeatingDays = () => {
  return {
    "mo": Math.random() > 0.5,
    "tu": Math.random() > 0.5,
    "we": Math.random() > 0.5,
    "th": Math.random() > 0.5,
    "fr": Math.random() > 0.5,
    "sa": Math.random() > 0.5,
    "su": Math.random() > 0.5
  };
};

const generateTask = () => {
  const dueDate = (Math.random() > 0.5) ? null : getRandomDate();

  return {
    description: getRandomArrayItem(TasksDescriptions),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(Colors),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  let tasks = [];

  for (let i = 0; i < count; i++) {
    tasks.push(generateTask());
  }

  return tasks;
};
