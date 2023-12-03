
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'; 
import { UserContext } from '../App';
import Buttons from './buttons';
import Sorting from './sorting';



export default function Posts() {
  // const {id}=useParams()
  
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [todosFilter, setTodosFilter] = useState([]);
  const [render,setRender] = useState(0);
  const [renderFilter,setRenderFilter] = useState(0);
  const [json, setJson] = useState([]);
  

 
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:3005/posts?userId=${currentUser[1]}`);
      const json = await response.json();
      setPosts(json);
      setJson(json)
    };
    fetchPosts();
  },[render]);


useEffect(()=>{
  setPosts(todosFilter);

},[renderFilter])

  function add() {
    let content=prompt();
    if (content==null) {return}
    fetch("http://localhost:3005/posts", {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser[1],
        title: content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function SortingTitleVal(){
    <input type="text" />
  
}


function toApDate(){
  let content=prompt();
    if (content==null) {return}
    fetch(`http://localhost:3005/posts/${currentUser[1]}`, {
      method: "PUT",
      body: JSON.stringify({
        userId: 1,
        title: content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function deletePost() {
    fetch( `http://localhost:3005/posts/${currentUser[1]}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }


  return (
    <section>
      <h1>This is the posts component</h1>
      <div className=' butLinkToHome'>
      <Link to='/User/Home'>Home</Link>
      </div>
      <br/>
      <button onClick={SortingTitleVal}>Search by title</button>
      {/* <Sorting todos={json} setPoUpdateInformationsts ={setPosts}  setTodosFilter={setTodosFilter} setRenderFilter={setRenderFilter} renderFilter={renderFilter} /> */}
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
        {posts.map((post) => (
          <div className='PresentationOfInformation' key={post.id}> 
            <ul>
                <li>{post.title}</li>
                <li>{post.body}</li>
                  <button onClick={() => {
                      toApDate ();
                      setRender (render+1);
                      }}>upDate</button>

                      <button onClick={() => {
                        deletePost ();
                        setRender (render+1);
                      }}>delete</button>
                          </ul>
                          </div>
                      ))}
      </div>

    </section>
  );
}
