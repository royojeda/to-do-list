export class Controller {
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
