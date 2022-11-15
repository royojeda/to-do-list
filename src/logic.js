import { Task } from './task.js';
import { Project } from './project.js'

export class Logic {
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
    this.#findTaskById(taskId).update(taskDetails);
  }

  toggleTaskStatus(taskId) {
    this.#findTaskById(taskId).toggleStatus();
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  createProject(projectDetails) {
    this.projects.push(new Project(projectDetails));
  }

  updateProject(projectId, projectDetails) {
    this.#findProjectById(projectId).update(projectDetails);
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter(project => project.id !== projectId);
    this.tasks = this.tasks.filter(task => task.project.id !== projectId);
  }

  #findProjectById(projectId) {
    return this.projects.find(project => project.id === projectId);
  }

  #findTaskById(taskId) {
    return this.tasks.find(task => task.id === taskId);
  }
}
