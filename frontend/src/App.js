import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [typedTodo, setTypedTodo] = useState("");

  const createTodo = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: typedTodo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTypedTodo("");
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (todo) => {
    fetch("http://localhost:8080/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8080/")
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch((err) => console.error(err));
    };
    fetchData();
  });

  return (
    <div className="App">
      <section>
        <h1>Simple Todo List Application</h1>
        <form onSubmit={createTodo}>
          <input
            type="text"
            onChange={(e) => setTypedTodo(e.target.value)}
            value={typedTodo}
          />
          <input type="submit" value="Add Todo" />
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <p>
                {todo.id} {todo.title}
              </p>
              <button onClick={() => handleDelete(todo)}>delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
