import React from "react";

export default function Buttons(props) {
  function add() {
    fetch("http://localhost:3005/Todos", {
      method: "POST",
      body: JSON.stringify({
        userId: props.id,
        title: prompt(),
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <div>
      <button>upDate</button>
      <button>delete</button>
      <button
        onClick={() => {
          add();
          props.rend(1);
        }}
      >
        add
      </button>
    </div>
  );
}
