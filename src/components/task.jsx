import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Task(props) {
  const [disappear, setDisappear] = useState(0);

  // 消失动画
  const handleClick = (e, HandleAnimaEnd) => {
    setDisappear(1);
  }

  // 动画结束执行删除
  const handleAnimaEnd = (e) => {
    props.funHook.deleteTask(props.columnId, props.task.id);
  }

  const handleChange = (e) => {
    props.funHook.addTaskContent(props.task.id, e.target.value);
  }

  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      // isDragDisabled={props.task.type === 0}
    >
      {(provided, snapshot) => {
        return (
          <div
            className={`
              column-task
              animate__animated
              animate__faster
              ${snapshot.isDragging ? 'task-draging' : ''}
              ${props.columnId === 'column-1' && 'task-readying'}
              ${props.columnId === 'column-2' && 'task-doing'}
              ${props.columnId === 'column-3' && 'task-complete'}
              ${disappear === 1 && 'animate__fadeOutLeft'}
            `}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onAnimationEnd={handleAnimaEnd}
            ref={provided.innerRef}
          >
            <div
              className='drag-handle'
              {...provided.dragHandleProps}>
            </div>
            <input
              className='task-input'
              placeholder={`task id #${props.task.id}`}
              value={props.task.content}
              onChange={handleChange}>
            </input>
            <span onClick={handleClick.bind(this, props)} className='delete-mark'>&times;</span>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task;