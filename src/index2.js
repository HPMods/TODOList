import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  let [txt, setTxt] = React.useState("");
  let [number, setNumber] = React.useState(0);

  let [buttons, setButtons] = React.useState(["hello", "test"]);

  let onSubmit = () => {
    let clone = buttons;
    for (let i = 0; i < number; i++) {
      clone.push(txt);
    }

    setButtons(clone);
    setTxt("");
    setNumber(0);
  };

  let removeTxt = index => {
    let clone = txt.filter((v, i) => index === i);
    setTxt(clone);
  };

  return (
    <div>
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <input
            type="text"
            value={txt}
            onChange={event => setTxt(event.target.value)}
          />
          <br />
          <input
            type="number"
            value={number}
            onChange={event => setNumber(event.target.value)}
          />
          <br />
          <button>ADD</button>
        </form>
      </div>
      {buttons.map(v => (
        <button>{v}</button>
      ))}
      <hr />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
