export class Task {
  static nextId = 0;

  constructor({ title, description, dueDate, priority, project, isFinished = false }) {
    this.id = Task.nextId++;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.isFinished = isFinished;
  }

  update({ title, description, dueDate, priority, project }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }

  toggleStatus() {
    this.isFinished = !this.isFinished;
  }
}
