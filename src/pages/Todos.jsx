// import React from 'react';
// import { Link } from "react-router-dom";
// import { useState, createContext, useContext } from "react";
// import { UserContext } from "../App";

// function Todos (){

//     const {  currentUser ,setCurrentUser} = useContext(UserContext);
//   let ec=  async function user (){
//         fetch(  `http://localhost:3005/Todos`)
        
//       .then((response) => response.json())
//       .then((json) => {console.log(json);
//   })}

//     return(
//         <section>
//         <h1>this is the Todos components</h1>
// <div>{ec}</div>
       
//         <Link to ='/User/Home'>Home</Link>
//         </section>
//     )
// }
// export default Todos
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import Buttons from './buttons';

function Todos() {
  const {id}=useParams()

  const { currentUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [render,setRender] = useState(0)

  useEffect(() => {
    const fetchTodos = async () => {
        const response = await fetch(`http://localhost:3005/todos?userId=${currentUser[1]}`);
        const json = await response.json();
        setTodos(json);
    };
    fetchTodos();
  },[render]);

  return (
    <section>
      <h1>This is the Todos component</h1>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <ul>
              <li>{todo.title}</li>
              <li>{todo.completed.toString()}</li>
            </ul>
            </div>
        ))}
      </div>
      <Buttons id={currentUser[1]} rend={setRender}/>
 
      <Link to='/User/Home'>Home</Link>


    </section>
  );
}

export default Todos;
