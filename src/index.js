import React from "react";
import ReactDOM from "react-dom";
import db from "./firebase";

import "./styles.css";

console.log(db);

function App() {
  let [todos, setTodos] = React.useState([]);
  let [txt, setTxt] = React.useState("");
  let [loading, setLoading] = React.useState(false);

  async function loadTodos() {
    setLoading(true);
    let snapshot = await db
      .collection("todos")
      .orderBy("created_at", "asc")
      .get();
    console.log(snapshot.docs);
    snapshot.docs.forEach(v => console.log(v.data()));

    setTodos(snapshot.docs);
    setLoading(false);
  }

  async function onSubmit() {
    let newObj = { txt, created_at: new Date().getTime(), isDone: false };
    await db.collection("todos").add(newObj);

    loadTodos();
    setTxt("");
  }

  async function deleteTodo(id) {
    await db
      .collection("todos")
      .doc(id)
      .delete();
    loadTodos();
  }

  async function toggleDone(id) {
    let clone = {};
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        console.log(todos[i].data().txt);
        clone = todos[i].data();
        await db
          .collection("todos")
          .doc(id)
          .delete();
      }
    }
    clone.isDone = !clone.isDone;
    await db.collection("todos").add(clone);
    loadTodos();
  }

  React.useEffect(() => {
    loadTodos();
  }, []);

  let doneStyle = {
    textDecoration: "line-through",
    background: "red"
  };

  if (loading) return <div>loading...</div>;
  return (
    <div>
      <div>
        {todos.map(v => (
          <div style={v.data().isDone ? doneStyle : null} class="that">
            {v.data().txt}
            <button class="comrade" onClick={() => deleteTodo(v.id)}>
              DEL
            </button>
            <button onClick={() => toggleDone(v.id)}>DONE</button>
          </div>
        ))}
      </div>
      <hr />
      <hr />
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <input
            class="sure"
            type="text"
            placeholder="What to do...."
            value={txt}
            onChange={event => setTxt(event.target.value)}
          />
          <br />
          <br />

          <button class="comrade">ADD</button>
        </form>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
