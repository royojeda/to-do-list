import { Logic } from './logic.js'

const newToDoList = new Logic();

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

console.table(newToDoList.tasks[0]);
