import React from 'react';
import Todo from './todo';
import './todos.css';

export default function Todos(props) {
  let allNotes = "";
  try {
    for (var key in props) {
      allNotes = props.todoArray.map(item => {
        return (
          <div className="todo__list">
            <Todo item={item} markComplete={props.markComplete} delTodo={props.delTodo} />
          </div>
        );
      })
    }
  } catch (e) { }
  return (
    <div>{allNotes}</div>
  );
}