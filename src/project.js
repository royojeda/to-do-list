export class Project {
  static #nextId = 0;

  static setNextId(value) {
    this.#nextId = value;
  }

  constructor({ title }) {
    this.id = Project.#nextId++;
    this.title = title;
  }

  update({ title }) {
    this.title = title;
  }
}
