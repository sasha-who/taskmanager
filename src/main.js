import {ALL_TASKS_COUNT, INITIAL_TASKS_COUNT, ADDITIONAL_TASKS_COUNT} from "./const.js";
import {generateTasks} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {createEditableTaskTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";

const tasks = generateTasks(ALL_TASKS_COUNT);
const filters = generateFilters(tasks);

const render = (template, container, position) => {
  container.insertAdjacentHTML(position, template);
};

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(createMenuTemplate(), mainControlElement, `beforeend`);
render(createFilterTemplate(filters), mainElement, `beforeend`);
render(createBoardTemplate(), mainElement, `beforeend`);

const boardTasksElement = mainElement.querySelector(`.board__tasks`);

render(createEditableTaskTemplate(tasks[0]), boardTasksElement, `beforeend`);

for (let i = 1; i < INITIAL_TASKS_COUNT; i++) {
  render(createTaskTemplate(tasks[i]), boardTasksElement, `beforeend`);
}

const boardElement = mainElement.querySelector(`.board`);

render(createLoadMoreButtonTemplate(), boardElement, `beforeend`);

const loadMoreButton = boardElement.querySelector(`.load-more`);

let currentTasksCount = INITIAL_TASKS_COUNT;

loadMoreButton.addEventListener(`click`, () => {
  let tasksCountByClick = currentTasksCount + ADDITIONAL_TASKS_COUNT;

  tasks.slice(currentTasksCount, tasksCountByClick).forEach((item) => {
    render(createTaskTemplate(item), boardTasksElement, `beforeend`);
  });

  currentTasksCount = tasksCountByClick;

  if (currentTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
