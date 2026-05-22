import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { getTodoStats } from "./storage";
import {
  fetchAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./api";
import "./styles/Todo.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchAllTodos();
      if (data) {
        setTodos(data);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    setStats(getTodoStats(todos));
  }, [todos]);

  const handleTodoCreate = async (title) => {
    const newTodo = await createTodo({ title });
    if (newTodo) {
      setTodos((prev) => [newTodo, ...prev]);
    }
  };

  const handleTodoToggle = async (id, completed) => {
    const updated = await updateTodo(id, { completed });
    if (updated) {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    }
  };

  const handleTodoEdit = async (id, title) => {
    const updated = await updateTodo(id, { title });
    if (updated) {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    }
  };

  const handleTodoDelete = async (id) => {
    const deleted = await deleteTodo(id);
    if (deleted) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="app-container">
      <Header />
      <TodoForm onTodoCreate={handleTodoCreate} />
      <div className="stats-bar">
        <span>📋 Task summary</span>
        <span className="task-count">
          ✓ {stats.completed} / {stats.total} completed
        </span>
      </div>
      <TodoList
        todos={todos}
        onToggle={handleTodoToggle}
        onEdit={handleTodoEdit}
        onDelete={handleTodoDelete}
      />
    </div>
  );
};

export default App;
