import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'animate.css';
import './index.scss';
import initialData from './initial-data';
import Column from './components/column';
import { DragDropContext } from 'react-beautiful-dnd';
import uuid from './utils/uuid';

function App() {
  const [taskData, setTaskData] = useState(initialData);

  const onDragEnd = useCallback((result) => {
    const { destination, source, draggableId } = result;

    // 取消拖拽
    if(!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    // 确定拖拽
    const startColumn = taskData.columns[source.droppableId];
    const finishColumn = taskData.columns[destination.droppableId];

    // 同列拖拽
    if(startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      }

      const newState = {
        ...taskData,
        columns: {
          ...taskData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setTaskData(newState);
      return;
    }

    // 跨列拖拽
    if(startColumn !== finishColumn) {
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...taskData,
        columns: {
          ...taskData.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      };
      setTaskData(newState);
      return;
    }
  }, [taskData]);

  // 删除任务
  function deleteTask(columnId, taskId) {
    const targetColumn = {...taskData.columns[columnId]};
    targetColumn.taskIds.splice(targetColumn.taskIds.indexOf(taskId), 1);

    const newTasks = {...taskData.tasks};
    delete newTasks[taskId];
    
    const newState = {
      ...taskData,
      tasks: {
        ...newTasks
      },
      columns: {
        ...taskData.columns,
        [targetColumn.id]: targetColumn,
      },
    };

    setTaskData(newState);
  }

  // 添加任务条
  function addTaskPlaceHolder(columnId) {
    const newTaskId = uuid(8, 10).toString();
    const newTasks = {
      ...taskData.tasks,
      [newTaskId]: {
        id: newTaskId,
        type: 0,
        content: '',
      },
    };

    const targetColumn = {...taskData.columns[columnId]};
    targetColumn.taskIds.push(newTaskId)

    const newState = {
      ...taskData,
      tasks: {
        ...newTasks
      },
      columns: {
        ...taskData.columns,
        [targetColumn.id]: targetColumn,
      },
    };

    setTaskData(newState);
  }

  function addTaskContent(taskId, content) {
    const newTasks = {...taskData.tasks};
    console.log();
    newTasks[taskId].content = content;

    const newState = {
      ...taskData,
      tasks: {
        ...newTasks
      },
    }

    setTaskData(newState);
  }

  const funHook = {
    deleteTask,
    addTaskPlaceHolder,
    addTaskContent
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
        taskData.columnOrder.map((columnId, index) => {
          const column = taskData.columns[columnId];

          // 获取对应列的Task列表
          const tasks = column.taskIds.map((taskId, index) => {
            return taskData.tasks[taskId];
          })

          return (
            <Column
              columnIndex={index}
              key={column.id}
              column={column}
              tasks={tasks}
              funHook={funHook}
            />
          );
        })
      }
    </DragDropContext>
  );
}

// ================================
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
