import React, { useEffect, useState } from 'react';
// import './App.css';
// import Todos from './todos';
// import { v4 as uuidv4 } from 'uuid';

import TodoPage from './TodoPage';
import SearchTodo from './Testing';

// import {
//   InMemoryCache,
//   HttpLink,
//   from,
//   useQuery
// } from "@apollo/client";
// import gql from 'graphql-tag';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks'
// import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// const GRAPHQL_API = 'http://localhost:4000/';
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/',
//   cache: new InMemoryCache()
// });

function App() {
  // const [todoValue, setTodoValue] = useState("");
  // const [todos, updateTodosList] = useState([]);
  // const [todoArray, setTodoArray] = useState([]);

  // const FIND_NOTES = gql`
  //   query Query {
  //     getNotes {
  //       id
  //       todo
  //       status
  //     }
  //   }
  // `;

  // const { error, loading, data } = useQuery(FIND_NOTES);

  // useEffect(() => {
  //   if (data) {
  //     setTodoArray(data.getNotes);
  //   }
  // }, [data]);

  // if (loading) return (`Loading...`);
  // if (error) return (`Error...${error.message}`);

  //get data from graphql server (store in todoArray)
  // useEffect(() => {

  //   const query = `query Query {
  //     getNotes {
  //       id
  //       todo
  //       status
  //     }
  //   }`;

  //   fetch(GRAPHQL_API, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       query
  //     }),
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }).then(response => response.json()).then(result => {
  //     setTodoArray(result.data.getNotes);
  //   });

  // }, []);

  //handle input value
  // const handleInputChange = event => {
  //   setTodoValue(event.target.value);
  // };

  //create new data to graphql server after submit
  // const handleButtonClick = (event) => {
  //   window.location.reload();

  //   const query = `
  //   mutation Mutation {
  //     createNote(todo: "${todoValue}") {
  //       id
  //       todo
  //       status
  //     }
  //   }
  //   `;

  //   fetch(GRAPHQL_API, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       query
  //     }),
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }).then(response => response.json());

  //   if (todoValue != null) {
  //     const newItem = {
  //       id: uuidv4(),
  //       todo: todoValue,
  //       status: false
  //     };

  //     setTodoArray(previousTodos => {
  //       return [...previousTodos, newItem];
  //     });

  //     console.log(newItem)
  //     console.log(newItem.id)

  //     setTodoValue("");
  //   }
  //   else {

  //   }
  // }

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleButtonClick();
  //   }
  // }

  //mark complete function (tally with graphql)
  // const markComplete = id => {
  //   const updatedTodo = todoArray.map(item => {
  //     if (item.id == id) {
  //       item.status = !item.status;

  //       if (item.status) {
  //         const query = `
  //         mutation UpdateStatusMutation {
  //           updateStatus(iD: "${id}", newStatus: true) {
  //             id
  //             todo
  //             status
  //           }
  //         }
  //         `;

  //         fetch(GRAPHQL_API, {
  //           method: 'POST',
  //           body: JSON.stringify({
  //             query
  //           }),
  //           headers: {
  //             'content-type': 'application/json'
  //           }
  //         }).then(response => response.json());
  //       }
  //       else {
  //         const query = `
  //         mutation UpdateStatusMutation {
  //           updateStatus(iD: "${id}", newStatus: false) {
  //             id
  //             todo
  //             status
  //           }
  //         }
  //         `;

  //         fetch(GRAPHQL_API, {
  //           method: 'POST',
  //           body: JSON.stringify({
  //             query
  //           }),
  //           headers: {
  //             'content-type': 'application/json'
  //           }
  //         }).then(response => response.json());
  //       }
  //     }
  //   })
  //   updateTodosList(updatedTodo);
  // };

  //delete function (tally with graphql)
  // const delTodo = id => {

  //   setTodoArray([
  //     ...todoArray.filter(todo => {
  //       return todo.id !== id;
  //     })
  //   ]);

  //   const query = `
  //   mutation Mutation {
  //     deleteNote(iD: "${id}") {
  //       id
  //       todo
  //       status
  //     }
  //   }
  //   `;

  //   fetch(GRAPHQL_API, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       query
  //     }),
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }).then(response => response.json())
  // };

  return (
    // <React.StrictMode>
    //   <ApolloProvider client={client}>
    //     <ApolloHooksProvider client={client}>
    //       <Router>
    //         <Switch>
    //           <body className="todo__body">
    //             <h1 className="todo__heading">Todo GraphQL</h1>

    //             <form className="todo__input-form">
    //               <label className="todo__input-title"></label>
    //               <input className="todo__input-box" onChange={handleInputChange} onKeyDown={handleKeyPress}
    //                 placeholder="What needs to be done" />

    //               <button className="todo__input-button" onClick={handleButtonClick}>Add Todo Item</button>
    //             </form>

    //           </body>

    //           <Route path="/todos">
    //             <Todos todoArray={todoArray} markComplete={markComplete} delTodo={delTodo} />
    //           </Route>
    //         </Switch>
    //       </Router>
    //     </ApolloHooksProvider>
    //   </ApolloProvider>
    // </React.StrictMode>

    // <body className="todo__body">
    //   <h1 className="todo__heading">Todo GraphQL</h1>

    //   <form className="todo__input-form">
    //     <label className="todo__input-title"></label>
    //     <input className="todo__input-box" onChange={handleInputChange} onKeyDown={handleKeyPress}
    //       placeholder="What needs to be done" />

    //     <button className="todo__input-button" onClick={handleButtonClick}>Add Todo Item</button>
    //   </form>

    //   <Todos todoArray={todoArray} markComplete={markComplete} delTodo={delTodo} />

    // </body>

    <div>
      <TodoPage />
    </div>
  );
}

export default App;






