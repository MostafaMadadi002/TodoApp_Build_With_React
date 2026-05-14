// App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { loadTodos, getTodoStats } from './storage';
import './styles/Todo.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

    // Load todos from storage.js on mount
    useEffect(() => {
        const loadedTodos = loadTodos();
        setTodos(loadedTodos);
    }, []);

    // Update stats whenever todos change
    useEffect(() => {
        setStats(getTodoStats(todos));
    }, [todos]);

    const handleTodosUpdate = (updatedTodos) => {
        setTodos(updatedTodos);
    };

    return (
        <div className="app-container">
            <Header />
            <TodoForm onTodosUpdate={handleTodosUpdate} />
            <div className="stats-bar">
                <span>📋 Task summary</span>
                <span className="task-count">
                    ✓ {stats.completed} / {stats.total} completed
                </span>
            </div>
            <TodoList
                todos={todos}
                onTodosUpdate={handleTodosUpdate}
            />
        </div>
    );
};

export default App;