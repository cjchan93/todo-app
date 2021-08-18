import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Todos from './todos';

const GRAPHQL_API = 'http://localhost:4000/';

export default function App() {
  const [todoValue, setTodoValue] = useState("");
  const [todos, updateTodosList] = useState([]);

  useEffect(() => {

    const query = `{
      allTodos {
        id
        title
        done
      }
    }`;

    axios.get(GRAPHQL_API, {
      method: 'POST',
      body: JSON.stringify({
        query
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(result => {
      const serverTodos = result.data.allTodos;

      const storedTodos = JSON.parse(localStorage.getItem(serverTodos));
      if (storedTodos) updateTodosList(storedTodos);
    });

  }, []);

  useEffect(() => {
    const query = `{
      allTodos {
        id
        title
        done
      }
    }`;

    axios.get(GRAPHQL_API, {
      method: 'POST',
      body: JSON.stringify({
        query
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(result => {
      const serverTodos = result.data.allTodos;
      localStorage.setItem(serverTodos, JSON.stringify(todos));
    });

  }, [todos]);

  const handleInputChange = event => {
    setTodoValue(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    const query = `{
      allTodos {
        id
        title
        done
      }
    }`;

    axios.get(GRAPHQL_API, {
      method: 'POST',
      body: JSON.stringify({
        query
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(result => {
      const serverTodos = result.data.allTodos;

      if (todoValue != null) {
        const newItem = {
          id: 1,
          todo: todoValue,
          isDone: false
        };

        updateTodosList(previousTodos => {
          return [...previousTodos, newItem];
        });

        setTodoValue("");
      }
      else {

      }
    });
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  }

  const markComplete = id => {
    const updatedTodo = todos.map(item => {
      if (item.id == id) {
        item.isDone = !item.isDone;
      }
      return item;
    })
    updateTodosList(updatedTodo);
  };

  const delTodo = id => {
    updateTodosList([
      ...todos.filter(todo => {
        return todo.id !== id;
      })
    ]);
  };

  return (
    <body>
      <h1 className="todo__heading">Todo GraphQL</h1>

      <form className="todo__input-form">
        <label className="todo__input-title" for="title"></label>
        <input className="todo__input-box" onChange={handleInputChange} onKeyDown={handleKeyPress}
          placeholder="What needs to be done" />

        <button className="todo__input-button" onClick={handleButtonClick}>Add Todo</button>
      </form>

      <Todos todos={todos} markComplete={markComplete} delTodo={delTodo} />

    </body>
  );
}






