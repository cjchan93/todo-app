import React, { useEffect, useState } from 'react';
import './App.css';
import Todos from './todos';

const GRAPHQL_API = 'http://localhost:4000/';

export default function App() {
  const [todoValue, setTodoValue] = useState("");
  const [todos, updateTodosList] = useState([]);
  const [todoArray, setTodoArray] = useState([]);

  useEffect(() => {

    const query = `{
      allTodos {
        id
        title
        done
      }
    }`;

    fetch(GRAPHQL_API, {
      method: 'POST',
      body: JSON.stringify({
        query
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json()).then(result => {
      setTodoArray(result.data.allTodos);

      // const serverTodos = result.data.allTodos;
      // if (serverTodos) updateTodosList(serverTodos);
    });

  }, []);

  const handleInputChange = event => {
    setTodoValue(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    const query = `
    mutation {
        createTodo(title: "${todoValue}", done: false) {
            id 
            title
            done
        }
    }
    `;

    fetch(GRAPHQL_API, {
      method: 'POST',
      body: JSON.stringify({
        query
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

    if (todoValue != null) {
      const newItem = {
        title: todoValue,
        done: false
      };

      setTodoArray(previousTodos => {
        return [...previousTodos, newItem];
      });

      setTodoValue("");
    }
    else {

    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  }

  const markComplete = id => {
    const updatedTodo = todoArray.map(item => {
      if (item.id == id) {
        item.done = !item.done;

        if (item.done) {
          const query = `
          mutation {
              updateTodo(id: "${id}", done: true) {
                  id 
                  title
                  done
              }
          }
          `;

          fetch(GRAPHQL_API, {
            method: 'POST',
            body: JSON.stringify({
              query
            }),
            headers: {
              'content-type': 'application/json'
            }
          }).then(response => response.json());
        }
        else {
          const query = `
          mutation {
              updateTodo(id: "${id}", done: false) {
                  id 
                  title
                  done
              }
          }
          `;

          fetch(GRAPHQL_API, {
            method: 'POST',
            body: JSON.stringify({
              query
            }),
            headers: {
              'content-type': 'application/json'
            }
          }).then(response => response.json());
        }
      }
    })
    updateTodosList(updatedTodo);
  };

  const delTodo = id => {

    setTodoArray([
      ...todoArray.filter(todo => {
        return todo.id !== id;
      })
    ]);

    const query = `
    mutation {
      deleteTodo (id: "${id}") {
        id
        title
        done
      }
    }
    `;

    fetch(GRAPHQL_API, {
      method: 'POST',
      body: JSON.stringify({
        query
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())
  };

  return (
    <body className="todo__body">
      <h1 className="todo__heading">Todo GraphQL</h1>

      <form className="todo__input-form">
        <label className="todo__input-title"></label>
        <input className="todo__input-box" onChange={handleInputChange} onKeyDown={handleKeyPress}
          placeholder="What needs to be done" />

        <button className="todo__input-button" onClick={handleButtonClick}>Add Todo Item</button>
      </form>

      <Todos todoArray={todoArray} markComplete={markComplete} delTodo={delTodo} />

    </body>
  );
}






