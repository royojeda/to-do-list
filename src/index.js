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

newToDoList.updateTask(0,
  {
    title: 'new title',
    description: 'test description',
    dueDate: new Date(),
    priority: 1,
    projectId: 0
  }
);

newToDoList.toggleTaskStatus(0);

console.log(newToDoList.tasks[0]);
newToDoList.deleteTask(0);
console.log(newToDoList.tasks[0]);
