const API_BASE = "http://127.0.0.1:8000/api";

const normalizeTodo = (todo) => ({
  ...todo,
  text: todo.title,
  createdAt: todo.created_at,
});

export const fetchAllTodos = async () => {
  try {
    const response = await fetch(`${API_BASE}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Failed to fetch todos", response.statusText);
      return [];
    }
    const data = await response.json();
    return data.map(normalizeTodo);
  } catch (error) {
    console.error("fetchAllTodos error", error);
    return [];
  }
};

export const createTodo = async ({ title }) => {
  try {
    const response = await fetch(`${API_BASE}/todos/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      console.error("Failed to create todo", response.statusText);
      return null;
    }
    const data = await response.json();
    return normalizeTodo(data);
  } catch (error) {
    console.error("createTodo error", error);
    return null;
  }
};

export const updateTodo = async (id, body) => {
  try {
    const response = await fetch(`${API_BASE}/todos/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error("Failed to update todo", response.statusText);
      return null;
    }
    const data = await response.json();
    return normalizeTodo(data);
  } catch (error) {
    console.error("updateTodo error", error);
    return null;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/todos/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Failed to delete todo", response.statusText);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("deleteTodo error", error);
    return null;
  }
};
