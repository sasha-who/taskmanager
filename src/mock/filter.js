const generateFilters = (tasks) => {
  const countAll = tasks.length;
  let countOverdue = 0;
  let countToday = 0;
  let countFavorites = 0;
  let countRepeating = 0;
  let countArchive = 0;

  for (let task of tasks) {
    const {dueDate, repeatingDays, isFavorite, isArchive} = task;
    const currentDate = new Date(Date.now());
    const monthCondition = (dueDate !== null) && (dueDate.getMonth() === currentDate.getMonth());
    const dateCondition = (dueDate !== null) && (dueDate.getDate() === currentDate.getDate());

    if ((dueDate !== null) && (dueDate < currentDate)) {
      countOverdue++;
    }

    if (monthCondition && dateCondition) {
      countToday++;
    }

    if (isFavorite) {
      countFavorites++;
    }

    if (Object.values(repeatingDays).some(Boolean)) {
      countRepeating++;
    }

    if (isArchive) {
      countArchive++;
    }
  }

  return [{
    name: `all`,
    count: countAll
  }, {
    name: `overdue`,
    count: countOverdue
  }, {
    name: `today`,
    count: countToday
  }, {
    name: `favorites`,
    count: countFavorites
  }, {
    name: `repeating`,
    count: countRepeating
  }, {
    name: `archive`,
    count: countArchive
  }];
};

export {generateFilters};
