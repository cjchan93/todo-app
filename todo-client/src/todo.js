import React, { useState, useEffect } from "react";
import "./todo.css";
import { Form } from "react-bootstrap";

const GRAPHQL_API = 'http://localhost:4000/';

export default function Todo(props) {
    const { id, todo, status } = props.item;
    const [newValue, setNewValue] = useState("");
    const [idValue, setIdValue] = useState("");
    const [todoArray, setTodoArray] = useState([]);

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
        setNewValue(event.target.value);
    };

    const handleOnClick = event => {
        setIdValue(event.target.id);
    }

    const editTodo = event => {
        let id = idValue;

        const editedTodo = todoArray.map(item => {
            if (item.id == id) {
                item.todo = newValue;

                const query = `
                mutation UpdateNotesMutation {
                    updateNotes(iD: "${id}", toDo: "${newValue}") {
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
        })

        setTodoArray(editedTodo);
    }

    const handleKeyPress = id => {

        if (id.key === 'Enter') {

            if (todoArray) {
                editTodo();
                window.location.reload();
            }
        }
    }

    const getStyle = () => {
        return {
            cursor: "pointer",
            textDecoration: status ? "line-through" : "none"
        };
    };

    return (
        <div className="todo-Item__form">
            <div
                key={id}
                onClick={() => props.markComplete(id)}
            >
                <Form.Check
                    custom
                    onChange={() => { }}
                    checked={status}
                    id={id}
                    type={"checkbox"}
                    label={
                        <strong className="todo-Item__title" style={getStyle()}>{todo}</strong>
                    }
                    onClick={() => props.markComplete(id)}
                >
                </Form.Check>

            </div>


            <input id={id} className="todo-Item__input" onChange={handleInputChange}
                onKeyDown={handleKeyPress} onClick={handleOnClick} placeholder="Edit Here" />

            <button
                type="button"
                className="todo-Item__deleteBtn"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => props.delTodo(id)}
                style={{ cursor: "pointer" }}
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}