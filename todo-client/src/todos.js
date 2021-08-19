import React from 'react';
import Todo from './todo';
import './todos.css';

export default function Todos(props) {
  let allTodos = "";
  try {
    for (var key in props) {
      allTodos = props[key].map(item => {
        return (
          <div className="todo__list">
            <Todo
              key={item.id}
              items={item}
              markComplete={props.markComplete}
              delTodo={props.delTodo}
            />
          </div>

        );
      });
    }
  } catch (e) { }
  return (
    <div>{allTodos}</div>
  );
}