class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const defaultProject = new Project('Default Project');
console.log(defaultProject.name, defaultProject.tasks);
