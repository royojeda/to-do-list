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

newToDoList.createProject(
  {
    title: 'test project title'
  }
);

newToDoList.updateTask(0,
  {
    title: 'test title',
    description: 'test description',
    dueDate: new Date(),
    priority: 1,
    projectId: 1
  }
);
console.table(newToDoList.tasks[0]);
