'use strict';

const TASKS_COUNT = 3;

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

const render = (template, container, position) => {
  container.insertAdjacentHTML(position, template);
};

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);

render(createMenuTemplate(), mainControlElement, `beforeend`);
render(createFilterTemplate(), mainElement, `beforeend`);
render(createBoardTemplate(), mainElement, `beforeend`);

const boardTasksElement = mainElement.querySelector(`.board__tasks`);

render(createEditableTaskTemplate(), boardTasksElement, `beforeend`);

for (let i = 0; i < TASKS_COUNT; i++) {
  render(createTaskTemplate(), boardTasksElement, `beforeend`);
}

const boardElement = mainElement.querySelector(`.board`);

render(createLoadMoreButtonTemplate(), boardElement, `beforeend`);
