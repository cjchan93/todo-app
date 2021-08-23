import React, { useState } from "react";
import "./todo.css";
import { Form } from "react-bootstrap";

const GRAPHQL_API = 'http://localhost:4000/';

export default function Todo(props) {
    const { id, title, done } = props.item;
    const [newValue, setNewValue] = useState("");
    const [todoArray, setTodoArray] = useState([]);

    //handle input value
    const handleInputChange = event => {
        setNewValue(event.target.value);
    };

    //create new data to graphql server after submit
    const handleKeyPress = id => {
        if (id.key === 'Enter') {
            setTodoArray(props.item);

            todoArray.map(item => {
                if (item.id == id) {
                    item.title = newValue;

                    const query = `
                    mutation {
                        editTodo (id: "${id}", title: "${newValue}") {
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
            })
        }
    }

    const getStyle = () => {
        return {
            cursor: "pointer",
            textDecoration: done ? "line-through" : "none"
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
                    checked={done}
                    id={id}
                    type={"checkbox"}
                    label={
                        <strong className="todo-Item__title" style={getStyle()}>{title}</strong>
                        // <input className="todo-Item__title" style={getStyle()} value={title}
                        //     onChange={handleInputChange} onKeyDown={handleKeyPress} />
                    }
                    onClick={() => props.markComplete(id)}
                >
                </Form.Check>

            </div>


            <input className="todo-Item__input" style={getStyle()} onChange={handleInputChange}
                onKeyDown={handleKeyPress} placeholder="Edit Here" />

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