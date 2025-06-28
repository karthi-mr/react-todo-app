import { v4 as uuidv4 } from 'uuid';

export const predefinedTasks = [
  {
    id: uuidv4(),
    text: 'Demo task 1',
    priority: 'High',
    dueDate: '2025-06-30',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    text: 'Demo task 2',
    priority: 'Low',
    dueDate: '2025-07-12',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    text: 'Demo task 3',
    priority: 'Medium',
    dueDate: '2025-06-01',
    isCompleted: true,
  },
  {
    id: uuidv4(),
    text: 'Demo task 4',
    priority: 'High',
    dueDate: '2025-07-02',
    isCompleted: false,
  },
];
