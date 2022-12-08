export class Task {
  static #nextId = 0;

  static setNextId(value) {
    this.#nextId = value;
  }

  constructor({ title, description, dueDate, priority, projectId, isFinished = false }) {
    this.id = Task.#nextId++;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
    this.isFinished = isFinished;
  }

  update({ title, description, dueDate, priority, projectId }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
  }

  toggleStatus() {
    this.isFinished = !this.isFinished;
  }
}
