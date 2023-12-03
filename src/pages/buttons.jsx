import React from "react";

export default function Buttons(props) {

//   function deleteTodo(){
//     fetch(`http://localhost:3005/todos?userId=${props.userId}&id=${props.id}`, {
//   method: 'DELETE',
  
// }).then((x)=>console.log("ojojjoj");
// props.rend(2)
//   });
  function deleteTodo() {
    fetch( `http://localhost:3005/todos/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  
 function toApDate(){
  let content=prompt();
    if (content==null) {return}
    fetch(`http://localhost:3005/Todos/${props.id}`, {
      method: "PUT",
      body: JSON.stringify({
        userId: 1,
        title: content,
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
      <button onClick={() => {
         toApDate ();
        props.rend  (props.r+1);
        }}>upDate</button>
      <button onClick={() => {
         deleteTodo ();
        props.rend(props.r+1);
        }}>delete</button>
      
    </div>
  );
}
