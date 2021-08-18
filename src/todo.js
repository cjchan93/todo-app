import React from "react";
import "./todo.css";
import { Fragment } from "react";
import { Form } from "react-bootstrap";

export default function Todo(props) {
    const { id, todo: task, isDone } = props.items;

    const getStyle = () => {
        return {
            cursor: "pointer",
            textDecoration: isDone ? "line-through" : "none"
        };
    };

    return (
        <Fragment>
            <div className="todo-Item__form">
                <div
                    key={id}
                    onClick={() => props.markComplete(id)}
                >
                    <Form.Check
                        custom
                        onChange={() => { }}
                        checked={isDone}
                        id={id}
                        type={"checkbox"}
                        label={
                            <strong className="todo-Item__title" style={getStyle()}>
                                {task}
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
        </Fragment>
    );
}