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

newToDoList.updateProject(0,
  {
    title: 'new project title'
  }
);
console.table(newToDoList.tasks[0]);
