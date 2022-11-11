import { Task } from './task.js';
import { Project } from './project.js'

export class ToDoList {
  constructor(projects = [ new Project({ title: 'Default Project' }) ], tasks = []) {
    this.projects = projects;
    this.tasks = tasks;
  }
}
