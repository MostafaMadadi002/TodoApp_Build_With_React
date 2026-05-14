// components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onTodosUpdate }) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <div className="empty-state">
          ✨ No tasks yet — add your first task above ✨
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodosUpdate={onTodosUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;