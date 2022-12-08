/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller)
/* harmony export */ });
class Controller {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;

    this.displayProjects(this.model.projects);
    this.view.bindNewProject(this.handleNewProject);
  }

  displayProjects(projects, activeProjectId = this.model.firstProjectId()) {
    this.view.displayProjects(projects, activeProjectId);
    this.view.remakeNewTaskButton();
    this.view.bindNewTask(this.handleNewTask);
    this.handleShowProjectTasks(activeProjectId);
    if (projects.length > 0) {
      this.view.bindShowProjectTasks(this.handleShowProjectTasks);
      this.view.bindDeleteProject(this.handleDeleteProject);
      this.view.bindEditProject(this.handleEditProject);
    }
  }

  displayTasks(tasks) {
    this.view.displayTasks(tasks);
    this.view.bindToggleTaskStatus(this.handleToggleTaskStatus);
    if (tasks.length > 0) {
      this.view.bindDeleteTask(this.handleDeleteTask);
      this.view.bindEditTask(this.handleEditTask);
      this.view.bindShowTaskDetails(this.handleShowTaskDetails);
    }
  }

  handleDeleteTask = (task) => {
    this.view.openDeleteTaskModal(task);
    this.view.bindDeleteTaskAccept(this.handleDeleteTaskAccept);
  }

  handleDeleteTaskAccept = (task) => {
    this.model.deleteTask(task.id);
    this.handleShowProjectTasks(task.projectId);
    this.view.closeModal();
  }

  handleShowProjectTasks = (projectId) => {
    this.view.highlightProject(projectId);
    this.displayTasks(this.model.tasksInProject(projectId));
  }

  handleDeleteProject = (project) => {
    this.view.openDeleteProjectModal(project);
    this.view.bindDeleteProjectAccept(this.handleDeleteProjectAccept);
  }

  handleDeleteProjectAccept = (projectId) => {
    this.model.deleteProject(projectId);
    this.displayProjects(this.model.projects);
    this.view.closeModal();
  }

  handleNewProject = () => {
    this.view.openNewProjectModal();
    this.view.bindCreateProject(this.handleCreateProject);
  }

  handleCreateProject = (projectDetails) => {
    this.model.createProject(projectDetails);
    this.displayProjects(this.model.projects, this.model.projects[ this.model.projects.length - 1 ].id);
    this.view.closeModal();
  }

  handleEditProject = (project) => {
    this.view.openEditProjectModal(project);
    this.view.bindUpdateProject(this.handleUpdateProject);
  }

  handleUpdateProject = (projectId, projectDetails) => {
    this.model.updateProject(projectId, projectDetails);
    this.displayProjects(this.model.projects, projectId);
    this.view.closeModal();
  }

  handleNewTask = () => {
    this.view.openNewTaskModal(this.model.projects);
    this.view.bindCreateTask(this.handleCreateTask);
  }

  handleCreateTask = (taskDetails) => {
    this.model.createTask(taskDetails);
    this.handleShowProjectTasks(taskDetails.projectId);
    this.view.closeModal();
  }

  handleToggleTaskStatus = (task, button) => {
    this.model.toggleTaskStatus(task.id);
    this.view.toggleTaskStatusDisplay(task, button);
    this.view.bindShowTaskDetails(this.handleShowTaskDetails);
  }

  handleEditTask = (task) => {
    this.view.openEditTaskModal(task, this.model.projects);
    this.view.bindUpdateTask(this.handleUpdateTask);
  }

  handleUpdateTask = (taskId, taskDetails) => {
    this.model.updateTask(taskId, taskDetails);
    this.handleShowProjectTasks(taskDetails.projectId);
    this.view.closeModal();
  }

  handleShowTaskDetails = (task) => {
    this.view.openTaskDetailsModal(task);
  }
}


/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => (/* binding */ Model)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");



class Model {
  #tasks;
  #projects;

  constructor() {
    this.#projects = JSON.parse(localStorage.getItem('projects')) || [];
    this.#tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // this.seed();
    if (this.#projects.length > 0) {
      _project__WEBPACK_IMPORTED_MODULE_1__.Project.setNextId(this.#projects[ this.#projects.length - 1 ].id + 1);
    } else {
      this.createProject({ title: 'Default Project' });
    }
    if (this.#tasks.length > 0) {
      _project__WEBPACK_IMPORTED_MODULE_1__.Project.setNextId(this.#tasks[ this.#tasks.length - 1 ].id + 1);
    }

    this.#tasks.forEach(task => {
      task.dueDate = new Date(task.dueDate);
    });
  }

  get tasks() {
    return this.#tasks;
  }

