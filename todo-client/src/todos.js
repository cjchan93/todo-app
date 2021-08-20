import React from 'react';
import Todo from './todo';
import './todos.css';

export default function Todos(props) {
  let allTodos = "";
  try {
    for (var key in props) {
      allTodos = props.todoArray.map(item => {
        return (
          <div className="todo__list">
            <Todo item={item} markComplete={props.markComplete} delTodo={props.delTodo} />
          </div>
        );
      })

      // allTodos = props[key].map(item => {
      //   return (
      //     <div className="todo__list">
      //       <Todo
      //         key={item.id}
      //         item={item}
      //         markComplete={props.markComplete}
      //         delTodo={props.delTodo}
      //       />
      //     </div>
      //   );
      // });
    }
  } catch (e) { }
  return (
    <div>{allTodos}</div>
  );
}