import React from 'react';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

function Column(props) {
  const handClick = (e) => {
    props.funHook.addTaskPlaceHolder(props.column.id, '');
  }

  return (
    <div className='column-box'>
      <div className='column-title'>{props.column.title}</div>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => {

          return (
            <div
              className={`
                column-stack
                ${snapshot.isDraggingOver ? 'column-hover' : ''}
              `}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.tasks.map((task, index) => {
                return (
                  <Task key={task.id} columnId={props.column.id} task={task} index={index} funHook={props.funHook} />
                );
              })}
              {props.columnIndex === 0 && 
                <div className='add-btn' onClick={handClick}>
                  +
                </div>
              }
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default Column;