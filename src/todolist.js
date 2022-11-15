import { Display } from './display.js';
import { Logic } from './logic.js';

export class ToDoList {
  constructor(display = new Display(), logic = new Logic()) {
    this.display = display;
    this.logic = logic;
  }

  setup() {
    this.display.layoutPage();
  }
}
