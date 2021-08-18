import React from "react";
import Todo from "./todo";

export default function Todos(props) {
  let allTodos = "";
  try {
    for (var key in props) {
      allTodos = props[key].map(item => {
        return (
          <Todo
            key={item.id}
            items={item}
            markComplete={props.markComplete}
            delTodo={props.delTodo}
          />
        );
      });
    }
  } catch (e) {}
  return (
    <div>{allTodos}</div>
  );
}