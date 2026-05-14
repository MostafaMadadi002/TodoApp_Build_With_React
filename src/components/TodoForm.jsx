// components/TodoForm.jsx
import React, { useState } from 'react';
import { addTodo, loadTodos } from '../storage';

const TodoForm = ({ onTodosUpdate }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            // Get current todos from storage

            const currentTodos = loadTodos();

            // Add new todo using storage.js function
            const updatedTodos = addTodo(currentTodos, inputValue);

            // Update parent component
            onTodosUpdate(updatedTodos);

            // Clear input
            setInputValue('');
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="task-input"
                    placeholder="Write a new task..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="add-btn">
                    + Add
                </button>
            </div>
        </form>
    );
};

export default TodoForm;