  createTask(taskDetails) {
    this.#tasks.push(new _task__WEBPACK_IMPORTED_MODULE_0__.Task(taskDetails));
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
    this.#projects.push(new _project__WEBPACK_IMPORTED_MODULE_1__.Project(projectDetails));
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


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
class Project {
  static #nextId = 0;

  static setNextId(value) {
    this.#nextId = value;
  }

  constructor({ title }) {
    this.id = Project.#nextId++;
    this.title = title;
  }

  update({ title }) {
    this.title = title;
  }
}


/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
class Task {
  static #nextId = 0;

  static setNextId(value) {
    this.#nextId = value;
  }

  constructor({ title, description, dueDate, priority, projectId, isFinished = false }) {
    this.id = Task.#nextId++;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
    this.isFinished = isFinished;
  }

  update({ title, description, dueDate, priority, projectId }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
  }

  toggleStatus() {
    this.isFinished = !this.isFinished;
  }
}


/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": () => (/* binding */ View)
/* harmony export */ });
class View {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./src/view.js");




// localStorage.clear();

const app = new _controller__WEBPACK_IMPORTED_MODULE_0__.Controller({ model: new _model__WEBPACK_IMPORTED_MODULE_1__.Model(), view: new _view__WEBPACK_IMPORTED_MODULE_2__.View() });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1AsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRzhCO0FBQ007O0FBRTdCO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1REFBaUI7QUFDdkIsTUFBTTtBQUNOLDJCQUEyQiwwQkFBMEI7QUFDckQ7QUFDQTtBQUNBLE1BQU0sdURBQWlCO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLHVDQUFJO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0Qiw2Q0FBTztBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0EsNkJBQTZCLEdBQUc7QUFDaEM7QUFDQTs7QUFFQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0EsK0JBQStCLElBQUksUUFBUSxHQUFHO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOUdPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNmTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0Isc0VBQXNFO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxrREFBa0Q7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1Qk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQyxhQUFhO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGVBQWU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQSx3REFBd0QsaUJBQWlCO0FBQ3pFO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixtQ0FBbUM7QUFDbkQsS0FBSztBQUNMO0FBQ0E7QUFDQSxrQkFBa0IsbUNBQW1DO0FBQ3JELFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0Esc0RBQXNELGlCQUFpQjtBQUN2RTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG1DQUFtQztBQUN4RSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSw4QkFBOEIsbUNBQW1DO0FBQ2pFLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0Esb0RBQW9ELGNBQWM7QUFDbEU7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQSwyREFBMkQsY0FBYztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFlBQVk7QUFDL0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRCxjQUFjO0FBQ3hFO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRCxjQUFjO0FBQ2hFO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE1BQU0sSUFBSSxPQUFPLElBQUksTUFBTTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsV0FBVztBQUN6RDtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsMERBQTBELGNBQWM7QUFDeEU7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsMkNBQTJDLG1CQUFtQixHQUFHO0FBQ3pHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU07QUFDOUM7QUFDQTtBQUNBOzs7Ozs7O1VDMytCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDVjtBQUNGOztBQUU5Qjs7QUFFQSxnQkFBZ0IsbURBQVUsR0FBRyxXQUFXLHlDQUFLLGNBQWMsdUNBQUksSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZGVsLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoeyBtb2RlbCwgdmlldyB9KSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG5cbiAgICB0aGlzLmRpc3BsYXlQcm9qZWN0cyh0aGlzLm1vZGVsLnByb2plY3RzKTtcbiAgICB0aGlzLnZpZXcuYmluZE5ld1Byb2plY3QodGhpcy5oYW5kbGVOZXdQcm9qZWN0KTtcbiAgfVxuXG4gIGRpc3BsYXlQcm9qZWN0cyhwcm9qZWN0cywgYWN0aXZlUHJvamVjdElkID0gdGhpcy5tb2RlbC5maXJzdFByb2plY3RJZCgpKSB7XG4gICAgdGhpcy52aWV3LmRpc3BsYXlQcm9qZWN0cyhwcm9qZWN0cywgYWN0aXZlUHJvamVjdElkKTtcbiAgICB0aGlzLnZpZXcucmVtYWtlTmV3VGFza0J1dHRvbigpO1xuICAgIHRoaXMudmlldy5iaW5kTmV3VGFzayh0aGlzLmhhbmRsZU5ld1Rhc2spO1xuICAgIHRoaXMuaGFuZGxlU2hvd1Byb2plY3RUYXNrcyhhY3RpdmVQcm9qZWN0SWQpO1xuICAgIGlmIChwcm9qZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnZpZXcuYmluZFNob3dQcm9qZWN0VGFza3ModGhpcy5oYW5kbGVTaG93UHJvamVjdFRhc2tzKTtcbiAgICAgIHRoaXMudmlldy5iaW5kRGVsZXRlUHJvamVjdCh0aGlzLmhhbmRsZURlbGV0ZVByb2plY3QpO1xuICAgICAgdGhpcy52aWV3LmJpbmRFZGl0UHJvamVjdCh0aGlzLmhhbmRsZUVkaXRQcm9qZWN0KTtcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5VGFza3ModGFza3MpIHtcbiAgICB0aGlzLnZpZXcuZGlzcGxheVRhc2tzKHRhc2tzKTtcbiAgICB0aGlzLnZpZXcuYmluZFRvZ2dsZVRhc2tTdGF0dXModGhpcy5oYW5kbGVUb2dnbGVUYXNrU3RhdHVzKTtcbiAgICBpZiAodGFza3MubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy52aWV3LmJpbmREZWxldGVUYXNrKHRoaXMuaGFuZGxlRGVsZXRlVGFzayk7XG4gICAgICB0aGlzLnZpZXcuYmluZEVkaXRUYXNrKHRoaXMuaGFuZGxlRWRpdFRhc2spO1xuICAgICAgdGhpcy52aWV3LmJpbmRTaG93VGFza0RldGFpbHModGhpcy5oYW5kbGVTaG93VGFza0RldGFpbHMpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURlbGV0ZVRhc2sgPSAodGFzaykgPT4ge1xuICAgIHRoaXMudmlldy5vcGVuRGVsZXRlVGFza01vZGFsKHRhc2spO1xuICAgIHRoaXMudmlldy5iaW5kRGVsZXRlVGFza0FjY2VwdCh0aGlzLmhhbmRsZURlbGV0ZVRhc2tBY2NlcHQpO1xuICB9XG5cbiAgaGFuZGxlRGVsZXRlVGFza0FjY2VwdCA9ICh0YXNrKSA9PiB7XG4gICAgdGhpcy5tb2RlbC5kZWxldGVUYXNrKHRhc2suaWQpO1xuICAgIHRoaXMuaGFuZGxlU2hvd1Byb2plY3RUYXNrcyh0YXNrLnByb2plY3RJZCk7XG4gICAgdGhpcy52aWV3LmNsb3NlTW9kYWwoKTtcbiAgfVxuXG4gIGhhbmRsZVNob3dQcm9qZWN0VGFza3MgPSAocHJvamVjdElkKSA9PiB7XG4gICAgdGhpcy52aWV3LmhpZ2hsaWdodFByb2plY3QocHJvamVjdElkKTtcbiAgICB0aGlzLmRpc3BsYXlUYXNrcyh0aGlzLm1vZGVsLnRhc2tzSW5Qcm9qZWN0KHByb2plY3RJZCkpO1xuICB9XG5cbiAgaGFuZGxlRGVsZXRlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgdGhpcy52aWV3Lm9wZW5EZWxldGVQcm9qZWN0TW9kYWwocHJvamVjdCk7XG4gICAgdGhpcy52aWV3LmJpbmREZWxldGVQcm9qZWN0QWNjZXB0KHRoaXMuaGFuZGxlRGVsZXRlUHJvamVjdEFjY2VwdCk7XG4gIH1cblxuICBoYW5kbGVEZWxldGVQcm9qZWN0QWNjZXB0ID0gKHByb2plY3RJZCkgPT4ge1xuICAgIHRoaXMubW9kZWwuZGVsZXRlUHJvamVjdChwcm9qZWN0SWQpO1xuICAgIHRoaXMuZGlzcGxheVByb2plY3RzKHRoaXMubW9kZWwucHJvamVjdHMpO1xuICAgIHRoaXMudmlldy5jbG9zZU1vZGFsKCk7XG4gIH1cblxuICBoYW5kbGVOZXdQcm9qZWN0ID0gKCkgPT4ge1xuICAgIHRoaXMudmlldy5vcGVuTmV3UHJvamVjdE1vZGFsKCk7XG4gICAgdGhpcy52aWV3LmJpbmRDcmVhdGVQcm9qZWN0KHRoaXMuaGFuZGxlQ3JlYXRlUHJvamVjdCk7XG4gIH1cblxuICBoYW5kbGVDcmVhdGVQcm9qZWN0ID0gKHByb2plY3REZXRhaWxzKSA9PiB7XG4gICAgdGhpcy5tb2RlbC5jcmVhdGVQcm9qZWN0KHByb2plY3REZXRhaWxzKTtcbiAgICB0aGlzLmRpc3BsYXlQcm9qZWN0cyh0aGlzLm1vZGVsLnByb2plY3RzLCB0aGlzLm1vZGVsLnByb2plY3RzWyB0aGlzLm1vZGVsLnByb2plY3RzLmxlbmd0aCAtIDEgXS5pZCk7XG4gICAgdGhpcy52aWV3LmNsb3NlTW9kYWwoKTtcbiAgfVxuXG4gIGhhbmRsZUVkaXRQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcbiAgICB0aGlzLnZpZXcub3BlbkVkaXRQcm9qZWN0TW9kYWwocHJvamVjdCk7XG4gICAgdGhpcy52aWV3LmJpbmRVcGRhdGVQcm9qZWN0KHRoaXMuaGFuZGxlVXBkYXRlUHJvamVjdCk7XG4gIH1cblxuICBoYW5kbGVVcGRhdGVQcm9qZWN0ID0gKHByb2plY3RJZCwgcHJvamVjdERldGFpbHMpID0+IHtcbiAgICB0aGlzLm1vZGVsLnVwZGF0ZVByb2plY3QocHJvamVjdElkLCBwcm9qZWN0RGV0YWlscyk7XG4gICAgdGhpcy5kaXNwbGF5UHJvamVjdHModGhpcy5tb2RlbC5wcm9qZWN0cywgcHJvamVjdElkKTtcbiAgICB0aGlzLnZpZXcuY2xvc2VNb2RhbCgpO1xuICB9XG5cbiAgaGFuZGxlTmV3VGFzayA9ICgpID0+IHtcbiAgICB0aGlzLnZpZXcub3Blbk5ld1Rhc2tNb2RhbCh0aGlzLm1vZGVsLnByb2plY3RzKTtcbiAgICB0aGlzLnZpZXcuYmluZENyZWF0ZVRhc2sodGhpcy5oYW5kbGVDcmVhdGVUYXNrKTtcbiAgfVxuXG4gIGhhbmRsZUNyZWF0ZVRhc2sgPSAodGFza0RldGFpbHMpID0+IHtcbiAgICB0aGlzLm1vZGVsLmNyZWF0ZVRhc2sodGFza0RldGFpbHMpO1xuICAgIHRoaXMuaGFuZGxlU2hvd1Byb2plY3RUYXNrcyh0YXNrRGV0YWlscy5wcm9qZWN0SWQpO1xuICAgIHRoaXMudmlldy5jbG9zZU1vZGFsKCk7XG4gIH1cblxuICBoYW5kbGVUb2dnbGVUYXNrU3RhdHVzID0gKHRhc2ssIGJ1dHRvbikgPT4ge1xuICAgIHRoaXMubW9kZWwudG9nZ2xlVGFza1N0YXR1cyh0YXNrLmlkKTtcbiAgICB0aGlzLnZpZXcudG9nZ2xlVGFza1N0YXR1c0Rpc3BsYXkodGFzaywgYnV0dG9uKTtcbiAgICB0aGlzLnZpZXcuYmluZFNob3dUYXNrRGV0YWlscyh0aGlzLmhhbmRsZVNob3dUYXNrRGV0YWlscyk7XG4gIH1cblxuICBoYW5kbGVFZGl0VGFzayA9ICh0YXNrKSA9PiB7XG4gICAgdGhpcy52aWV3Lm9wZW5FZGl0VGFza01vZGFsKHRhc2ssIHRoaXMubW9kZWwucHJvamVjdHMpO1xuICAgIHRoaXMudmlldy5iaW5kVXBkYXRlVGFzayh0aGlzLmhhbmRsZVVwZGF0ZVRhc2spO1xuICB9XG5cbiAgaGFuZGxlVXBkYXRlVGFzayA9ICh0YXNrSWQsIHRhc2tEZXRhaWxzKSA9PiB7XG4gICAgdGhpcy5tb2RlbC51cGRhdGVUYXNrKHRhc2tJZCwgdGFza0RldGFpbHMpO1xuICAgIHRoaXMuaGFuZGxlU2hvd1Byb2plY3RUYXNrcyh0YXNrRGV0YWlscy5wcm9qZWN0SWQpO1xuICAgIHRoaXMudmlldy5jbG9zZU1vZGFsKCk7XG4gIH1cblxuICBoYW5kbGVTaG93VGFza0RldGFpbHMgPSAodGFzaykgPT4ge1xuICAgIHRoaXMudmlldy5vcGVuVGFza0RldGFpbHNNb2RhbCh0YXNrKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBNb2RlbCB7XG4gICN0YXNrcztcbiAgI3Byb2plY3RzO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuI3Byb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW107XG4gICAgdGhpcy4jdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKSB8fCBbXTtcbiAgICAvLyB0aGlzLnNlZWQoKTtcbiAgICBpZiAodGhpcy4jcHJvamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgUHJvamVjdC5zZXROZXh0SWQodGhpcy4jcHJvamVjdHNbIHRoaXMuI3Byb2plY3RzLmxlbmd0aCAtIDEgXS5pZCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZVByb2plY3QoeyB0aXRsZTogJ0RlZmF1bHQgUHJvamVjdCcgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLiN0YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICBQcm9qZWN0LnNldE5leHRJZCh0aGlzLiN0YXNrc1sgdGhpcy4jdGFza3MubGVuZ3RoIC0gMSBdLmlkICsgMSk7XG4gICAgfVxuXG4gICAgdGhpcy4jdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgIHRhc2suZHVlRGF0ZSA9IG5ldyBEYXRlKHRhc2suZHVlRGF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgdGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3Rhc2tzO1xuICB9XG5cbiAgY3JlYXRlVGFzayh0YXNrRGV0YWlscykge1xuICAgIHRoaXMuI3Rhc2tzLnB1c2gobmV3IFRhc2sodGFza0RldGFpbHMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLiN0YXNrcykpO1xuICB9XG5cbiAgdXBkYXRlVGFzayh0YXNrSWQsIHRhc2tEZXRhaWxzKSB7XG4gICAgdGhpcy4jdGFza3MuZmluZCh0YXNrID0+IHRhc2suaWQgPT09IHRhc2tJZCkudXBkYXRlKHRhc2tEZXRhaWxzKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3MnLCBKU09OLnN0cmluZ2lmeSh0aGlzLiN0YXNrcykpO1xuICB9XG5cbiAgZGVsZXRlVGFzayh0YXNrSWQpIHtcbiAgICB0aGlzLiN0YXNrcyA9IHRoaXMuI3Rhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suaWQgIT09IHRhc2tJZCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGhpcy4jdGFza3MpKTtcbiAgfVxuXG4gIHRvZ2dsZVRhc2tTdGF0dXModGFza0lkKSB7XG4gICAgdGhpcy4jdGFza3MuZmluZCh0YXNrID0+IHRhc2suaWQgPT09IHRhc2tJZCkudG9nZ2xlU3RhdHVzKCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGhpcy4jdGFza3MpKTtcbiAgfVxuXG4gIHRhc2tzSW5Qcm9qZWN0KHByb2plY3RJZCkge1xuICAgIHJldHVybiB0aGlzLiN0YXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLnByb2plY3RJZCA9PT0gcHJvamVjdElkKTtcbiAgfVxuXG4gIGdldCBwcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy4jcHJvamVjdHM7XG4gIH1cblxuICBjcmVhdGVQcm9qZWN0KHByb2plY3REZXRhaWxzKSB7XG4gICAgdGhpcy4jcHJvamVjdHMucHVzaChuZXcgUHJvamVjdChwcm9qZWN0RGV0YWlscykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHRoaXMuI3Byb2plY3RzKSk7XG4gIH1cblxuICB1cGRhdGVQcm9qZWN0KHByb2plY3RJZCwgcHJvamVjdERldGFpbHMpIHtcbiAgICB0aGlzLiNwcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkKS51cGRhdGUocHJvamVjdERldGFpbHMpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHRoaXMuI3Byb2plY3RzKSk7XG4gIH1cblxuICBkZWxldGVQcm9qZWN0KHByb2plY3RJZCkge1xuICAgIHRoaXMuI3Byb2plY3RzID0gdGhpcy4jcHJvamVjdHMuZmlsdGVyKHByb2plY3QgPT4gcHJvamVjdC5pZCAhPT0gcHJvamVjdElkKTtcbiAgICB0aGlzLiN0YXNrcyA9IHRoaXMuI3Rhc2tzLmZpbHRlcih0YXNrID0+IHRhc2sucHJvamVjdElkICE9PSBwcm9qZWN0SWQpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHRoaXMuI3Byb2plY3RzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGhpcy4jdGFza3MpKTtcbiAgfVxuXG4gIGZpcnN0UHJvamVjdElkKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzWzBdID8gdGhpcy5wcm9qZWN0c1swXS5pZCA6IDA7XG4gIH1cblxuICBzZWVkKCkge1xuICAgIGZvciAobGV0IGkgPSAyOyBpIDw9IDE1OyBpKyspIHtcbiAgICAgIHRoaXMuY3JlYXRlUHJvamVjdChcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiBgUHJvamVjdCAkeyBpIH1gXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IDE1OyBqKyspIHtcbiAgICAgICAgdGhpcy5jcmVhdGVUYXNrKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiBgUHJvamVjdCAkeyBpIH0gVGFzayAkeyBqIH1gLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICd0aGlzIGlzIGEgdGFzayBkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICBkdWVEYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgcHJpb3JpdHk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMgKyAxKSxcbiAgICAgICAgICAgIHByb2plY3RJZDogdGhpcy4jcHJvamVjdHNbIGkgLSAxIF0uaWQsXG4gICAgICAgICAgICBpc0ZpbmlzaGVkOiBNYXRoLnJhbmRvbSgpIDwgMC41XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNyZWF0ZVRhc2soXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBgRGVmYXVsdCBQcm9qZWN0IFRhc2sgMWAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAndGhpcyBpcyBhIHRhc2sgZGVzY3JpcHRpb24nLFxuICAgICAgICBkdWVEYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBwcmlvcml0eTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyArIDEpLFxuICAgICAgICBwcm9qZWN0SWQ6IHRoaXMuZmlyc3RQcm9qZWN0SWQoKSxcbiAgICAgICAgaXNGaW5pc2hlZDogTWF0aC5yYW5kb20oKSA8IDAuNVxuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgc3RhdGljICNuZXh0SWQgPSAwO1xuXG4gIHN0YXRpYyBzZXROZXh0SWQodmFsdWUpIHtcbiAgICB0aGlzLiNuZXh0SWQgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgdGl0bGUgfSkge1xuICAgIHRoaXMuaWQgPSBQcm9qZWN0LiNuZXh0SWQrKztcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cblxuICB1cGRhdGUoeyB0aXRsZSB9KSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVGFzayB7XG4gIHN0YXRpYyAjbmV4dElkID0gMDtcblxuICBzdGF0aWMgc2V0TmV4dElkKHZhbHVlKSB7XG4gICAgdGhpcy4jbmV4dElkID0gdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3RJZCwgaXNGaW5pc2hlZCA9IGZhbHNlIH0pIHtcbiAgICB0aGlzLmlkID0gVGFzay4jbmV4dElkKys7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLnByb2plY3RJZCA9IHByb2plY3RJZDtcbiAgICB0aGlzLmlzRmluaXNoZWQgPSBpc0ZpbmlzaGVkO1xuICB9XG5cbiAgdXBkYXRlKHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdElkIH0pIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMucHJvamVjdElkID0gcHJvamVjdElkO1xuICB9XG5cbiAgdG9nZ2xlU3RhdHVzKCkge1xuICAgIHRoaXMuaXNGaW5pc2hlZCA9ICF0aGlzLmlzRmluaXNoZWQ7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb290ID0gdGhpcy5jcmVhdGVSb290KCk7XG4gICAgdGhpcy5pbm5lckNvbnRhaW5lciA9IHRoaXMuY3JlYXRlSW5uZXJDb250YWluZXIoKTtcbiAgICB0aGlzLmhlYWRlciA9IHRoaXMuY3JlYXRlSGVhZGVyKCk7XG4gICAgdGhpcy5iZWxvd0hlYWRlciA9IHRoaXMuY3JlYXRlQmVsb3dIZWFkZXIoKTtcbiAgICB0aGlzLnNpZGViYXIgPSB0aGlzLmNyZWF0ZVNpZGViYXIoKTtcbiAgICB0aGlzLm1haW5TZWN0aW9uID0gdGhpcy5jcmVhdGVNYWluU2VjdGlvbigpO1xuICAgIHRoaXMuYmVsb3dIZWFkZXIuYXBwZW5kKHRoaXMuc2lkZWJhciwgdGhpcy5tYWluU2VjdGlvbik7XG4gICAgdGhpcy5pbm5lckNvbnRhaW5lci5hcHBlbmQodGhpcy5oZWFkZXIsIHRoaXMuYmVsb3dIZWFkZXIpO1xuICAgIHRoaXMucm9vdC5hcHBlbmQodGhpcy5pbm5lckNvbnRhaW5lcik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5yb290KTtcbiAgICB0aGlzLnNob3dQcm9qZWN0VGFza3NCdXR0b25zID0ge307XG4gICAgdGhpcy5kZWxldGVQcm9qZWN0QnV0dG9ucyA9IHt9O1xuICAgIHRoaXMuZGVsZXRlUHJvamVjdEFjY2VwdEJ1dHRvbnMgPSB7fTtcbiAgICB0aGlzLmVkaXRQcm9qZWN0QnV0dG9ucyA9IHt9O1xuICAgIHRoaXMudXBkYXRlUHJvamVjdEJ1dHRvbiA9IHt9O1xuICAgIHRoaXMucHJvamVjdERpc3BsYXlzID0ge307XG4gICAgdGhpcy5kZWxldGVUYXNrQnV0dG9uID0ge307XG4gICAgdGhpcy5kZWxldGVUYXNrQWNjZXB0QnV0dG9ucyA9IHt9O1xuICAgIHRoaXMudG9nZ2xlVGFza1N0YXR1c0J1dHRvbiA9IHt9O1xuICAgIHRoaXMuZWRpdFRhc2tCdXR0b24gPSB7fTtcbiAgICB0aGlzLnVwZGF0ZVRhc2tCdXR0b24gPSB7fTtcbiAgICB0aGlzLnNob3dUYXNrRGV0YWlsc0J1dHRvbnMgPSB7fTtcbiAgfVxuXG4gIGNyZWF0ZVJvb3QoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3Jvb3QgaC1zY3JlZW4gcC0xMCByZWxhdGl2ZSB0ZXh0LWdyYXktNjAwJztcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGNyZWF0ZUlubmVyQ29udGFpbmVyKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdpbm5lckNvbnRhaW5lciBoLWZ1bGwgZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LWxnIHJvdW5kZWQgYm9yZGVyIGRpdmlkZS15JztcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGNyZWF0ZUhlYWRlcigpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnaGVhZGVyIHAtMiB0ZXh0LTJ4bCBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBqdXN0aWZ5LWNlbnRlcic7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3M9XCJ3LTYgaC02XCI+XG4gICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMS4zNSAzLjgzNmMtLjA2NS4yMS0uMS40MzMtLjEuNjY0IDAgLjQxNC4zMzYuNzUuNzUuNzVoNC41YS43NS43NSAwIDAwLjc1LS43NSAyLjI1IDIuMjUgMCAwMC0uMS0uNjY0bS01LjggMEEyLjI1MSAyLjI1MSAwIDAxMTMuNSAyLjI1SDE1YzEuMDEyIDAgMS44NjcuNjY4IDIuMTUgMS41ODZtLTUuOCAwYy0uMzc2LjAyMy0uNzUuMDUtMS4xMjQuMDhDOS4wOTUgNC4wMSA4LjI1IDQuOTczIDguMjUgNi4xMDhWOC4yNW04LjktNC40MTRjLjM3Ni4wMjMuNzUuMDUgMS4xMjQuMDggMS4xMzEuMDk0IDEuOTc2IDEuMDU3IDEuOTc2IDIuMTkyVjE2LjVBMi4yNSAyLjI1IDAgMDExOCAxOC43NWgtMi4yNW0tNy41LTEwLjVINC44NzVjLS42MjEgMC0xLjEyNS41MDQtMS4xMjUgMS4xMjV2MTEuMjVjMCAuNjIxLjUwNCAxLjEyNSAxLjEyNSAxLjEyNWg5Ljc1Yy42MjEgMCAxLjEyNS0uNTA0IDEuMTI1LTEuMTI1VjE4Ljc1bS03LjUtMTAuNWg2LjM3NWMuNjIxIDAgMS4xMjUuNTA0IDEuMTI1IDEuMTI1djkuMzc1bS04LjI1LTNsMS41IDEuNSAzLTMuNzVcIiAvPlxuICAgIDwvc3ZnPlxuICAgIFRvLURvIExpc3RgO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgY3JlYXRlQmVsb3dIZWFkZXIoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2JlbG93SGVhZGVyIGZsZXgtMSBmbGV4IG92ZXJmbG93LWhpZGRlbiBkaXZpZGUteCc7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBjcmVhdGVTaWRlYmFyKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdzaWRlYmFyIHctMS80IGZsZXggZmxleC1jb2wgZ2FwLTQgcC00JztcbiAgICB0aGlzLm5ld1Byb2plY3QgPSB0aGlzLm5ld1Byb2plY3RCdXR0b24oKTtcbiAgICB0aGlzLnByb2plY3RzTGlzdCA9IHRoaXMubWFrZVByb2plY3RzTGlzdCgpO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMubmV3UHJvamVjdCwgdGhpcy5wcm9qZWN0c0xpc3QpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgbmV3UHJvamVjdEJ1dHRvbigpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnc2hhZG93IHJvdW5kZWQgYm9yZGVyIHctZml0IHNlbGYtY2VudGVyIHAtMSBweC0zIGhvdmVyOmJnLWdyYXktMjAwIGFjdGl2ZTpiZy1ncmF5LTMwMCB0cmFuc2l0aW9uIGZsZXggZ2FwLTInO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwidy02IGgtNlwiPlxuICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTIgOXY2bTMtM0g5bTEyIDBhOSA5IDAgMTEtMTggMCA5IDkgMCAwMTE4IDB6XCIgLz5cbiAgICA8L3N2Zz5cbiAgICBOZXcgcHJvamVjdGA7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBtYWtlUHJvamVjdHNMaXN0KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdwcm9qZWN0cyBmbGV4IGZsZXgtY29sIGdhcC00IG92ZXJmbG93LXktYXV0byBwYi0wLjUnO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZGlzcGxheVByb2plY3RzKHByb2plY3RzKSB7XG4gICAgdGhpcy5wcm9qZWN0c0xpc3QucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgIHRoaXMucHJvamVjdHNMaXN0LmFwcGVuZCh0aGlzLmRpc3BsYXlQcm9qZWN0KHByb2plY3QpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRpc3BsYXlQcm9qZWN0KHByb2plY3QpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYnJlYWstd29yZHMgZmxleCBpdGVtcy1jZW50ZXIgcm91bmRlZCBib3JkZXIgc2hhZG93IGRpdmlkZS14JztcbiAgICBlbGVtZW50LmFwcGVuZCh0aGlzLnNob3dQcm9qZWN0VGFza3MocHJvamVjdCksIHRoaXMuZWRpdFByb2plY3QocHJvamVjdCksIHRoaXMuZGVsZXRlUHJvamVjdChwcm9qZWN0KSk7XG4gICAgdGhpcy5wcm9qZWN0RGlzcGxheXNbcHJvamVjdC5pZF0gPSBlbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgc2hvd1Byb2plY3RUYXNrcyhwcm9qZWN0KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gYHByb2plY3QtJHsgcHJvamVjdC5pZCB9IGZsZXgtMSBwLTIgaG92ZXI6YmctZ3JheS0yMDAgYWN0aXZlOmJnLWdyYXktMzAwIHRyYW5zaXRpb25gO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xuICAgIHRoaXMuc2hvd1Byb2plY3RUYXNrc0J1dHRvbnNbcHJvamVjdC5pZF0gPSBlbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZWRpdFByb2plY3QocHJvamVjdCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdwLTIgaG92ZXI6YmctZ3JlZW4tMjAwIGFjdGl2ZTpiZy1ncmVlbi0zMDAgdHJhbnNpdGlvbic7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3M9XCJ3LTYgaC02XCI+XG4gICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNi44NjIgNC40ODdsMS42ODctMS42ODhhMS44NzUgMS44NzUgMCAxMTIuNjUyIDIuNjUyTDEwLjU4MiAxNi4wN2E0LjUgNC41IDAgMDEtMS44OTcgMS4xM0w2IDE4bC44LTIuNjg1YTQuNSA0LjUgMCAwMTEuMTMtMS44OTdsOC45MzItOC45MzF6bTAgMEwxOS41IDcuMTI1TTE4IDE0djQuNzVBMi4yNSAyLjI1IDAgMDExNS43NSAyMUg1LjI1QTIuMjUgMi4yNSAwIDAxMyAxOC43NVY4LjI1QTIuMjUgMi4yNSAwIDAxNS4yNSA2SDEwXCIgLz5cbiAgICA8L3N2Zz5cbiAgICBgO1xuICAgIHRoaXMuZWRpdFByb2plY3RCdXR0b25zW3Byb2plY3QuaWRdID0geyBwcm9qZWN0OiBwcm9qZWN0LCBidXR0b246IGVsZW1lbnQgfTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGRlbGV0ZVByb2plY3QocHJvamVjdCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdwLTIgaG92ZXI6YmctcmVkLTIwMCBhY3RpdmU6YmctcmVkLTMwMCB0cmFuc2l0aW9uJztcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzcz1cInctNiBoLTZcIj5cbiAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEyIDkuNzVMMTQuMjUgMTJtMCAwbDIuMjUgMi4yNU0xNC4yNSAxMmwyLjI1LTIuMjVNMTQuMjUgMTJMMTIgMTQuMjVtLTIuNTggNC45MmwtNi4zNzUtNi4zNzVhMS4xMjUgMS4xMjUgMCAwMTAtMS41OUw5LjQyIDQuODNjLjIxMS0uMjExLjQ5OC0uMzMuNzk2LS4zM0gxOS41YTIuMjUgMi4yNSAwIDAxMi4yNSAyLjI1djEwLjVhMi4yNSAyLjI1IDAgMDEtMi4yNSAyLjI1aC05LjI4NGMtLjI5OCAwLS41ODUtLjExOS0uNzk2LS4zM3pcIiAvPlxuICAgIDwvc3ZnPlxuICAgIGA7XG4gICAgdGhpcy5kZWxldGVQcm9qZWN0QnV0dG9uc1twcm9qZWN0LmlkXSA9IHsgcHJvamVjdDogcHJvamVjdCwgYnV0dG9uOiBlbGVtZW50IH07XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBkZWxldGVQcm9qZWN0Q29uZmlybWF0aW9uKHByb2plY3QpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYWJzb2x1dGUgdG9wLTAgbGVmdC0wIGJnLWdyYXktMzAwLzk1IGgtc2NyZWVuIHctc2NyZWVuIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyJztcbiAgICBlbGVtZW50LmFwcGVuZCh0aGlzLmRlbGV0ZVByb2plY3RDb25maXJtYXRpb25DYXJkKHByb2plY3QpKTtcbiAgICByZXR1cm4gZWxlbWVudFxuICB9XG4gIGRlbGV0ZVByb2plY3RDb25maXJtYXRpb25DYXJkKHByb2plY3QpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAndy1bOTB2d10gbWF4LXctbWQgYmctd2hpdGUgcC04IHJvdW5kZWQgc2hhZG93IGJvcmRlciBmbGV4IGZsZXgtY29sIGdhcC0yJztcbiAgICBlbGVtZW50LmFwcGVuZCh0aGlzLmRlbGV0ZVByb2plY3RIZWFkaW5nKHByb2plY3QpLCB0aGlzLmRlbGV0ZVByb2plY3RXYXJuaW5nKCksIHRoaXMuZGVsZXRlUHJvamVjdEFjY2VwdChwcm9qZWN0KSwgdGhpcy5tYWtlQ2xvc2VNb2RhbEJ1dHRvbigpKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGRlbGV0ZVByb2plY3RIZWFkaW5nKHByb2plY3QpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAndGV4dC14bCBwYi00JztcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gYENvbmZpcm0gZGVsZXRpb24gb2YgJyR7IHByb2plY3QudGl0bGUgfSdgO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZGVsZXRlUHJvamVjdFdhcm5pbmcoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3BiLTQnO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnQWxsIHRoZSB0YXNrcyBpbiB0aGlzIHByb2plY3Qgd2lsbCBhbHNvIGJlIGRlbGV0ZWQuJztcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIG1ha2VDbG9zZU1vZGFsQnV0dG9uKHRleHQgPSAnQ2FuY2VsJykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdib3JkZXIgc2hhZG93IHJvdW5kZWQgdHJhbnNpdGlvbiBob3ZlcjpiZy1ncmF5LTIwMCBhY3RpdmU6YmctZ3JheS0zMDAgdy1mdWxsIHB5LTEnO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcbiAgICB9KTtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5jbG9zZU1vZGFsQnV0dG9uID0gZWxlbWVudDtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGRlbGV0ZVByb2plY3RBY2NlcHQocHJvamVjdCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdib3JkZXIgc2hhZG93IHJvdW5kZWQgdHJhbnNpdGlvbiBob3ZlcjpiZy1ncmF5LTIwMCBhY3RpdmU6YmctZ3JheS0zMDAgdy1mdWxsIHB5LTEnO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnQWNjZXB0JztcbiAgICB0aGlzLmRlbGV0ZVByb2plY3RBY2NlcHRCdXR0b25zW3Byb2plY3QuaWRdID0gZWxlbWVudDtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIG5ld1Byb2plY3RNb2RhbCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYWJzb2x1dGUgdG9wLTAgbGVmdC0wIGJnLWdyYXktMzAwLzk1IGgtc2NyZWVuIHctc2NyZWVuIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyJztcbiAgICBlbGVtZW50LmFwcGVuZCh0aGlzLm5ld1Byb2plY3RDYXJkKCkpO1xuICAgIHJldHVybiBlbGVtZW50XG4gIH1cblxuICBuZXdQcm9qZWN0Q2FyZCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAndy1bOTB2d10gbWF4LXctbWQgYmctd2hpdGUgZmxleCBnYXAtMiBwLTggYm9yZGVyIHJvdW5kZWQgc2hhZG93IGZsZXgtY29sJztcbiAgICBlbGVtZW50LmFwcGVuZCh0aGlzLm5ld1Byb2plY3RGb3JtKCksIHRoaXMuY3JlYXRlUHJvamVjdCgpLCB0aGlzLm1ha2VDbG9zZU1vZGFsQnV0dG9uKCkpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgbmV3UHJvamVjdEZvcm0oKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMucHJvamVjdFRpdGxlUHJvbXB0KCkpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcHJvamVjdFRpdGxlUHJvbXB0KHByb2plY3RUaXRsZSA9ICcnKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2ZsZXggZmxleC1jb2wgZ2FwLTIgcGItNCc7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy5wcm9qZWN0VGl0bGVMYWJlbCgpLCB0aGlzLnByb2plY3RUaXRsZUlucHV0KHByb2plY3RUaXRsZSkpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcHJvamVjdFRpdGxlTGFiZWwoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgZWxlbWVudC5odG1sRm9yID0gJ3Byb2plY3RUaXRsZSc7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdUaXRsZTonO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcHJvamVjdFRpdGxlSW5wdXQocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYm9yZGVyIHJvdW5kZWQgcHgtMiBweS0xIGZsZXgtMSc7XG4gICAgZWxlbWVudC5pZCA9ICdwcm9qZWN0VGl0bGUnO1xuICAgIGVsZW1lbnQudHlwZSA9ICd0ZXh0JztcbiAgICBlbGVtZW50LnZhbHVlID0gcHJvamVjdFRpdGxlO1xuICAgIHRoaXMubmV3UHJvamVjdFRpdGxlID0gZWxlbWVudDtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGNyZWF0ZVByb2plY3QoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2JvcmRlciByb3VuZGVkIHNoYWRvdyBweC0yIHB5LTEgdHJhbnNpdGlvbiBob3ZlcjpiZy1ncmF5LTIwMCBhY3RpdmU6YmctZ3JheS0zMDAnO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnQ3JlYXRlJztcbiAgICB0aGlzLmNyZWF0ZVByb2plY3RCdXR0b24gPSBlbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZWRpdFByb2plY3RNb2RhbChwcm9qZWN0KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2Fic29sdXRlIHRvcC0wIGxlZnQtMCBiZy1ncmF5LTMwMC85NSBoLXNjcmVlbiB3LXNjcmVlbiBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlcic7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy5lZGl0UHJvamVjdENhcmQocHJvamVjdCkpO1xuICAgIHJldHVybiBlbGVtZW50XG4gIH1cblxuICBlZGl0UHJvamVjdENhcmQocHJvamVjdCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICd3LVs5MHZ3XSBtYXgtdy1tZCBiZy13aGl0ZSBmbGV4IGdhcC0yIHAtOCBib3JkZXIgcm91bmRlZCBzaGFkb3cgZmxleC1jb2wnO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMuZWRpdFByb2plY3RGb3JtKHByb2plY3QpLCB0aGlzLnVwZGF0ZVByb2plY3QocHJvamVjdCksIHRoaXMubWFrZUNsb3NlTW9kYWxCdXR0b24oKSk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBlZGl0UHJvamVjdEZvcm0ocHJvamVjdCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmFwcGVuZCh0aGlzLnByb2plY3RUaXRsZVByb21wdChwcm9qZWN0LnRpdGxlKSk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB1cGRhdGVQcm9qZWN0KHByb2plY3QpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYm9yZGVyIHJvdW5kZWQgc2hhZG93IHB5LTEgcHgtMiB0cmFuc2l0aW9uIGhvdmVyOmJnLWdyYXktMjAwIGFjdGl2ZTpiZy1ncmF5LTMwMCc7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdVcGRhdGUnO1xuICAgIHRoaXMudXBkYXRlUHJvamVjdEJ1dHRvbltwcm9qZWN0LmlkXSA9IGVsZW1lbnQ7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBjcmVhdGVNYWluU2VjdGlvbigpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnbWFpbkNvbnRlbnQgZmxleC0xIHAtNCBmbGV4IGZsZXgtY29sIGdhcC00JztcbiAgICB0aGlzLm5ld1Rhc2tCdXR0b24gPSB0aGlzLm5ld1Rhc2soKTtcbiAgICB0aGlzLnRhc2tzTGlzdCA9IHRoaXMuY3JlYXRlVGFza3NMaXN0KCk7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy5uZXdUYXNrQnV0dG9uLCB0aGlzLnRhc2tzTGlzdCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBkaXNwbGF5VGFza3ModGFza3MpIHtcbiAgICB0aGlzLnRhc2tzTGlzdC5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgdGhpcy50YXNrc0xpc3QuYXBwZW5kKHRoaXMuZGlzcGxheVRhc2sodGFzaykpO1xuICAgIH0pO1xuICB9XG5cbiAgbmV3VGFzaygpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnc2hhZG93IHJvdW5kZWQgYm9yZGVyIHctZml0IHNlbGYtY2VudGVyIHAtMSBweC0zIGhvdmVyOmJnLWdyYXktMjAwIGFjdGl2ZTpiZy1ncmF5LTMwMCB0cmFuc2l0aW9uIGZsZXggZ2FwLTInO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwidy02IGgtNlwiPlxuICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTIgOXY2bTMtM0g5bTEyIDBhOSA5IDAgMTEtMTggMCA5IDkgMCAwMTE4IDB6XCIgLz5cbiAgICA8L3N2Zz5cbiAgICBOZXcgdGFza2A7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICByZW1ha2VOZXdUYXNrQnV0dG9uKCkge1xuICAgIGNvbnN0IG5ld0J1dHRvbiA9IHRoaXMubmV3VGFza0J1dHRvbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGhpcy5uZXdUYXNrQnV0dG9uLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0J1dHRvbiwgdGhpcy5uZXdUYXNrQnV0dG9uKTtcbiAgICB0aGlzLm5ld1Rhc2tCdXR0b24gPSBuZXdCdXR0b247XG4gIH1cblxuICBjcmVhdGVUYXNrc0xpc3QoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3Rhc2tzIGZsZXggZmxleC1jb2wgZ2FwLTQgb3ZlcmZsb3cteS1hdXRvIHBiLTAuNSc7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBkaXNwbGF5VGFzayh0YXNrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2JyZWFrLXdvcmRzIGZsZXggaXRlbXMtY2VudGVyIGJvcmRlciByb3VuZGVkIHNoYWRvdyBkaXZpZGUteCc7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy5kaXNwbGF5dGFza1ByaW9yaXR5KHRhc2spLCB0aGlzLnRvZ2dsZVRhc2tTdGF0dXModGFzayksIHRoaXMuc2hvd1Rhc2tEZXRhaWxzKHRhc2spLCB0aGlzLmVkaXRUYXNrKHRhc2spLCB0aGlzLmRlbGV0ZVRhc2sodGFzaykpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdG9nZ2xlVGFza1N0YXR1cyh0YXNrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3AtNCB0cmFuc2l0aW9uIGhvdmVyOmJnLWdyYXktMjAwIGgtZnVsbCc7XG4gICAgaWYgKHRhc2suaXNGaW5pc2hlZCkge1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzPVwidy01IGgtNVwiPjxwYXRoIGQ9XCJNMTAuMDQxIDE3bC00LjUtNC4zMTkgMS4zOTUtMS40MzUgMy4wOCAyLjkzNyA3LjAyMS03LjE4MyAxLjQyMiAxLjQwOS04LjQxOCA4LjU5MXptLTUuMDQxLTE1Yy0xLjY1NCAwLTMgMS4zNDYtMyAzdjE0YzAgMS42NTQgMS4zNDYgMyAzIDNoMTRjMS42NTQgMCAzLTEuMzQ2IDMtM3YtMTRjMC0xLjY1NC0xLjM0Ni0zLTMtM2gtMTR6bTE5IDN2MTRjMCAyLjc2MS0yLjIzOCA1LTUgNWgtMTRjLTIuNzYyIDAtNS0yLjIzOS01LTV2LTE0YzAtMi43NjEgMi4yMzgtNSA1LTVoMTRjMi43NjIgMCA1IDIuMjM5IDUgNXpcIi8+PC9zdmc+YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzPVwidy01IGgtNVwiPjxwYXRoIGQ9XCJNNSAyYy0xLjY1NCAwLTMgMS4zNDYtMyAzdjE0YzAgMS42NTQgMS4zNDYgMyAzIDNoMTRjMS42NTQgMCAzLTEuMzQ2IDMtM3YtMTRjMC0xLjY1NC0xLjM0Ni0zLTMtM2gtMTR6bTE5IDN2MTRjMCAyLjc2MS0yLjIzOCA1LTUgNWgtMTRjLTIuNzYyIDAtNS0yLjIzOS01LTV2LTE0YzAtMi43NjEgMi4yMzgtNSA1LTVoMTRjMi43NjIgMCA1IDIuMjM5IDUgNXpcIi8+PC9zdmc+YDtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVUYXNrU3RhdHVzQnV0dG9uW3Rhc2suaWRdID0geyB0YXNrOiB0YXNrLCBidXR0b246IGVsZW1lbnQgfTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGRpc3BsYXl0YXNrUHJpb3JpdHkodGFzaykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICd3LTEgaC1mdWxsJztcbiAgICBsZXQgYmFja2dyb3VuZENvbG9yO1xuICAgIHN3aXRjaCAodGFzay5wcmlvcml0eSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgPSAnYmctZ3JlZW4tMjAwJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGJhY2tncm91bmRDb2xvciA9ICdiZy15ZWxsb3ctMjAwJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGJhY2tncm91bmRDb2xvciA9ICdiZy1yZWQtMjAwJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFja2dyb3VuZENvbG9yKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHNob3dUYXNrRGV0YWlscyh0YXNrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2ZsZXgtMSBicmVhay1hbGwgcC00IGhvdmVyOmJnLWdyYXktMjAwIHRyYW5zaXRpb24nO1xuICAgIGxldCB0aXRsZURpc3BsYXk7XG4gICAgaWYgKHRhc2suaXNGaW5pc2hlZCkge1xuICAgICAgdGl0bGVEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncycpO1xuICAgICAgdGl0bGVEaXNwbGF5LnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lICs9ICcgdGV4dC1ncmF5LTMwMCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlRGlzcGxheSA9IHRhc2sudGl0bGU7XG4gICAgfVxuICAgIGVsZW1lbnQuYXBwZW5kKHRpdGxlRGlzcGxheSk7XG4gICAgdGhpcy5zaG93VGFza0RldGFpbHNCdXR0b25zW3Rhc2suaWRdID0geyB0YXNrOiB0YXNrLCBidXR0b246IGVsZW1lbnQgfTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGVkaXRUYXNrKHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAncC00IGhvdmVyOmJnLWdyZWVuLTIwMCBhY3RpdmU6YmctZ3JlZW4tMzAwIHRyYW5zaXRpb24nO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwidy02IGgtNlwiPlxuICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTYuODYyIDQuNDg3bDEuNjg3LTEuNjg4YTEuODc1IDEuODc1IDAgMTEyLjY1MiAyLjY1MkwxMC41ODIgMTYuMDdhNC41IDQuNSAwIDAxLTEuODk3IDEuMTNMNiAxOGwuOC0yLjY4NWE0LjUgNC41IDAgMDExLjEzLTEuODk3bDguOTMyLTguOTMxem0wIDBMMTkuNSA3LjEyNU0xOCAxNHY0Ljc1QTIuMjUgMi4yNSAwIDAxMTUuNzUgMjFINS4yNUEyLjI1IDIuMjUgMCAwMTMgMTguNzVWOC4yNUEyLjI1IDIuMjUgMCAwMTUuMjUgNkgxMFwiIC8+XG4gICAgPC9zdmc+XG4gICAgYDtcbiAgICB0aGlzLmVkaXRUYXNrQnV0dG9uW3Rhc2suaWRdID0geyB0YXNrOiB0YXNrLCBidXR0b246IGVsZW1lbnQgfTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGRlbGV0ZVRhc2sodGFzaykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdwLTQgaG92ZXI6YmctcmVkLTIwMCBhY3RpdmU6YmctcmVkLTMwMCB0cmFuc2l0aW9uJztcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzcz1cInctNiBoLTZcIj5cbiAgICA8cGF0aCBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEyIDkuNzVMMTQuMjUgMTJtMCAwbDIuMjUgMi4yNU0xNC4yNSAxMmwyLjI1LTIuMjVNMTQuMjUgMTJMMTIgMTQuMjVtLTIuNTggNC45MmwtNi4zNzUtNi4zNzVhMS4xMjUgMS4xMjUgMCAwMTAtMS41OUw5LjQyIDQuODNjLjIxMS0uMjExLjQ5OC0uMzMuNzk2LS4zM0gxOS41YTIuMjUgMi4yNSAwIDAxMi4yNSAyLjI1djEwLjVhMi4yNSAyLjI1IDAgMDEtMi4yNSAyLjI1aC05LjI4NGMtLjI5OCAwLS41ODUtLjExOS0uNzk2LS4zM3pcIiAvPlxuICAgIDwvc3ZnPlxuICAgIGA7XG4gICAgdGhpcy5kZWxldGVUYXNrQnV0dG9uW3Rhc2suaWRdID0geyB0YXNrOiB0YXNrLCBidXR0b246IGVsZW1lbnQgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgY2xvc2VNb2RhbCgpIHtcbiAgICB0aGlzLnJvb3QucmVtb3ZlQ2hpbGQodGhpcy5yb290Lmxhc3RFbGVtZW50Q2hpbGQpO1xuICB9XG5cbiAgb3BlbkRlbGV0ZVByb2plY3RNb2RhbChwcm9qZWN0KSB7XG4gICAgdGhpcy5yb290LmFwcGVuZCh0aGlzLmRlbGV0ZVByb2plY3RDb25maXJtYXRpb24ocHJvamVjdCkpO1xuICB9XG5cbiAgb3Blbk5ld1Byb2plY3RNb2RhbCgpIHtcbiAgICB0aGlzLnJvb3QuYXBwZW5kKHRoaXMubmV3UHJvamVjdE1vZGFsKCkpO1xuICAgIHRoaXMubmV3UHJvamVjdFRpdGxlLmZvY3VzKCk7XG4gIH1cblxuICBvcGVuRWRpdFByb2plY3RNb2RhbChwcm9qZWN0KSB7XG4gICAgdGhpcy5yb290LmFwcGVuZCh0aGlzLmVkaXRQcm9qZWN0TW9kYWwocHJvamVjdCkpO1xuICAgIHRoaXMubmV3UHJvamVjdFRpdGxlLmZvY3VzKCk7XG4gIH1cblxuICBiaW5kU2hvd1Byb2plY3RUYXNrcyhoYW5kbGVyKSB7XG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5zaG93UHJvamVjdFRhc2tzQnV0dG9ucykuZm9yRWFjaCgoW3Byb2plY3RJZCwgYnV0dG9uXSkgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBoYW5kbGVyKE51bWJlcihwcm9qZWN0SWQpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYmluZERlbGV0ZVByb2plY3QoaGFuZGxlcikge1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5kZWxldGVQcm9qZWN0QnV0dG9ucykuZm9yRWFjaCgoeyBwcm9qZWN0LCBidXR0b24gfSkgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBoYW5kbGVyKHByb2plY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBiaW5kRGVsZXRlUHJvamVjdEFjY2VwdChoYW5kbGVyKSB7XG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5kZWxldGVQcm9qZWN0QWNjZXB0QnV0dG9ucykuZm9yRWFjaCgoW3Byb2plY3RJZCwgYnV0dG9uXSkgPT4ge1xuICAgICAgYnV0dG9uLmZvY3VzKCk7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGhhbmRsZXIoTnVtYmVyKHByb2plY3RJZCkpO1xuICAgICAgfSk7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBoYW5kbGVyKE51bWJlcihwcm9qZWN0SWQpKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYmluZE5ld1Byb2plY3QoaGFuZGxlcikge1xuICAgIHRoaXMubmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZVByb2plY3REaXNwbGF5KHRhcmdldFByb2plY3RJZCkge1xuICAgIHRoaXMucHJvamVjdERpc3BsYXlzID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKHRoaXMucHJvamVjdERpc3BsYXlzKS5maWx0ZXIoKFtwcm9qZWN0SWRdKSA9PiB7XG4gICAgICByZXR1cm4gTnVtYmVyKHByb2plY3RJZCkgIT09IHRhcmdldFByb2plY3RJZFxuICAgIH0pKTtcbiAgfVxuXG4gIGJpbmRDcmVhdGVQcm9qZWN0KGhhbmRsZXIpIHtcbiAgICB0aGlzLmNyZWF0ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBoYW5kbGVyKHsgdGl0bGU6IHRoaXMubmV3UHJvamVjdFRpdGxlLnZhbHVlIH0pO1xuICAgIH0pO1xuICAgIHRoaXMubmV3UHJvamVjdFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGhhbmRsZXIoeyB0aXRsZTogdGhpcy5uZXdQcm9qZWN0VGl0bGUudmFsdWUgfSk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBiaW5kRWRpdFByb2plY3QoaGFuZGxlcikge1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5lZGl0UHJvamVjdEJ1dHRvbnMpLmZvckVhY2goKHsgcHJvamVjdCwgYnV0dG9uIH0pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaGFuZGxlcihwcm9qZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYmluZFVwZGF0ZVByb2plY3QoaGFuZGxlcikge1xuICAgIGxldCBpZDtcbiAgICBPYmplY3QuZW50cmllcyh0aGlzLnVwZGF0ZVByb2plY3RCdXR0b24pLmZvckVhY2goKFtwcm9qZWN0SWQsIGJ1dHRvbl0pID0+IHtcbiAgICAgIGlkID0gcHJvamVjdElkO1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBoYW5kbGVyKE51bWJlcihwcm9qZWN0SWQpLCB7IHRpdGxlOiB0aGlzLm5ld1Byb2plY3RUaXRsZS52YWx1ZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMubmV3UHJvamVjdFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGhhbmRsZXIoTnVtYmVyKGlkKSwgeyB0aXRsZTogdGhpcy5uZXdQcm9qZWN0VGl0bGUudmFsdWUgfSk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBiaW5kRGVsZXRlVGFzayhoYW5kbGVyKSB7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLmRlbGV0ZVRhc2tCdXR0b24pLmZvckVhY2goKHsgdGFzaywgYnV0dG9uIH0pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaGFuZGxlcih0YXNrKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYmluZERlbGV0ZVRhc2tBY2NlcHQoaGFuZGxlcikge1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5kZWxldGVUYXNrQWNjZXB0QnV0dG9ucykuZm9yRWFjaCgoeyB0YXNrLCBidXR0b24gfSkgPT4ge1xuICAgICAgYnV0dG9uLmZvY3VzKCk7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGhhbmRsZXIodGFzayk7XG4gICAgICB9KTtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGhhbmRsZXIodGFzayk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW5EZWxldGVUYXNrTW9kYWwodGFzaykge1xuICAgIHRoaXMucm9vdC5hcHBlbmQodGhpcy5kZWxldGVUYXNrQ29uZmlybWF0aW9uKHRhc2spKTtcbiAgfVxuXG4gIGRlbGV0ZVRhc2tDb25maXJtYXRpb24odGFzaykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgYmctZ3JheS0zMDAvOTUgaC1zY3JlZW4gdy1zY3JlZW4gZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXInO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMuZGVsZXRlVGFza0NvbmZpcm1hdGlvbkNhcmQodGFzaykpO1xuICAgIHJldHVybiBlbGVtZW50XG4gIH1cbiAgZGVsZXRlVGFza0NvbmZpcm1hdGlvbkNhcmQodGFzaykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICd3LVs5MHZ3XSBtYXgtdy1tZCBiZy13aGl0ZSBmbGV4IGZsZXgtY29sIGdhcC0yIHAtOCByb3VuZGVkIGJvcmRlciBzaGFkb3cnO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMuZGVsZXRlVGFza0hlYWRpbmcodGFzayksIHRoaXMuZGVsZXRlVGFza1dhcm5pbmcoKSwgdGhpcy5kZWxldGVUYXNrQWNjZXB0KHRhc2spLCB0aGlzLm1ha2VDbG9zZU1vZGFsQnV0dG9uKCkpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZGVsZXRlVGFza0hlYWRpbmcodGFzaykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICd0ZXh0LXhsIHBiLTQnO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBgQ29uZmlybSBkZWxldGlvbiBvZiAnJHsgdGFzay50aXRsZSB9J2A7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBkZWxldGVUYXNrV2FybmluZygpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAncGItNCc7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLic7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBkZWxldGVUYXNrQWNjZXB0KHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYm9yZGVyIHJvdW5kZWQgc2hhZG93IHB5LTEgdHJhbnNpdGlvbiBob3ZlcjpiZy1ncmF5LTIwMCBhY3RpdmU6YmctZ3JheS0zMDAgdy1mdWxsJztcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0FjY2VwdCc7XG4gICAgdGhpcy5kZWxldGVUYXNrQWNjZXB0QnV0dG9uc1t0YXNrLmlkXSA9IHsgdGFzazogdGFzaywgYnV0dG9uOiBlbGVtZW50IH07XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBiaW5kTmV3VGFzayhoYW5kbGVyKSB7XG4gICAgdGhpcy5uZXdUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaGFuZGxlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgYmluZENyZWF0ZVRhc2soaGFuZGxlcikge1xuICAgIHRoaXMubmV3VGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGNvbnN0IGZvcm1Qcm9wcyA9IE9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YSk7XG4gICAgICBmb3JtUHJvcHMuZHVlRGF0ZSA9IG5ldyBEYXRlKGZvcm1Qcm9wcy5kdWVEYXRlKTtcbiAgICAgIGZvcm1Qcm9wcy5wcmlvcml0eSA9IE51bWJlcihmb3JtUHJvcHMucHJpb3JpdHkpO1xuICAgICAgZm9ybVByb3BzLnByb2plY3RJZCA9IE51bWJlcihmb3JtUHJvcHMucHJvamVjdElkKTtcbiAgICAgIGhhbmRsZXIoZm9ybVByb3BzKTtcbiAgICB9KTtcbiAgICBbIHRoaXMubmV3VGFza1RpdGxlLCB0aGlzLm5ld1Rhc2tEZXNjcmlwdGlvbiwgdGhpcy5uZXdUYXNrRHVlRGF0ZSwgdGhpcy5uZXdUYXNrTG93UHJpb3JpdHksIHRoaXMubmV3VGFza01lZGl1bVByaW9yaXR5LCB0aGlzLm5ld1Rhc2tIaWdoUHJpb3JpdHksIHRoaXMubmV3VGFza1Byb2plY3RJZCBdLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmICh0aGlzLm5ld1Rhc2tGb3JtLnJlcG9ydFZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMubmV3VGFza0Zvcm0pO1xuICAgICAgICAgICAgY29uc3QgZm9ybVByb3BzID0gT2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhKTtcbiAgICAgICAgICAgIGZvcm1Qcm9wcy5kdWVEYXRlID0gbmV3IERhdGUoZm9ybVByb3BzLmR1ZURhdGUpO1xuICAgICAgICAgICAgZm9ybVByb3BzLnByaW9yaXR5ID0gTnVtYmVyKGZvcm1Qcm9wcy5wcmlvcml0eSk7XG4gICAgICAgICAgICBmb3JtUHJvcHMucHJvamVjdElkID0gTnVtYmVyKGZvcm1Qcm9wcy5wcm9qZWN0SWQpO1xuICAgICAgICAgICAgaGFuZGxlcihmb3JtUHJvcHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgb3Blbk5ld1Rhc2tNb2RhbChwcm9qZWN0cykge1xuICAgIHRoaXMucm9vdC5hcHBlbmQodGhpcy5uZXdUYXNrTW9kYWwocHJvamVjdHMpKTtcbiAgICB0aGlzLm5ld1Rhc2tUaXRsZS5mb2N1cygpO1xuICB9XG5cbiAgbmV3VGFza01vZGFsKHByb2plY3RzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2Fic29sdXRlIHRvcC0wIGxlZnQtMCBiZy1ncmF5LTMwMC85NSBoLXNjcmVlbiB3LXNjcmVlbiBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlcic7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy5uZXdUYXNrQ2FyZChwcm9qZWN0cykpO1xuICAgIHJldHVybiBlbGVtZW50XG4gIH1cblxuICBjcmVhdGVUYXNrKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdib3JkZXIgcm91bmRlZCBzaGFkb3cgdHJhbnNpdGlvbiBob3ZlcjpiZy1ncmF5LTIwMCBhY3RpdmU6YmctZ3JheS0zMDAgcHktMSc7XG4gICAgZWxlbWVudC50eXBlID0gJ3N1Ym1pdCc7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdDcmVhdGUnO1xuICAgIHRoaXMuY3JlYXRlVGFza0J1dHRvbiA9IGVsZW1lbnQ7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBiaW5kVG9nZ2xlVGFza1N0YXR1cyhoYW5kbGVyKSB7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLnRvZ2dsZVRhc2tTdGF0dXNCdXR0b24pLmZvckVhY2goKHsgdGFzaywgYnV0dG9uIH0pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaGFuZGxlcih0YXNrLCBidXR0b24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVUYXNrU3RhdHVzRGlzcGxheSh0YXNrLCBidXR0b24pIHtcbiAgICBpZiAodGFzay5pc0ZpbmlzaGVkKSB7XG4gICAgICBidXR0b24uaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzcz1cInctNSBoLTVcIj48cGF0aCBkPVwiTTEwLjA0MSAxN2wtNC41LTQuMzE5IDEuMzk1LTEuNDM1IDMuMDggMi45MzcgNy4wMjEtNy4xODMgMS40MjIgMS40MDktOC40MTggOC41OTF6bS01LjA0MS0xNWMtMS42NTQgMC0zIDEuMzQ2LTMgM3YxNGMwIDEuNjU0IDEuMzQ2IDMgMyAzaDE0YzEuNjU0IDAgMy0xLjM0NiAzLTN2LTE0YzAtMS42NTQtMS4zNDYtMy0zLTNoLTE0em0xOSAzdjE0YzAgMi43NjEtMi4yMzggNS01IDVoLTE0Yy0yLjc2MiAwLTUtMi4yMzktNS01di0xNGMwLTIuNzYxIDIuMjM4LTUgNS01aDE0YzIuNzYyIDAgNSAyLjIzOSA1IDV6XCIvPjwvc3ZnPmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzPVwidy01IGgtNVwiPjxwYXRoIGQ9XCJNNSAyYy0xLjY1NCAwLTMgMS4zNDYtMyAzdjE0YzAgMS42NTQgMS4zNDYgMyAzIDNoMTRjMS42NTQgMCAzLTEuMzQ2IDMtM3YtMTRjMC0xLjY1NC0xLjM0Ni0zLTMtM2gtMTR6bTE5IDN2MTRjMCAyLjc2MS0yLjIzOCA1LTUgNWgtMTRjLTIuNzYyIDAtNS0yLjIzOS01LTV2LTE0YzAtMi43NjEgMi4yMzgtNSA1LTVoMTRjMi43NjIgMCA1IDIuMjM5IDUgNXpcIi8+PC9zdmc+YDtcbiAgICB9XG4gICAgdGhpcy5zaG93VGFza0RldGFpbHNCdXR0b25zW3Rhc2suaWRdLmJ1dHRvbi5wYXJlbnROb2RlLmNoaWxkTm9kZXNbMl0ucmVwbGFjZVdpdGgodGhpcy5zaG93VGFza0RldGFpbHModGFzaykpO1xuICB9XG5cbiAgYmluZEVkaXRUYXNrKGhhbmRsZXIpIHtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuZWRpdFRhc2tCdXR0b24pLmZvckVhY2goKHsgdGFzaywgYnV0dG9uIH0pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaGFuZGxlcih0YXNrKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlbkVkaXRUYXNrTW9kYWwodGFzaywgcHJvamVjdHMpIHtcbiAgICB0aGlzLnJvb3QuYXBwZW5kKHRoaXMuZWRpdFRhc2tNb2RhbCh0YXNrLCBwcm9qZWN0cykpO1xuICAgIHRoaXMubmV3VGFza1RpdGxlLmZvY3VzKCk7XG4gIH1cblxuICBlZGl0VGFza01vZGFsKHRhc2ssIHByb2plY3RzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2Fic29sdXRlIHRvcC0wIGxlZnQtMCBiZy1ncmF5LTMwMC85NSBoLXNjcmVlbiB3LXNjcmVlbiBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlcic7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy5lZGl0VGFza0NhcmQocHJvamVjdHMsIHRhc2spKTtcbiAgICByZXR1cm4gZWxlbWVudFxuICB9XG5cbiAgZWRpdFRhc2tDYXJkKHByb2plY3RzLCB0YXNrID0gJycpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAndy1bOTB2d10gbWF4LXctbWQgYmctd2hpdGUgYm9yZGVyIHJvdW5kZWQgc2hhZG93IHAtOCc7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy5tYWtlRWRpdFRhc2tGb3JtKHRhc2ssIHByb2plY3RzKSk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBuZXdUYXNrQ2FyZChwcm9qZWN0cywgdGFzayA9ICcnKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3ctWzkwdnddIG1heC13LW1kIGJnLXdoaXRlIGJvcmRlciByb3VuZGVkIHNoYWRvdyBwLTgnO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMubWFrZU5ld1Rhc2tGb3JtKHRhc2ssIHByb2plY3RzKSk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBtYWtlTmV3VGFza0Zvcm0odGFzaywgcHJvamVjdHMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2ZsZXggZmxleC1jb2wgZ2FwLTInO1xuICAgIGVsZW1lbnQuaWQgPSAnbmV3VGFza0Zvcm0nO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMudGFza1RpdGxlUHJvbXB0KHRhc2spLCB0aGlzLnRhc2tEZXNjcmlwdGlvblByb21wdCh0YXNrKSwgdGhpcy50YXNrRHVlRGF0ZVByb21wdCh0YXNrKSwgdGhpcy50YXNrUHJpb3JpdHlQcm9tcHQodGFzayksIHRoaXMudGFza1Byb2plY3RJZFByb21wdChwcm9qZWN0cywgdGFzayksIHRoaXMuY3JlYXRlVGFzaygpLCB0aGlzLm1ha2VDbG9zZU1vZGFsQnV0dG9uKCkpO1xuICAgIHRoaXMubmV3VGFza0Zvcm0gPSBlbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgbWFrZUVkaXRUYXNrRm9ybSh0YXNrLCBwcm9qZWN0cykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmxleCBmbGV4LWNvbCBnYXAtMic7XG4gICAgZWxlbWVudC5pZCA9ICduZXdUYXNrRm9ybSc7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy50YXNrVGl0bGVQcm9tcHQodGFzayksIHRoaXMudGFza0Rlc2NyaXB0aW9uUHJvbXB0KHRhc2spLCB0aGlzLnRhc2tEdWVEYXRlUHJvbXB0KHRhc2spLCB0aGlzLnRhc2tQcmlvcml0eVByb21wdCh0YXNrKSwgdGhpcy50YXNrUHJvamVjdElkUHJvbXB0KHByb2plY3RzLCB0YXNrKSwgdGhpcy51cGRhdGVUYXNrKHRhc2spLCB0aGlzLm1ha2VDbG9zZU1vZGFsQnV0dG9uKCkpO1xuICAgIHRoaXMuZWRpdFRhc2tGb3JtID0gZWxlbWVudDtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tUaXRsZVByb21wdCh0YXNrID0gJycpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmxleCBmbGV4LWNvbCBnYXAtMic7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy50YXNrVGl0bGVMYWJlbCgpLCB0aGlzLnRhc2tUaXRsZUlucHV0KHRhc2spKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tUaXRsZUxhYmVsKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGVsZW1lbnQuaHRtbEZvciA9ICd0YXNrVGl0bGUnO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnVGl0bGU6JztcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tUaXRsZUlucHV0KHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdmbGV4LTEgYm9yZGVyIHJvdW5kZWQgcC0yJztcbiAgICBlbGVtZW50LmlkID0gJ3Rhc2tUaXRsZSc7XG4gICAgZWxlbWVudC5uYW1lID0gJ3RpdGxlJztcbiAgICBlbGVtZW50LnR5cGUgPSAndGV4dCc7XG4gICAgaWYgKHRhc2sudGl0bGUpIHtcbiAgICAgIGVsZW1lbnQudmFsdWUgPSB0YXNrLnRpdGxlO1xuICAgIH1cbiAgICB0aGlzLm5ld1Rhc2tUaXRsZSA9IGVsZW1lbnQ7XG4gICAgZWxlbWVudC5yZXF1aXJlZCA9IHRydWU7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrRGVzY3JpcHRpb25Qcm9tcHQodGFzayA9ICcnKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2ZsZXggZmxleC1jb2wgZ2FwLTInO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMudGFza0Rlc2NyaXB0aW9uTGFiZWwoKSwgdGhpcy50YXNrRGVzY3JpcHRpb25JbnB1dCh0YXNrKSk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrRGVzY3JpcHRpb25MYWJlbCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBlbGVtZW50Lmh0bWxGb3IgPSAndGFza0Rlc2NyaXB0aW9uJztcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0Rlc2NyaXB0aW9uOic7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrRGVzY3JpcHRpb25JbnB1dCh0YXNrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAncmVzaXplLW5vbmUgZmxleC0xIGJvcmRlciByb3VuZGVkIHAtMidcbiAgICBlbGVtZW50LmlkID0gJ3Rhc2tEZXNjcmlwdGlvbic7XG4gICAgZWxlbWVudC5uYW1lID0gJ2Rlc2NyaXB0aW9uJztcbiAgICBpZiAodGFzay5kZXNjcmlwdGlvbikge1xuICAgICAgZWxlbWVudC52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgfVxuICAgIGVsZW1lbnQucm93cyA9IDQ7XG4gICAgdGhpcy5uZXdUYXNrRGVzY3JpcHRpb24gPSBlbGVtZW50O1xuICAgIGVsZW1lbnQucmVxdWlyZWQgPSB0cnVlO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdGFza0R1ZURhdGVQcm9tcHQodGFzayA9ICcnKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2ZsZXggZmxleC1jb2wgZ2FwLTInO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMudGFza0R1ZURhdGVMYWJlbCgpLCB0aGlzLnRhc2tEdWVEYXRlSW5wdXQodGFzaykpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdGFza0R1ZURhdGVMYWJlbCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBlbGVtZW50Lmh0bWxGb3IgPSAndGFza0R1ZURhdGUnO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnRHVlIGRhdGU6JztcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tEdWVEYXRlSW5wdXQodGFzaykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2JvcmRlciByb3VuZGVkIHAtMiB0ZXh0LWNlbnRlcic7XG4gICAgZWxlbWVudC5pZCA9ICd0YXNrRHVlRGF0ZSc7XG4gICAgZWxlbWVudC5uYW1lID0gJ2R1ZURhdGUnO1xuICAgIGVsZW1lbnQudHlwZSA9ICdkYXRlJztcbiAgICBpZiAodGFzay5kdWVEYXRlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0YXNrKTtcbiAgICAgIGNvbnN0IGRhdGUgPSB0YXNrLmR1ZURhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgICAgY29uc3QgbW9udGggPSB0YXNrLmR1ZURhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICBjb25zdCB5ZWFyID0gdGFzay5kdWVEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBjb25zdCB2YWx1ZSA9IGAkeyB5ZWFyIH0tJHsgbW9udGggfS0keyBkYXRlIH1gO1xuICAgICAgZWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICB0aGlzLm5ld1Rhc2tEdWVEYXRlID0gZWxlbWVudDtcbiAgICBlbGVtZW50LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tQcmlvcml0eVByb21wdCh0YXNrID0gJycpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmxleCBmbGV4LWNvbCBnYXAtMic7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy50YXNrUHJpb3JpdHlMYWJlbCgpLCB0aGlzLnRhc2tQcmlvcml0eU9wdGlvbnModGFzaykpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdGFza1ByaW9yaXR5TGFiZWwoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgZWxlbWVudC5odG1sRm9yID0gJ3ByaW9yaXR5JztcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ1ByaW9yaXR5Oic7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrUHJpb3JpdHlPcHRpb25zKHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmxleCBmbGV4LWNvbCBnYXAtMic7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy50YXNrTG93UHJpb3JpdHlTZWxlY3Rpb24odGFzayksIHRoaXMudGFza01lZGl1bVByaW9yaXR5U2VsZWN0aW9uKHRhc2spLCB0aGlzLnRhc2tIaWdoUHJpb3JpdHlTZWxlY3Rpb24odGFzaykpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdGFza0xvd1ByaW9yaXR5U2VsZWN0aW9uKHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmxleCBib3JkZXIgcm91bmRlZCBjdXJzb3ItcG9pbnRlcic7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy50YXNrTG93UHJpb3JpdHlJbnB1dCh0YXNrKSwgdGhpcy50YXNrTG93UHJpb3JpdHlMYWJlbCgpKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tMb3dQcmlvcml0eUlucHV0KHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdtLTMgbXItMCc7XG4gICAgZWxlbWVudC50eXBlID0gJ3JhZGlvJztcbiAgICBlbGVtZW50LmlkID0gJ2xvd1ByaW9yaXR5JztcbiAgICBlbGVtZW50Lm5hbWUgPSAncHJpb3JpdHknO1xuICAgIGVsZW1lbnQudmFsdWUgPSAnMSc7XG4gICAgZWxlbWVudC5yZXF1aXJlZCA9IHRydWU7XG4gICAgZWxlbWVudC5jaGVja2VkID0gdGFzay5wcmlvcml0eSA9PT0gMTtcbiAgICB0aGlzLm5ld1Rhc2tMb3dQcmlvcml0eSA9IGVsZW1lbnQ7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrTG93UHJpb3JpdHlMYWJlbCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdmbGV4LTEgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgY3Vyc29yLXBvaW50ZXInO1xuICAgIGVsZW1lbnQuaHRtbEZvciA9ICdsb3dQcmlvcml0eSc7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdMb3cnO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdGFza01lZGl1bVByaW9yaXR5U2VsZWN0aW9uKHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmxleCBib3JkZXIgcm91bmRlZCBjdXJzb3ItcG9pbnRlcic7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy50YXNrTWVkaXVtUHJpb3JpdHlJbnB1dCh0YXNrKSwgdGhpcy50YXNrTWVkaXVtUHJpb3JpdHlMYWJlbCgpKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tNZWRpdW1Qcmlvcml0eUlucHV0KHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdtLTMgbXItMCc7XG4gICAgZWxlbWVudC50eXBlID0gJ3JhZGlvJztcbiAgICBlbGVtZW50LmlkID0gJ21lZGl1bVByaW9yaXR5JztcbiAgICBlbGVtZW50Lm5hbWUgPSAncHJpb3JpdHknO1xuICAgIGVsZW1lbnQudmFsdWUgPSAnMic7XG4gICAgZWxlbWVudC5yZXF1aXJlZCA9IHRydWU7XG4gICAgZWxlbWVudC5jaGVja2VkID0gdGFzay5wcmlvcml0eSA9PT0gMjtcbiAgICB0aGlzLm5ld1Rhc2tNZWRpdW1Qcmlvcml0eSA9IGVsZW1lbnQ7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrTWVkaXVtUHJpb3JpdHlMYWJlbCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdmbGV4LTEgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgY3Vyc29yLXBvaW50ZXInO1xuICAgIGVsZW1lbnQuaHRtbEZvciA9ICdtZWRpdW1Qcmlvcml0eSc7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdNZWRpdW0nO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdGFza0hpZ2hQcmlvcml0eVNlbGVjdGlvbih0YXNrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2ZsZXggYm9yZGVyIHJvdW5kZWQgY3Vyc29yLXBvaW50ZXInO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMudGFza0hpZ2hQcmlvcml0eUlucHV0KHRhc2spLCB0aGlzLnRhc2tIaWdoUHJpb3JpdHlMYWJlbCgpKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tIaWdoUHJpb3JpdHlJbnB1dCh0YXNrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnbS0zIG1yLTAnO1xuICAgIGVsZW1lbnQudHlwZSA9ICdyYWRpbyc7XG4gICAgZWxlbWVudC5pZCA9ICdoaWdoUHJpb3JpdHknO1xuICAgIGVsZW1lbnQubmFtZSA9ICdwcmlvcml0eSc7XG4gICAgZWxlbWVudC52YWx1ZSA9ICczJztcbiAgICBlbGVtZW50LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBlbGVtZW50LmNoZWNrZWQgPSB0YXNrLnByaW9yaXR5ID09PSAzO1xuICAgIHRoaXMubmV3VGFza0hpZ2hQcmlvcml0eSA9IGVsZW1lbnQ7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrSGlnaFByaW9yaXR5TGFiZWwoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmxleC0xIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGN1cnNvci1wb2ludGVyJztcbiAgICBlbGVtZW50Lmh0bWxGb3IgPSAnaGlnaFByaW9yaXR5JztcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ0hpZ2gnO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdGFza1Byb2plY3RJZFByb21wdChwcm9qZWN0cywgdGFzayA9ICcnKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2ZsZXggZmxleC1jb2wgZ2FwLTIgcGItNCc7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy50YXNrUHJvamVjdElkTGFiZWwoKSwgdGhpcy50YXNrUHJvamVjdElkSW5wdXQodGFzaywgcHJvamVjdHMpKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tQcm9qZWN0SWRMYWJlbCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBlbGVtZW50Lmh0bWxGb3IgPSAndGFza1Byb2plY3RJZCc7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9ICdQcm9qZWN0Oic7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrUHJvamVjdElkSW5wdXQodGFzaywgcHJvamVjdHMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnYm9yZGVyIHJvdW5kZWQgcC0yJztcbiAgICBlbGVtZW50Lm5hbWUgPSAncHJvamVjdElkJztcbiAgICBlbGVtZW50LmlkID0gJ3Rhc2tQcm9qZWN0SWQnO1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIGRlZmF1bHRWYWx1ZS52YWx1ZSA9ICcnO1xuICAgIGRlZmF1bHRWYWx1ZS50ZXh0Q29udGVudCA9ICdTZWxlY3QgYSBwcm9qZWN0JztcbiAgICBkZWZhdWx0VmFsdWUuZGlzYWJsZWQgPSB0cnVlO1xuICAgIGRlZmF1bHRWYWx1ZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgZWxlbWVudC5hcHBlbmQoZGVmYXVsdFZhbHVlKTtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IHByb2plY3QuaWQ7XG4gICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xuICAgICAgb3B0aW9uLnNlbGVjdGVkID0gTnVtYmVyKG9wdGlvbi52YWx1ZSkgPT09IHRhc2sucHJvamVjdElkO1xuICAgICAgZWxlbWVudC5hcHBlbmQob3B0aW9uKTtcbiAgICB9KTtcbiAgICBlbGVtZW50LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICB0aGlzLm5ld1Rhc2tQcm9qZWN0SWQgPSBlbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdXBkYXRlVGFzayh0YXNrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2JvcmRlciByb3VuZGVkIHNoYWRvdyB0cmFuc2l0aW9uIGhvdmVyOmJnLWdyYXktMjAwIGFjdGl2ZTpiZy1ncmF5LTMwMCBweS0xJztcbiAgICBlbGVtZW50LnR5cGUgPSAnc3VibWl0JztcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJ1VwZGF0ZSc7XG4gICAgdGhpcy51cGRhdGVUYXNrQnV0dG9uW3Rhc2suaWRdID0gZWxlbWVudDtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGJpbmRVcGRhdGVUYXNrKGhhbmRsZXIpIHtcbiAgICB0aGlzLmVkaXRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQpO1xuICAgICAgY29uc3QgZm9ybVByb3BzID0gT2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhKTtcbiAgICAgIGZvcm1Qcm9wcy5kdWVEYXRlID0gbmV3IERhdGUoZm9ybVByb3BzLmR1ZURhdGUpO1xuICAgICAgZm9ybVByb3BzLnByaW9yaXR5ID0gTnVtYmVyKGZvcm1Qcm9wcy5wcmlvcml0eSk7XG4gICAgICBmb3JtUHJvcHMucHJvamVjdElkID0gTnVtYmVyKGZvcm1Qcm9wcy5wcm9qZWN0SWQpO1xuICAgICAgaGFuZGxlcihOdW1iZXIoT2JqZWN0LmtleXModGhpcy51cGRhdGVUYXNrQnV0dG9uKVswXSksIGZvcm1Qcm9wcyk7XG4gICAgfSk7XG4gICAgWyB0aGlzLm5ld1Rhc2tUaXRsZSwgdGhpcy5uZXdUYXNrRGVzY3JpcHRpb24sIHRoaXMubmV3VGFza0R1ZURhdGUsIHRoaXMubmV3VGFza0xvd1ByaW9yaXR5LCB0aGlzLm5ld1Rhc2tNZWRpdW1Qcmlvcml0eSwgdGhpcy5uZXdUYXNrSGlnaFByaW9yaXR5LCB0aGlzLm5ld1Rhc2tQcm9qZWN0SWQgXS5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAodGhpcy5lZGl0VGFza0Zvcm0ucmVwb3J0VmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5lZGl0VGFza0Zvcm0pO1xuICAgICAgICAgICAgY29uc3QgZm9ybVByb3BzID0gT2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhKTtcbiAgICAgICAgICAgIGZvcm1Qcm9wcy5kdWVEYXRlID0gbmV3IERhdGUoZm9ybVByb3BzLmR1ZURhdGUpO1xuICAgICAgICAgICAgZm9ybVByb3BzLnByaW9yaXR5ID0gTnVtYmVyKGZvcm1Qcm9wcy5wcmlvcml0eSk7XG4gICAgICAgICAgICBmb3JtUHJvcHMucHJvamVjdElkID0gTnVtYmVyKGZvcm1Qcm9wcy5wcm9qZWN0SWQpO1xuICAgICAgICAgICAgaGFuZGxlcihOdW1iZXIoT2JqZWN0LmtleXModGhpcy51cGRhdGVUYXNrQnV0dG9uKVswXSksIGZvcm1Qcm9wcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBoaWdobGlnaHRQcm9qZWN0KHByb2plY3RJZCkge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbY2xhc3NePXByb2plY3QtXScpO1xuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3RbMF0gPT09IGBwcm9qZWN0LSR7IHByb2plY3RJZCB9YCkge1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYmctZ3JheS0zMDAnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdiZy1ncmF5LTMwMCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZFNob3dUYXNrRGV0YWlscyhoYW5kbGVyKSB7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLnNob3dUYXNrRGV0YWlsc0J1dHRvbnMpLmZvckVhY2goKHsgdGFzaywgYnV0dG9uIH0pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaGFuZGxlcih0YXNrKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlblRhc2tEZXRhaWxzTW9kYWwodGFzaykge1xuICAgIHRoaXMucm9vdC5hcHBlbmQodGhpcy50YXNrRGV0YWlsc01vZGFsKHRhc2spKTtcbiAgICB0aGlzLmNsb3NlTW9kYWxCdXR0b24uZm9jdXMoKTtcbiAgfVxuXG4gIHRhc2tEZXRhaWxzTW9kYWwodGFzaykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgYmctZ3JheS0zMDAvOTUgaC1zY3JlZW4gdy1zY3JlZW4gZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXInO1xuICAgIGVsZW1lbnQuYXBwZW5kKHRoaXMudGFza0RldGFpbHNDYXJkKHRhc2spKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHRhc2tEZXRhaWxzQ2FyZCh0YXNrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3ctWzkwdnddIG1heC13LW1kIGJnLXdoaXRlIGJvcmRlciByb3VuZGVkIHNoYWRvdyBwLTggZmxleCBmbGV4LWNvbCBnYXAtMic7XG4gICAgZWxlbWVudC5hcHBlbmQodGhpcy50YXNrVGl0bGVEaXNwbGF5KHRhc2spLCB0aGlzLnRhc2tEZXNjcmlwdGlvbkRpc3BsYXkodGFzayksIHRoaXMudGFza0R1ZURhdGVEaXNwbGF5KHRhc2spLCB0aGlzLnRhc2tQcmlvcml0eURpc3BsYXkodGFzayksIHRoaXMubWFrZUNsb3NlTW9kYWxCdXR0b24oJ0Nsb3NlJykpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdGFza1RpdGxlRGlzcGxheSh0YXNrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3RleHQteGwgcGItNCc7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrRGVzY3JpcHRpb25EaXNwbGF5KHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAncGItNCc7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrRHVlRGF0ZURpc3BsYXkodGFzaykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gYER1ZSBkYXRlOiAkeyB0YXNrLmR1ZURhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHsgZGF0ZVN0eWxlOiAnZnVsbCcgfSkgfWA7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICB0YXNrUHJpb3JpdHlEaXNwbGF5KHRhc2spIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAncGItNCc7XG4gICAgbGV0IHRleHQ7XG4gICAgc3dpdGNoICh0YXNrLnByaW9yaXR5KSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRleHQgPSAnTG93JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRleHQgPSAnTWVkaXVtJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRleHQgPSAnSGlnaCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gYFByaW9yaXR5OiAkeyB0ZXh0IH1gO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuXG4vLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuY29uc3QgYXBwID0gbmV3IENvbnRyb2xsZXIoeyBtb2RlbDogbmV3IE1vZGVsKCksIHZpZXc6IG5ldyBWaWV3KCkgfSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=