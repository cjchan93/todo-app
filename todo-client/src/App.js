import React, { useEffect, useState } from 'react';
import './App.css';
import Todos from './todos';
import { v4 as uuidv4 } from 'uuid';

const GRAPHQL_API = 'http://localhost:4000/';

export default function App() {
  const [todoValue, setTodoValue] = useState("");
  const [todos, updateTodosList] = useState([]);
  const [todoArray, setTodoArray] = useState([]);

  //get data from graphql server (store in todoArray)
  useEffect(() => {

    const query = `query Query {
      getNotes {
        id
        todo
        status
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
      setTodoArray(result.data.getNotes);
    });

  }, []);

  //handle input value
  const handleInputChange = event => {
    setTodoValue(event.target.value);
  };

  //create new data to graphql server after submit
  const handleButtonClick = (event) => {
    event.preventDefault();

    const query = `
    mutation Mutation {
      createNote(todo: "${todoValue}") {
        id
        todo
        status
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
        id: uuidv4(),
        todo: todoValue,
        status: false
      };

      setTodoArray(previousTodos => {
        return [...previousTodos, newItem];
      });

      console.log(newItem)
      console.log(newItem.id)

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

  //mark complete function (tally with graphql)
  const markComplete = id => {
    const updatedTodo = todoArray.map(item => {
      if (item.id == id) {
        item.status = !item.status;

        if (item.status) {
          const query = `
          mutation Mutation($updateNoteId: Int!, $updateNoteStatus: Boolean!) {
            updateNote(id: "${id}", status: true) {
              id
              todo
              status
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
          mutation Mutation($updateNoteId: Int!, $updateNoteStatus: Boolean!) {
            updateNote(id: "${id}", status: false) {
              id
              todo
              status
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

  //delete function (tally with graphql)
  const delTodo = id => {

    setTodoArray([
      ...todoArray.filter(todo => {
        return todo.id !== id;
      })
    ]);

    const query = `
    mutation Mutation {
      deleteNote(iD: "${id}") {
        id
        todo
        status
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






