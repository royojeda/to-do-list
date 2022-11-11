export class Project {
  static nextId = 0;

  constructor({ title }) {
    this.id = Project.nextId++;
    this.title = title;
  }
}
