import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext, createContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Photos from "./photos";


export function UserInfo() {
  // const {id}=useParams()

  const navigate = useNavigate();
  const [albumId, setAlbumId] = useState(0);
  const { currentUser } = useContext(UserContext);
  const [Albums, setAlbums] = useState([]);
  const [todosFilter, setTodosFilter] = useState([]);
  const [render, setRender] = useState(0);
  const [renderFilter, setRenderFilter] = useState(0);
  const [json, setJson] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:3005/albums?userId=${currentUser[1]}`
      );
      const json = await response.json();
      setAlbums(json);
      setJson(json);
    };
    fetchPosts();
  }, [render]);

  useEffect(() => {
    setAlbums(todosFilter);
  }, [renderFilter]);

  function add() {
    let content = prompt();
    if (content == null) {
      return;
    }
    fetch("http://localhost:3005/albums", {
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

  function toApDate() {
    let content = prompt();
    if (content == null) {
      return;
    }
    fetch(`http://localhost:3005/albums/${currentUser[1]}`, {
      method: "PUT",
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

  function deletePost() {
    fetch(`http://localhost:3005/albums/${currentUser[1]}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const goToPhotos = (id) => {
    setAlbumId(id);
    navigate("/User/Home/album/" + id );
  };

  return (
    <section>
      <h1>This is the Albums component</h1>
      <div className=" butLinkToHome">
        <Link to="/User/Home">Home</Link>
      </div>
      <br />

      <br />
      <button
        onClick={() => {
          add();
          setRender(1);
        }}
      >
        add
      </button>
      <br />
      <div>
        {Albums.map((album) => (
          <div className="PresentationOfInformation" key={album.id}>
            <ul>
              <li>{album.id}</li>
              <li>{album.title}</li>

              <button
                onClick={() => {
                  toApDate();
                  setRender(render + 1);
                }}
              >
                upDate
              </button>

              <button
                onClick={() => {
                  deletePost();
                  setRender(render + 1);
                }}
              >
                delete
              </button>

              <br />

              <p className="linkAlbumsToPhotos">To see the pictures click:</p>
              <button
                onClick={() => {
                  goToPhotos(album.id);
                }}
              >
                photos
              </button>
              <br />
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
export default UserInfo;
