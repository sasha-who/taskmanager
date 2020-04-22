const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const FiltersCount = {};

filterNames.forEach((item) => {
  FiltersCount[item] = 0;
});

export const generateFilters = (tasks) => {
  FiltersCount[`all`] = tasks.length;

  for (let task of tasks) {
    const {dueDate, repeatingDays, isFavorite, isArchive} = task;
    const currentDate = new Date(Date.now());

    const isOverdue = (dueDate !== null) && (dueDate < currentDate);
    const isMonthMatch = (dueDate !== null) && (dueDate.getMonth() === currentDate.getMonth());
    const isDateMatch = (dueDate !== null) && (dueDate.getDate() === currentDate.getDate());
    const isRepeating = Object.values(repeatingDays).some(Boolean);

    if (isOverdue) {
      FiltersCount[`overdue`]++;
    }

    if (isMonthMatch && isDateMatch) {
      FiltersCount[`today`]++;
    }

    if (isFavorite) {
      FiltersCount[`favorites`]++;
    }

    if (isRepeating) {
      FiltersCount[`repeating`]++;
    }

    if (isArchive) {
      FiltersCount[`archive`]++;
    }
  }

  return filterNames.map((item) => {
    return {
      name: item,
      count: FiltersCount[item]
    };
  });
};
