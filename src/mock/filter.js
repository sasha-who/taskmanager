import {FILTER_NAMES} from "../const.js";

const filtersCount = FILTER_NAMES.reduce((counter, filter) => {
  counter[filter] = 0;

  return counter;
}, {});

export const generateFilters = (tasks) => {
  filtersCount[`all`] = tasks.length;

  for (let task of tasks) {
    const {dueDate, repeatingDays, isFavorite, isArchive} = task;
    const currentDate = new Date();

    const isMonthMatch = (dueDate !== null) && (dueDate.getMonth() === currentDate.getMonth());
    const isDateMatch = (dueDate !== null) && (dueDate.getDate() === currentDate.getDate());

    filtersCount[`overdue`] = ((dueDate !== null) && (dueDate < currentDate)) ?
      ++filtersCount[`overdue`] :
      filtersCount[`overdue`];

    filtersCount[`today`] = (isMonthMatch && isDateMatch) ?
      ++filtersCount[`today`] :
      filtersCount[`today`];

    filtersCount[`favorites`] = isFavorite ?
      ++filtersCount[`favorites`] :
      filtersCount[`favorites`];

    filtersCount[`repeating`] = Object.values(repeatingDays).some(Boolean) ?
      ++filtersCount[`repeating`] :
      filtersCount[`repeating`];

    filtersCount[`archive`] = isArchive ?
      ++filtersCount[`archive`] :
      filtersCount[`archive`];
  }

  return FILTER_NAMES.map((item) => ({
    name: item,
    count: filtersCount[item]
  }));
};
