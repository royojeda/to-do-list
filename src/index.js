import { ToDoList } from './todolist.js'

const newToDoList = new ToDoList();

newToDoList.createTask(
  {
    title: 'test title',
    description: 'test description',
    dueDate: new Date(),
    priority: 1,
    projectId: 0
  }
);

console.log(newToDoList.projects);
console.log(newToDoList.tasks);
newToDoList.deleteProject(0);
console.log(newToDoList.projects);
console.log(newToDoList.tasks);
