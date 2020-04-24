import {ALL_TASKS_COUNT, INITIAL_TASKS_COUNT, ADDITIONAL_TASKS_COUNT} from "./const.js";
import {RenderPosition, render} from "./utils.js";
import {generateAllTasks} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import BoardComponent from "./components/board.js";
import TaskEditComponent from "./components/task-edit.js";
import TaskComponent from "./components/task.js";
import LoadMoreButtonComponent from "./components/load-more-button.js";

const renderTask = (task, container) => {
  const editButtonClickHandler = () => {
    container.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    container.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  const formElement = taskEditComponent.getElement().querySelector(`.card__form`);

  editButton.addEventListener(`click`, editButtonClickHandler);
  formElement.addEventListener(`submit`, formSubmitHandler);
  render(taskComponent.getElement(), container, RenderPosition.BEFOREAND);
};

const tasks = generateAllTasks(ALL_TASKS_COUNT);
const filters = generateFilters(tasks);

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

const menuComponent = new MenuComponent();

render(menuComponent.getElement(), mainControlElement, RenderPosition.BEFOREAND);

const filterComponent = new FilterComponent(filters);

render(filterComponent.getElement(), mainElement, RenderPosition.BEFOREAND);

const boardComponent = new BoardComponent();

render(boardComponent.getElement(), mainElement, RenderPosition.BEFOREAND);

const boardTasksElement = boardComponent.getElement().querySelector(`.board__tasks`);

for (let i = 0; i < INITIAL_TASKS_COUNT; i++) {
  renderTask(tasks[i], boardTasksElement);
}

const loadMoreButtonComponent = new LoadMoreButtonComponent();

render(loadMoreButtonComponent.getElement(), boardComponent.getElement(), RenderPosition.BEFOREAND);

const loadMoreButton = boardComponent.getElement().querySelector(`.load-more`);

let currentTasksCount = INITIAL_TASKS_COUNT;

loadMoreButton.addEventListener(`click`, () => {
  let tasksCountByClick = currentTasksCount + ADDITIONAL_TASKS_COUNT;

  tasks.slice(currentTasksCount, tasksCountByClick).forEach((item) => {
    renderTask(item, boardTasksElement);
  });

  currentTasksCount = tasksCountByClick;

  if (currentTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
