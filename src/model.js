import { Task } from "./task";
import { Project } from "./project";

export class Model {
  #tasks;
  #projects;

  constructor() {
    this.#projects = JSON.parse(localStorage.getItem('projects')) || [];
    this.#tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // this.seed();
    if (this.#projects.length > 0) {
      Project.setNextId(this.#projects[ this.#projects.length - 1 ].id + 1);
    } else {
      this.createProject({ title: 'Default Project' });
    }
    if (this.#tasks.length > 0) {
      Project.setNextId(this.#tasks[ this.#tasks.length - 1 ].id + 1);
    }

    this.#tasks.forEach(task => {
      task.dueDate = new Date(task.dueDate);
    });
  }

  get tasks() {
    return this.#tasks;
  }

  createTask(taskDetails) {
    this.#tasks.push(new Task(taskDetails));
    localStorage.setItem('tasks', JSON.stringify(this.#tasks));
  }

  updateTask(taskId, taskDetails) {
    this.#tasks.find(task => task.id === taskId).update(taskDetails);
    localStorage.setItem('tasks', JSON.stringify(this.#tasks));
  }

  deleteTask(taskId) {
    this.#tasks = this.#tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.#tasks));
  }

  toggleTaskStatus(taskId) {
    this.#tasks.find(task => task.id === taskId).toggleStatus();
    localStorage.setItem('tasks', JSON.stringify(this.#tasks));
  }

  tasksInProject(projectId) {
    return this.#tasks.filter(task => task.projectId === projectId);
  }

  get projects() {
    return this.#projects;
  }

  createProject(projectDetails) {
    this.#projects.push(new Project(projectDetails));
    localStorage.setItem('projects', JSON.stringify(this.#projects));
  }

  updateProject(projectId, projectDetails) {
    this.#projects.find(project => project.id === projectId).update(projectDetails);
    localStorage.setItem('projects', JSON.stringify(this.#projects));
  }

  deleteProject(projectId) {
    this.#projects = this.#projects.filter(project => project.id !== projectId);
    this.#tasks = this.#tasks.filter(task => task.projectId !== projectId);
    localStorage.setItem('projects', JSON.stringify(this.#projects));
    localStorage.setItem('tasks', JSON.stringify(this.#tasks));
  }

  firstProjectId() {
    return this.projects[0] ? this.projects[0].id : 0;
  }

  seed() {
    for (let i = 2; i <= 15; i++) {
      this.createProject(
        {
          title: `Project ${ i }`
        }
      );

      for (let j = 1; j <= 15; j++) {
        this.createTask(
          {
            title: `Project ${ i } Task ${ j }`,
            description: 'this is a task description',
            dueDate: new Date(),
            priority: Math.floor(Math.random() * 3 + 1),
            projectId: this.#projects[ i - 1 ].id,
            isFinished: Math.random() < 0.5
          }
        );
      }
    }
    this.createTask(
      {
        title: `Default Project Task 1`,
        description: 'this is a task description',
        dueDate: new Date(),
        priority: Math.floor(Math.random() * 3 + 1),
        projectId: this.firstProjectId(),
        isFinished: Math.random() < 0.5
      }
    );
  }
}
