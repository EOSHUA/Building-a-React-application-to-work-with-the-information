
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import Buttons from './buttons';
import Sorting from './sorting';


function Todos() {

  // const {id}=useParams()
  
  const { currentUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [todosFilter, setTodosFilter] = useState([]);
  const [render,setRender] = useState(0);
  const [renderFilter,setRenderFilter] = useState(0);
  const [json, setJson] = useState([]);
  

 
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`http://localhost:3005/todos?userId=${currentUser[1]}`);
      const json = await response.json();
      setTodos(json);
      setJson(json)
    };
    fetchTodos();
  },[render]);


useEffect(()=>{
  setTodos(todosFilter);

},[renderFilter])



  function add() {
    let content=prompt();
    if (content==null) {return}
    fetch("http://localhost:3005/Todos", {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser[1],
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


  function TaskExecutionUpdate(onwTodo){
    const changeCompleted = !onwTodo.completed
    const saveTitle = onwTodo.title
    fetch(`http://localhost:3005/Todos/${onwTodo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        userId: 1,
        title : saveTitle,
        completed:changeCompleted
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <section>
      <h1>This is the Todos component</h1>
      <div className=' butLinkToHome'>
      <Link to='/User/Home'>Home</Link>
      </div>
      <br/>
      <Sorting todos={json} UpdateInformation ={setTodos}  setTodosFilter={setTodosFilter} setRenderFilter={setRenderFilter} renderFilter={renderFilter} />
      <br/>
      <button onClick={() => {
          add();
          setRender(1);
        }}
      >
        add
      </button>
        <div>
         </div>
         <br/>
      <div>
        {todos.map((todo) => (
          <div className='PresentationOfInformation' key={todo.id}>
            
            <ul>
                <li>{todo.title}</li>
                <li>{todo.completed.toString()}</li>
                  <div className='checkbox'>
                      <input onChange={()=>{TaskExecutionUpdate(todo);setRender(prevRender => prevRender + 1)}} type="checkbox"  />
                  </div>
                <Buttons userId={currentUser[1]} id={todo.id} rend={setRender} r={render} />
            </ul>
            </div>
        ))}
      </div>

    </section>
  );
        }

export default Todos;
