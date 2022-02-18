const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: '👋这是一个可拖拽的代办应用' },
    'task-2': { id: 'task-2', content: '👈 试试拖动方块' },
    'task-3': { id: 'task-3', content: '😕点击文本编辑内容' },
    'task-4': { id: 'task-4', content: '👇点击加号添加事件' },
    'task-5': { id: 'task-5', content: '🙌全部数据驱动' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Prepare to study',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Learning...',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Complete',
      taskIds: ['task-5'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
