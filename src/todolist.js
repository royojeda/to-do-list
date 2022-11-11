import { Task } from './task.js';
import { Project } from './project.js'

export class ToDoList {
  constructor(projects = [ new Project({ title: 'Default Project' }) ], tasks = []) {
    this.projects = projects;
    this.tasks = tasks;
  }

  createTask({ projectId, ...taskDetails }) {
    taskDetails.project = this.#findProjectById(projectId);
    this.tasks.push(new Task(taskDetails));
  }

  #findProjectById(projectId) {
    return this.projects.find(project => project.id === projectId);
  }
}
