export class Display {
  constructor(
    {
      pageContainerSelector = '.container',
      tasksContainerSelector = '.tasks',
      projectsContainerSelector = '.projects'
    } = {}) {
    this.pageContainer = document.querySelector(pageContainerSelector);
    this.tasksContainer = document.querySelector(tasksContainerSelector);
    this.projectsContainer = document.querySelector(projectsContainerSelector);
  }
}
