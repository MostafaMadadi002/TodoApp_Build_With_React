// storage.js
// This file handles all todo data storage and management

const STORAGE_KEY = "todo-app-data";

// Load todos from localStorage
export const loadTodos = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

// Save todos to localStorage
export const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// Add a new todo
export const addTodo = (todos, text) => {
  if (!text.trim()) return todos;

  const newTodo = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  
  const updatedTodos = [newTodo, ...todos];
  saveTodos(updatedTodos);
  return updatedTodos;
};

// Toggle todo completion status
export const toggleTodoComplete = (todos, id) => {
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
  saveTodos(updatedTodos);
  return updatedTodos;
};

// Edit todo text
export const editTodo = (todos, id, newText) => {
  if (!newText.trim()) return todos;

  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, text: newText.trim() } : todo,
  );
  saveTodos(updatedTodos);
  return updatedTodos;
};

// Delete a todo
export const deleteTodo = (todos, id) => {
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(updatedTodos);
  return updatedTodos;
};

// Get todo statistics
export const getTodoStats = (todos) => {
  return {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    pending: todos.filter((todo) => !todo.completed).length,
  };
};
