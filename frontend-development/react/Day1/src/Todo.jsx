import React, { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");

  function addTodo(description) {
    setTodos([...todos, { id: Date.now(), description }]);
    setDescription("");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
    <div className="todo-container">
      <div className="todo-input">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={() => addTodo(description)}>Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Todo;
