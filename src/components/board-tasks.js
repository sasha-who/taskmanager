import {createElement} from "../utils.js";

const createBoardTasksTemplate = () => (
  `<div class="board__tasks"></div>`
);

export default class BoardTasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTasksTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
