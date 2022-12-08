export class View {
  constructor() {
    this.root = this.createRoot();
    this.innerContainer = this.createInnerContainer();
    this.header = this.createHeader();
    this.belowHeader = this.createBelowHeader();
    this.sidebar = this.createSidebar();
    this.mainSection = this.createMainSection();
    this.belowHeader.append(this.sidebar, this.mainSection);
    this.innerContainer.append(this.header, this.belowHeader);
    this.root.append(this.innerContainer);
    document.body.append(this.root);
    this.showProjectTasksButtons = {};
    this.deleteProjectButtons = {};
    this.deleteProjectAcceptButtons = {};
    this.editProjectButtons = {};
    this.updateProjectButton = {};
    this.projectDisplays = {};
    this.deleteTaskButton = {};
    this.deleteTaskAcceptButtons = {};
    this.toggleTaskStatusButton = {};
    this.editTaskButton = {};
    this.updateTaskButton = {};
    this.showTaskDetailsButtons = {};
  }

  createRoot() {
    const element = document.createElement('div');
    element.className = 'root h-screen p-10 relative text-gray-600';
    return element;
  }

  createInnerContainer() {
    const element = document.createElement('div');
    element.className = 'innerContainer h-full flex flex-col overflow-hidden shadow-lg rounded border divide-y';
    return element;
  }

  createHeader() {
    const element = document.createElement('div');
    element.className = 'header p-2 text-2xl font-medium flex items-center gap-2 justify-center';
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
    </svg>
    To-Do List`;
    return element;
  }

  createBelowHeader() {
    const element = document.createElement('div');
    element.className = 'belowHeader flex-1 flex overflow-hidden divide-x';
    return element;
  }

  createSidebar() {
    const element = document.createElement('div');
    element.className = 'sidebar w-1/4 flex flex-col gap-4 p-4';
    this.newProject = this.newProjectButton();
    this.projectsList = this.makeProjectsList();
    element.append(this.newProject, this.projectsList);
    return element;
  }

  newProjectButton() {
    const element = document.createElement('button');
    element.className = 'shadow rounded border w-fit self-center p-1 px-3 hover:bg-gray-200 active:bg-gray-300 transition flex gap-2';
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    New project`;
    return element;
  }

  makeProjectsList() {
    const element = document.createElement('div');
    element.className = 'projects flex flex-col gap-4 overflow-y-auto pb-0.5';
    return element;
  }

  displayProjects(projects) {
    this.projectsList.replaceChildren();
    projects.forEach(project => {
      this.projectsList.append(this.displayProject(project));
    });
  }

  displayProject(project) {
    const element = document.createElement('div');
    element.className = 'break-words flex items-center rounded border shadow divide-x';
    element.append(this.showProjectTasks(project), this.editProject(project), this.deleteProject(project));
    this.projectDisplays[project.id] = element;
    return element;
  }

  showProjectTasks(project) {
    const element = document.createElement('button');
    element.className = `project-${ project.id } flex-1 p-2 hover:bg-gray-200 active:bg-gray-300 transition`;
    element.textContent = project.title;
    this.showProjectTasksButtons[project.id] = element;
    return element;
  }

  editProject(project) {
    const element = document.createElement('button');
    element.className = 'p-2 hover:bg-green-200 active:bg-green-300 transition';
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    `;
    this.editProjectButtons[project.id] = { project: project, button: element };
    return element;
  }

  deleteProject(project) {
    const element = document.createElement('button');
    element.className = 'p-2 hover:bg-red-200 active:bg-red-300 transition';
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
    </svg>
    `;
    this.deleteProjectButtons[project.id] = { project: project, button: element };
    return element;
  }

  deleteProjectConfirmation(project) {
    const element = document.createElement('div');
    element.className = 'absolute top-0 left-0 bg-gray-300/95 h-screen w-screen flex justify-center items-center';
    element.append(this.deleteProjectConfirmationCard(project));
    return element
  }
  deleteProjectConfirmationCard(project) {
    const element = document.createElement('div');
    element.className = 'w-[90vw] max-w-md bg-white p-8 rounded shadow border flex flex-col gap-2';
    element.append(this.deleteProjectHeading(project), this.deleteProjectWarning(), this.deleteProjectAccept(project), this.makeCloseModalButton());
    return element;
  }

  deleteProjectHeading(project) {
    const element = document.createElement('div');
    element.className = 'text-xl pb-4';
    element.textContent = `Confirm deletion of '${ project.title }'`;
    return element;
  }

  deleteProjectWarning() {
    const element = document.createElement('div');
    element.className = 'pb-4';
    element.textContent = 'All the tasks in this project will also be deleted.';
    return element;
  }

  makeCloseModalButton(text = 'Cancel') {
    const element = document.createElement('button');
    element.className = 'border shadow rounded transition hover:bg-gray-200 active:bg-gray-300 w-full py-1';
    element.textContent = text;
    element.addEventListener('click', () => {
      this.closeModal();
    });
    element.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === 'Escape') {
        this.closeModal();
      }
    });
    this.closeModalButton = element;
    return element;
  }

  deleteProjectAccept(project) {
    const element = document.createElement('button');
    element.className = 'border shadow rounded transition hover:bg-gray-200 active:bg-gray-300 w-full py-1';
    element.textContent = 'Accept';
    this.deleteProjectAcceptButtons[project.id] = element;
    return element;
  }

  newProjectModal() {
    const element = document.createElement('div');
    element.className = 'absolute top-0 left-0 bg-gray-300/95 h-screen w-screen flex justify-center items-center';
    element.append(this.newProjectCard());
    return element
  }

  newProjectCard() {
    const element = document.createElement('div');
    element.className = 'w-[90vw] max-w-md bg-white flex gap-2 p-8 border rounded shadow flex-col';
    element.append(this.newProjectForm(), this.createProject(), this.makeCloseModalButton());
    return element;
  }

  newProjectForm() {
    const element = document.createElement('div');
    element.append(this.projectTitlePrompt());
    return element;
  }

  projectTitlePrompt(projectTitle = '') {
    const element = document.createElement('div');
    element.className = 'flex flex-col gap-2 pb-4';
    element.append(this.projectTitleLabel(), this.projectTitleInput(projectTitle));
    return element;
  }

  projectTitleLabel() {
    const element = document.createElement('label');
    element.htmlFor = 'projectTitle';
    element.textContent = 'Title:';
    return element;
  }

  projectTitleInput(projectTitle) {
    const element = document.createElement('input');
    element.className = 'border rounded px-2 py-1 flex-1';
    element.id = 'projectTitle';
    element.type = 'text';
    element.value = projectTitle;
    this.newProjectTitle = element;
    return element;
  }

  createProject() {
    const element = document.createElement('button');
    element.className = 'border rounded shadow px-2 py-1 transition hover:bg-gray-200 active:bg-gray-300';
    element.textContent = 'Create';
    this.createProjectButton = element;
    return element;
  }

  editProjectModal(project) {
    const element = document.createElement('div');
    element.className = 'absolute top-0 left-0 bg-gray-300/95 h-screen w-screen flex justify-center items-center';
    element.append(this.editProjectCard(project));
    return element
  }

  editProjectCard(project) {
    const element = document.createElement('div');
    element.className = 'w-[90vw] max-w-md bg-white flex gap-2 p-8 border rounded shadow flex-col';
    element.append(this.editProjectForm(project), this.updateProject(project), this.makeCloseModalButton());
    return element;
  }

  editProjectForm(project) {
    const element = document.createElement('div');
    element.append(this.projectTitlePrompt(project.title));
    return element;
  }

  updateProject(project) {
    const element = document.createElement('button');
    element.className = 'border rounded shadow py-1 px-2 transition hover:bg-gray-200 active:bg-gray-300';
    element.textContent = 'Update';
    this.updateProjectButton[project.id] = element;
    return element;
  }

  createMainSection() {
    const element = document.createElement('div');
    element.className = 'mainContent flex-1 p-4 flex flex-col gap-4';
    this.newTaskButton = this.newTask();
    this.tasksList = this.createTasksList();
    element.append(this.newTaskButton, this.tasksList);
    return element;
  }

  displayTasks(tasks) {
    this.tasksList.replaceChildren();
    tasks.forEach(task => {
      this.tasksList.append(this.displayTask(task));
    });
  }

  newTask() {
    const element = document.createElement('button');
    element.className = 'shadow rounded border w-fit self-center p-1 px-3 hover:bg-gray-200 active:bg-gray-300 transition flex gap-2';
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    New task`;
    return element;
  }

  remakeNewTaskButton() {
    const newButton = this.newTaskButton.cloneNode(true);
    this.newTaskButton.parentNode.replaceChild(newButton, this.newTaskButton);
    this.newTaskButton = newButton;
  }

  createTasksList() {
    const element = document.createElement('div');
    element.className = 'tasks flex flex-col gap-4 overflow-y-auto pb-0.5';
    return element;
  }

  displayTask(task) {
    const element = document.createElement('div');
    element.className = 'break-words flex items-center border rounded shadow divide-x';
    element.append(this.displaytaskPriority(task), this.toggleTaskStatus(task), this.showTaskDetails(task), this.editTask(task), this.deleteTask(task));
    return element;
  }

  toggleTaskStatus(task) {
    const element = document.createElement('button');
    element.className = 'p-4 transition hover:bg-gray-200 h-full';
    if (task.isFinished) {
      element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-5 h-5"><path d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>`;
    } else {
      element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-5 h-5"><path d="M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>`;
    }
    this.toggleTaskStatusButton[task.id] = { task: task, button: element };
    return element;
  }

  displaytaskPriority(task) {
    const element = document.createElement('div');
    element.className = 'w-1 h-full';
    let backgroundColor;
    switch (task.priority) {
      case 1:
        backgroundColor = 'bg-green-200';
        break;
      case 2:
        backgroundColor = 'bg-yellow-200';
        break;
      case 3:
        backgroundColor = 'bg-red-200';
        break;
      default:
    }
    element.classList.add(backgroundColor);
    return element;
  }

  showTaskDetails(task) {
    const element = document.createElement('button');
    element.className = 'flex-1 break-all p-4 hover:bg-gray-200 transition';
    let titleDisplay;
    if (task.isFinished) {
      titleDisplay = document.createElement('s');
      titleDisplay.textContent = task.title;
      element.className += ' text-gray-300';
    } else {
      titleDisplay = task.title;
    }
    element.append(titleDisplay);
    this.showTaskDetailsButtons[task.id] = { task: task, button: element };
    return element;
  }

  editTask(task) {
    const element = document.createElement('button');
    element.className = 'p-4 hover:bg-green-200 active:bg-green-300 transition';
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    `;
    this.editTaskButton[task.id] = { task: task, button: element };
    return element;
  }

  deleteTask(task) {
    const element = document.createElement('button');
    element.className = 'p-4 hover:bg-red-200 active:bg-red-300 transition';
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
    </svg>
    `;
    this.deleteTaskButton[task.id] = { task: task, button: element }
    return element;
  }

  closeModal() {
    this.root.removeChild(this.root.lastElementChild);
  }

  openDeleteProjectModal(project) {
    this.root.append(this.deleteProjectConfirmation(project));
  }

  openNewProjectModal() {
    this.root.append(this.newProjectModal());
    this.newProjectTitle.focus();
  }

  openEditProjectModal(project) {
    this.root.append(this.editProjectModal(project));
    this.newProjectTitle.focus();
  }

  bindShowProjectTasks(handler) {
    Object.entries(this.showProjectTasksButtons).forEach(([projectId, button]) => {
      button.addEventListener('click', () => {
        handler(Number(projectId));
      });
    });
  }

  bindDeleteProject(handler) {
    Object.values(this.deleteProjectButtons).forEach(({ project, button }) => {
      button.addEventListener('click', () => {
        handler(project);
      });
    });
  }

  bindDeleteProjectAccept(handler) {
    Object.entries(this.deleteProjectAcceptButtons).forEach(([projectId, button]) => {
      button.focus();
      button.addEventListener('click', () => {
        handler(Number(projectId));
      });
      button.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
        handler(Number(projectId));
        } else if (event.key === 'Escape') {
          this.closeModal();
        }
      });
    });
  }

  bindNewProject(handler) {
    this.newProject.addEventListener('click', () => {
      handler();
    });
  }

  deleteProjectDisplay(targetProjectId) {
    this.projectDisplays = Object.fromEntries(Object.entries(this.projectDisplays).filter(([projectId]) => {
      return Number(projectId) !== targetProjectId
    }));
  }

  bindCreateProject(handler) {
    this.createProjectButton.addEventListener('click', () => {
      handler({ title: this.newProjectTitle.value });
    });
    this.newProjectTitle.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        handler({ title: this.newProjectTitle.value });
      } else if (event.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  bindEditProject(handler) {
    Object.values(this.editProjectButtons).forEach(({ project, button }) => {
      button.addEventListener('click', () => {
        handler(project);
      });
    });
  }

  bindUpdateProject(handler) {
    let id;
    Object.entries(this.updateProjectButton).forEach(([projectId, button]) => {
      id = projectId;
      button.addEventListener('click', () => {
        handler(Number(projectId), { title: this.newProjectTitle.value });
      });
    });
    this.newProjectTitle.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        handler(Number(id), { title: this.newProjectTitle.value });
      } else if (event.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  bindDeleteTask(handler) {
    Object.values(this.deleteTaskButton).forEach(({ task, button }) => {
      button.addEventListener('click', () => {
        handler(task);
      });
    });
  }

  bindDeleteTaskAccept(handler) {
    Object.values(this.deleteTaskAcceptButtons).forEach(({ task, button }) => {
      button.focus();
      button.addEventListener('click', () => {
        handler(task);
      });
      button.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
        handler(task);
        } else if (event.key === 'Escape') {
          this.closeModal();
        }
      });
    });
  }

  openDeleteTaskModal(task) {
    this.root.append(this.deleteTaskConfirmation(task));
  }

  deleteTaskConfirmation(task) {
    const element = document.createElement('div');
    element.className = 'absolute top-0 left-0 bg-gray-300/95 h-screen w-screen flex justify-center items-center';
    element.append(this.deleteTaskConfirmationCard(task));
    return element
  }
  deleteTaskConfirmationCard(task) {
    const element = document.createElement('div');
    element.className = 'w-[90vw] max-w-md bg-white flex flex-col gap-2 p-8 rounded border shadow';
    element.append(this.deleteTaskHeading(task), this.deleteTaskWarning(), this.deleteTaskAccept(task), this.makeCloseModalButton());
    return element;
  }

  deleteTaskHeading(task) {
    const element = document.createElement('div');
    element.className = 'text-xl pb-4';
    element.textContent = `Confirm deletion of '${ task.title }'`;
    return element;
  }

  deleteTaskWarning() {
    const element = document.createElement('div');
    element.className = 'pb-4';
    element.textContent = 'This action cannot be undone.';
    return element;
  }

  deleteTaskAccept(task) {
    const element = document.createElement('button');
    element.className = 'border rounded shadow py-1 transition hover:bg-gray-200 active:bg-gray-300 w-full';
    element.textContent = 'Accept';
    this.deleteTaskAcceptButtons[task.id] = { task: task, button: element };
    return element;
  }

  bindNewTask(handler) {
    this.newTaskButton.addEventListener('click', () => {
      handler();
    });
  }

  bindCreateTask(handler) {
    this.newTaskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formProps = Object.fromEntries(formData);
      formProps.dueDate = new Date(formProps.dueDate);
      formProps.priority = Number(formProps.priority);
      formProps.projectId = Number(formProps.projectId);
      handler(formProps);
    });
    [ this.newTaskTitle, this.newTaskDescription, this.newTaskDueDate, this.newTaskLowPriority, this.newTaskMediumPriority, this.newTaskHighPriority, this.newTaskProjectId ].forEach(input => {
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          if (this.newTaskForm.reportValidity()) {
            const formData = new FormData(this.newTaskForm);
            const formProps = Object.fromEntries(formData);
            formProps.dueDate = new Date(formProps.dueDate);
            formProps.priority = Number(formProps.priority);
            formProps.projectId = Number(formProps.projectId);
            handler(formProps);
          }
        } else if (event.key === 'Escape') {
          this.closeModal();
        }
      });
    });
  }

  openNewTaskModal(projects) {
    this.root.append(this.newTaskModal(projects));
    this.newTaskTitle.focus();
  }

  newTaskModal(projects) {
    const element = document.createElement('div');
    element.className = 'absolute top-0 left-0 bg-gray-300/95 h-screen w-screen flex justify-center items-center';
    element.append(this.newTaskCard(projects));
    return element
  }

  createTask() {
    const element = document.createElement('button');
    element.className = 'border rounded shadow transition hover:bg-gray-200 active:bg-gray-300 py-1';
    element.type = 'submit';
    element.textContent = 'Create';
    this.createTaskButton = element;
    return element;
  }

  bindToggleTaskStatus(handler) {
    Object.values(this.toggleTaskStatusButton).forEach(({ task, button }) => {
      button.addEventListener('click', () => {
        handler(task, button);
      });
    });
  }

  toggleTaskStatusDisplay(task, button) {
    if (task.isFinished) {
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-5 h-5"><path d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>`;
    } else {
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-5 h-5"><path d="M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>`;
    }
    this.showTaskDetailsButtons[task.id].button.parentNode.childNodes[2].replaceWith(this.showTaskDetails(task));
  }

  bindEditTask(handler) {
    Object.values(this.editTaskButton).forEach(({ task, button }) => {
      button.addEventListener('click', () => {
        handler(task);
      });
    });
  }

  openEditTaskModal(task, projects) {
    this.root.append(this.editTaskModal(task, projects));
    this.newTaskTitle.focus();
  }

  editTaskModal(task, projects) {
    const element = document.createElement('div');
    element.className = 'absolute top-0 left-0 bg-gray-300/95 h-screen w-screen flex justify-center items-center';
    element.append(this.editTaskCard(projects, task));
    return element
  }

  editTaskCard(projects, task = '') {
    const element = document.createElement('div');
    element.className = 'w-[90vw] max-w-md bg-white border rounded shadow p-8';
    element.append(this.makeEditTaskForm(task, projects));
    return element;
  }

  newTaskCard(projects, task = '') {
    const element = document.createElement('div');
    element.className = 'w-[90vw] max-w-md bg-white border rounded shadow p-8';
    element.append(this.makeNewTaskForm(task, projects));
    return element;
  }

  makeNewTaskForm(task, projects) {
    const element = document.createElement('form');
    element.className = 'flex flex-col gap-2';
    element.id = 'newTaskForm';
    element.append(this.taskTitlePrompt(task), this.taskDescriptionPrompt(task), this.taskDueDatePrompt(task), this.taskPriorityPrompt(task), this.taskProjectIdPrompt(projects, task), this.createTask(), this.makeCloseModalButton());
    this.newTaskForm = element;
    return element;
  }

  makeEditTaskForm(task, projects) {
    const element = document.createElement('form');
    element.className = 'flex flex-col gap-2';
    element.id = 'newTaskForm';
    element.append(this.taskTitlePrompt(task), this.taskDescriptionPrompt(task), this.taskDueDatePrompt(task), this.taskPriorityPrompt(task), this.taskProjectIdPrompt(projects, task), this.updateTask(task), this.makeCloseModalButton());
    this.editTaskForm = element;
    return element;
  }

  taskTitlePrompt(task = '') {
    const element = document.createElement('div');
    element.className = 'flex flex-col gap-2';
    element.append(this.taskTitleLabel(), this.taskTitleInput(task));
    return element;
  }

  taskTitleLabel() {
    const element = document.createElement('label');
    element.htmlFor = 'taskTitle';
    element.textContent = 'Title:';
    return element;
  }

  taskTitleInput(task) {
    const element = document.createElement('input');
    element.className = 'flex-1 border rounded p-2';
    element.id = 'taskTitle';
    element.name = 'title';
    element.type = 'text';
    if (task.title) {
      element.value = task.title;
    }
    this.newTaskTitle = element;
    element.required = true;
    return element;
  }

  taskDescriptionPrompt(task = '') {
    const element = document.createElement('div');
    element.className = 'flex flex-col gap-2';
    element.append(this.taskDescriptionLabel(), this.taskDescriptionInput(task));
    return element;
  }

  taskDescriptionLabel() {
    const element = document.createElement('label');
    element.htmlFor = 'taskDescription';
    element.textContent = 'Description:';
    return element;
  }

  taskDescriptionInput(task) {
    const element = document.createElement('textarea');
    element.className = 'resize-none flex-1 border rounded p-2'
    element.id = 'taskDescription';
    element.name = 'description';
    if (task.description) {
      element.value = task.description;
    }
    element.rows = 4;
    this.newTaskDescription = element;
    element.required = true;
    return element;
  }

  taskDueDatePrompt(task = '') {
    const element = document.createElement('div');
    element.className = 'flex flex-col gap-2';
    element.append(this.taskDueDateLabel(), this.taskDueDateInput(task));
    return element;
  }

  taskDueDateLabel() {
    const element = document.createElement('label');
    element.htmlFor = 'taskDueDate';
    element.textContent = 'Due date:';
    return element;
  }

  taskDueDateInput(task) {
    const element = document.createElement('input');
    element.className = 'border rounded p-2 text-center';
    element.id = 'taskDueDate';
    element.name = 'dueDate';
    element.type = 'date';
    if (task.dueDate) {
      console.log(task);
      const date = task.dueDate.getDate().toString().padStart(2, "0");
      const month = task.dueDate.getMonth() + 1;
      const year = task.dueDate.getFullYear();
      const value = `${ year }-${ month }-${ date }`;
      element.value = value;
    }
    this.newTaskDueDate = element;
    element.required = true;
    return element;
  }

  taskPriorityPrompt(task = '') {
    const element = document.createElement('div');
    element.className = 'flex flex-col gap-2';
    element.append(this.taskPriorityLabel(), this.taskPriorityOptions(task));
    return element;
  }

  taskPriorityLabel() {
    const element = document.createElement('label');
    element.htmlFor = 'priority';
    element.textContent = 'Priority:';
    return element;
  }

  taskPriorityOptions(task) {
    const element = document.createElement('div');
    element.className = 'flex flex-col gap-2';
    element.append(this.taskLowPrioritySelection(task), this.taskMediumPrioritySelection(task), this.taskHighPrioritySelection(task));
    return element;
  }

  taskLowPrioritySelection(task) {
    const element = document.createElement('div');
    element.className = 'flex border rounded cursor-pointer';
    element.append(this.taskLowPriorityInput(task), this.taskLowPriorityLabel());
    return element;
  }

  taskLowPriorityInput(task) {
    const element = document.createElement('input');
    element.className = 'm-3 mr-0';
    element.type = 'radio';
    element.id = 'lowPriority';
    element.name = 'priority';
    element.value = '1';
    element.required = true;
    element.checked = task.priority === 1;
    this.newTaskLowPriority = element;
    return element;
  }

  taskLowPriorityLabel() {
    const element = document.createElement('label');
    element.className = 'flex-1 flex justify-center items-center cursor-pointer';
    element.htmlFor = 'lowPriority';
    element.textContent = 'Low';
    return element;
  }

  taskMediumPrioritySelection(task) {
    const element = document.createElement('div');
    element.className = 'flex border rounded cursor-pointer';
    element.append(this.taskMediumPriorityInput(task), this.taskMediumPriorityLabel());
    return element;
  }

  taskMediumPriorityInput(task) {
    const element = document.createElement('input');
    element.className = 'm-3 mr-0';
    element.type = 'radio';
    element.id = 'mediumPriority';
    element.name = 'priority';
    element.value = '2';
    element.required = true;
    element.checked = task.priority === 2;
    this.newTaskMediumPriority = element;
    return element;
  }

  taskMediumPriorityLabel() {
    const element = document.createElement('label');
    element.className = 'flex-1 flex justify-center items-center cursor-pointer';
    element.htmlFor = 'mediumPriority';
    element.textContent = 'Medium';
    return element;
  }

  taskHighPrioritySelection(task) {
    const element = document.createElement('div');
    element.className = 'flex border rounded cursor-pointer';
    element.append(this.taskHighPriorityInput(task), this.taskHighPriorityLabel());
    return element;
  }

  taskHighPriorityInput(task) {
    const element = document.createElement('input');
    element.className = 'm-3 mr-0';
    element.type = 'radio';
    element.id = 'highPriority';
    element.name = 'priority';
    element.value = '3';
    element.required = true;
    element.checked = task.priority === 3;
    this.newTaskHighPriority = element;
    return element;
  }

  taskHighPriorityLabel() {
    const element = document.createElement('label');
    element.className = 'flex-1 flex justify-center items-center cursor-pointer';
    element.htmlFor = 'highPriority';
    element.textContent = 'High';
    return element;
  }

  taskProjectIdPrompt(projects, task = '') {
    const element = document.createElement('div');
    element.className = 'flex flex-col gap-2 pb-4';
    element.append(this.taskProjectIdLabel(), this.taskProjectIdInput(task, projects));
    return element;
  }

  taskProjectIdLabel() {
    const element = document.createElement('label');
    element.htmlFor = 'taskProjectId';
    element.textContent = 'Project:';
    return element;
  }

  taskProjectIdInput(task, projects) {
    const element = document.createElement('select');
    element.className = 'border rounded p-2';
    element.name = 'projectId';
    element.id = 'taskProjectId';
    const defaultValue = document.createElement('option');
    defaultValue.value = '';
    defaultValue.textContent = 'Select a project';
    defaultValue.disabled = true;
    defaultValue.selected = true;
    element.append(defaultValue);
    projects.forEach((project) => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.title;
      option.selected = Number(option.value) === task.projectId;
      element.append(option);
    });
    element.required = true;
    this.newTaskProjectId = element;
    return element;
  }

  updateTask(task) {
    const element = document.createElement('button');
    element.className = 'border rounded shadow transition hover:bg-gray-200 active:bg-gray-300 py-1';
    element.type = 'submit';
    element.textContent = 'Update';
    this.updateTaskButton[task.id] = element;
    return element;
  }

  bindUpdateTask(handler) {
    this.editTaskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formProps = Object.fromEntries(formData);
      formProps.dueDate = new Date(formProps.dueDate);
      formProps.priority = Number(formProps.priority);
      formProps.projectId = Number(formProps.projectId);
      handler(Number(Object.keys(this.updateTaskButton)[0]), formProps);
    });
    [ this.newTaskTitle, this.newTaskDescription, this.newTaskDueDate, this.newTaskLowPriority, this.newTaskMediumPriority, this.newTaskHighPriority, this.newTaskProjectId ].forEach(input => {
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          if (this.editTaskForm.reportValidity()) {
            const formData = new FormData(this.editTaskForm);
            const formProps = Object.fromEntries(formData);
            formProps.dueDate = new Date(formProps.dueDate);
            formProps.priority = Number(formProps.priority);
            formProps.projectId = Number(formProps.projectId);
            handler(Number(Object.keys(this.updateTaskButton)[0]), formProps);
          }
        } else if (event.key === 'Escape') {
          this.closeModal();
        }
      });
    });
  }

  highlightProject(projectId) {
    const buttons = document.querySelectorAll('[class^=project-]');
    buttons.forEach(button => {
      if (button.classList[0] === `project-${ projectId }`) {
        button.classList.add('bg-gray-300');
      } else {
        button.classList.remove('bg-gray-300');
      }
    });
  }

  bindShowTaskDetails(handler) {
    Object.values(this.showTaskDetailsButtons).forEach(({ task, button }) => {
      button.addEventListener('click', () => {
        handler(task);
      });
    });
  }

  openTaskDetailsModal(task) {
    this.root.append(this.taskDetailsModal(task));
    this.closeModalButton.focus();
  }

  taskDetailsModal(task) {
    const element = document.createElement('div');
    element.className = 'absolute top-0 left-0 bg-gray-300/95 h-screen w-screen flex justify-center items-center';
    element.append(this.taskDetailsCard(task));
    return element;
  }

  taskDetailsCard(task) {
    const element = document.createElement('div');
    element.className = 'w-[90vw] max-w-md bg-white border rounded shadow p-8 flex flex-col gap-2';
    element.append(this.taskTitleDisplay(task), this.taskDescriptionDisplay(task), this.taskDueDateDisplay(task), this.taskPriorityDisplay(task), this.makeCloseModalButton('Close'));
    return element;
  }

  taskTitleDisplay(task) {
    const element = document.createElement('div');
    element.className = 'text-xl pb-4';
    element.textContent = task.title;
    return element;
  }

  taskDescriptionDisplay(task) {
    const element = document.createElement('div');
    element.className = 'pb-4';
    element.textContent = task.description;
    return element;
  }

  taskDueDateDisplay(task) {
    const element = document.createElement('div');
    element.textContent = `Due date: ${ task.dueDate.toLocaleDateString('en-US', { dateStyle: 'full' }) }`;
    return element;
  }

  taskPriorityDisplay(task) {
    const element = document.createElement('div');
    element.className = 'pb-4';
    let text;
    switch (task.priority) {
      case 1:
        text = 'Low';
        break;
      case 2:
        text = 'Medium';
        break;
      case 3:
        text = 'High';
        break;
    }
    element.textContent = `Priority: ${ text }`;
    return element;
  }
}
