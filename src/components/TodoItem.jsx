// components/TodoItem.jsx
import React, { useState } from 'react';
import { toggleTodoComplete, editTodo, deleteTodo, loadTodos } from '../storage';

const TodoItem = ({ todo, onTodosUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleToggle = () => {
        const currentTodos = loadTodos();
        const updatedTodos = toggleTodoComplete(currentTodos, todo.id);
        onTodosUpdate(updatedTodos);
    };

    const handleEditSubmit = () => {
        if (editText.trim() && editText !== todo.text) {
            const currentTodos = loadTodos();
            const updatedTodos = editTodo(currentTodos, todo.id, editText);
            onTodosUpdate(updatedTodos);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditText(todo.text);
        setIsEditing(false);
    };

    const handleDelete = () => {
        const currentTodos = loadTodos();
        const updatedTodos = deleteTodo(currentTodos, todo.id);
        onTodosUpdate(updatedTodos);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEditSubmit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    return (
        <div className="todo-item">
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    className="todo-check"
                />

                {isEditing ? (
                    <input
                        type="text"
                        className="edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleEditSubmit}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.text}
                    </span>
                )}
            </div>

            <div className="action-buttons">
                {!isEditing ? (
                    <>
                        <button
                            className="icon-btn"
                            onClick={() => setIsEditing(true)}
                            aria-label="Edit task"
                        >
                            ✏️
                        </button>
                        <button
                            className="icon-btn delete-btn"
                            onClick={handleDelete}
                            aria-label="Delete task"
                        >
                            🗑️
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="icon-btn save-btn"
                            onClick={handleEditSubmit}
                            aria-label="Save edit"
                        >
                            💾
                        </button>
                        <button
                            className="icon-btn cancel-btn"
                            onClick={handleCancelEdit}
                            aria-label="Cancel edit"
                        >
                            ✖️
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoItem;