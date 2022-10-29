class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

const defaultProject = new Project('Default Project');
console.log(defaultProject.name, defaultProject.tasks);
