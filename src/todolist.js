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

  updateTask(taskId, { projectId, ...taskDetails }) {
    taskDetails.project = this.#findProjectById(projectId);
    this.tasks.find(task => task.id === taskId).update(taskDetails);
  }

  toggleTaskStatus(taskId) {
    this.tasks.find(task => task.id === taskId).toggleStatus();
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  createProject(projectDetails) {
    this.projects.push(new Project(projectDetails));
  }

  updateProject(projectId, projectDetails) {
    this.projects.find(project => project.id === projectId)
      .update(projectDetails);
  }

  #findProjectById(projectId) {
    return this.projects.find(project => project.id === projectId);
  }
}
