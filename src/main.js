import {generateTasks} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {createEditableTaskTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";

const ALL_TASKS_COUNT = 20;
const TASKS_COUNT = 8;

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

for (let i = 1; i <= TASKS_COUNT; i++) {
  render(createTaskTemplate(tasks[i]), boardTasksElement, `beforeend`);
}

const boardElement = mainElement.querySelector(`.board`);

render(createLoadMoreButtonTemplate(), boardElement, `beforeend`);
