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

  showProject(project, tasks) {
    this.projectsContainer().appendChild(this.createProjectButton(project, tasks));
  }

  createProjectsContainer() {
    const component = document.createElement('div');
    component.className = 'projects w-1/3 max-w-xs p-4 flex flex-col gap-4 h-screen overflow-y-auto break-words';
    return component;
  }

  createTasksContainer() {
    const component = document.createElement('div');
    component.className = 'tasks w-full p-4 flex flex-col gap-4';
    component.textContent = 'tasks';
    return component;
  }

  projectsContainer() {
    return document.querySelector('.projects');
  }

  tasksContainer() {
    return document.querySelector('.tasks');
  }

  createProjectButton(project, tasks) {
    const component = document.createElement('button');
    component.className = 'border shadow rounded p-2 transition hover:bg-gray-200 focus:ring focus:ring-gray-200 focus:ring-offset-1 focus:bg-gray-200 active:bg-gray-300';
    component.textContent = project.title;
    component.addEventListener('click', () => {
      this.showTasks(tasks);
    });
    return component;
  }

  showTasks(tasks) {
    this.tasksContainer().replaceChildren();
    tasks.forEach(task => {
      this.tasksContainer().appendChild(this.createTaskCard(task));
    });
  }

  createTaskCard(task) {
    const component = document.createElement('button');
    component.className = 'border shadow rounded text-left p-2 transition hover:bg-gray-200 focus:ring focus:ring-gray-200 focus:ring-offset-1 focus:bg-gray-200 active:bg-gray-300';
    component.textContent = task.title;
    return component;
  }
}
