import { Display } from './display.js';
import { Logic } from './logic.js';

export class ToDoList {
  constructor(display = new Display(), logic = new Logic()) {
    this.display = display;
    this.logic = logic;
  }

  setup() {
    this.display.layoutPage();
    this.seed();
    this.showProjects();
  }

  seed() {
    this.logic.createProject(
      {
        title: 'this is a long project title'
      }
    );
    this.logic.createProject(
      {
        title: 'pneumonoultramicroscopicsilicovolcanoconiosis'
      }
    );
    for (let i = 2; i <= 5; i++) {
      this.logic.createProject(
        {
          title: `Project ${ i }`
        }
      );
    }
    for (let i = 1; i <=5; i++) {
      this.logic.createTask(
        {
          title: `Task ${ i }`,
          description: 'this is a task',
          dueDate: new Date(),
          priority: 1,
          projectId: 0
        }
      );
    }
  }

  showProjects() {
    this.logic.projects.forEach(project => {
      this.display.showProject(project, this.logic.tasksIn(project));
    });
  }
}
