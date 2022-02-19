const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: '👋这是一个可拖拽的代办应用' },
    'task-2': { id: 'task-2', content: '🚧数据持久化支持' },
    'task-3': { id: 'task-3', content: '👈 试试拖动方块' },
    'task-4': { id: 'task-4', content: '😕点击文本编辑内容' },
    'task-5': { id: 'task-5', content: '👇点击加号添加事件' },
    'task-6': { id: 'task-6', content: '🙌移除动画效果' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Prepare to study',
      taskIds: ['task-1', 'task-3', 'task-4','task-5'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Learning...',
      taskIds: ['task-2'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Complete',
      taskIds: ['task-6'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
