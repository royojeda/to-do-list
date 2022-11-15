export class Display {
  constructor(pageContainerSelector = '.page') {
    this.pageContainer = document.querySelector(pageContainerSelector);
  }

  layoutPage() {
    this.pageContainer.className += ' ';
    this.pageContainer.className += 'h-screen flex divide-x';
    this.pageContainer.appendChild(this.createProjectsContainer());
    this.pageContainer.appendChild(this.createTasksContainer());
  }

  createProjectsContainer() {
    const component = document.createElement('div');
    component.className = 'projects w-1/3 max-w-xs p-4';
    component.textContent = 'projects';
    return component;
  }

  createTasksContainer() {
    const component = document.createElement('div');
    component.className = 'tasks w-full p-4';
    component.textContent = 'tasks';
    return component;
  }
}
