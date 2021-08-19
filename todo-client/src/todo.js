import React from "react";
import "./todo.css";
import { Form } from "react-bootstrap";

export default function Todo(props) {
    const { id, title, done } = props.item;

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
                        <strong className="todo-Item__title" style={getStyle()}>
                            {title}
                        </strong>
                    }
                    onClick={() => props.markComplete(id)}
                />
            </div>

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