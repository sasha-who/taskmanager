import {COLORS, DAYS, MONTH_NAMES} from "../const.js";
import {formatTime, createElement} from "../utils.js";

const createRepeatingDaysMarkup = (days, repeatingDays) => (
  days.map((item, index) => {
    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${item}-${index}"
        name="repeat"
        value="${item}"
        ${repeatingDays[item] ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${item}-${index}"
        >${item}</label
      >`
    );
  })
  .join(`\n`)
);

const createColorsMarkup = (colors, currentColor) => {
  return (
    colors.map((item, index) => {
      return (
        `<input
          type="radio"
          id="color-${item}-${index}"
          class="card__color-input card__color-input--${item} visually-hidden"
          name="color"
          value="${item}"
          ${(item === currentColor) ? `checked` : ``}
        />
        <label
          for="color-${item}-${index}"
          class="card__color card__color--${item}"
          >${item}</label
        >`
      );
    })
    .join(`\n`)
  );
};

const createEditableTaskTemplate = ({description, dueDate, repeatingDays, color}) => {
  const isOverdue = (dueDate !== null) && (dueDate < Date.now());
  const isRepeated = Object.values(repeatingDays).some(Boolean);
  const isDateShow = (dueDate !== null) ? true : false;

  const deadlineClass = isOverdue ? `card--deadline` : ``;
  const repeatClass = isRepeated ? `card--repeat` : ``;
  const date = isDateShow ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShow ? formatTime(dueDate) : ``;

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShow ? `yes` : `no`}</span>
                </button>

                ${isDateShow ? `<fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${date} ${time}"
                    />
                  </label>
                </fieldset>` : ``}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeated ? `yes` : `no`}</span>
                </button>

                ${isRepeated ? `<fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${createRepeatingDaysMarkup(DAYS, repeatingDays)}
                  </div>
                </fieldset>` : ``}
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${createColorsMarkup(COLORS, color)}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createEditableTaskTemplate(this._task);
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
