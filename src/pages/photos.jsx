import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'; 


export default function Photos(props) {

   
    const [photos, setPhotos] = useState([]);
    const [todosFilter, setTodosFilter] = useState([]);
    const [render,setRender] = useState(0);
    const [renderFilter,setRenderFilter] = useState(0);
    const [json, setJson] = useState([]);
    let {albumId} = useParams();
    
  
   
    useEffect(() => {
        const fetchPhotos = async () => {
        const response = await fetch(`http://localhost:3005/photos?albumId=${albumId}`);
        const json = await response.json();
        setPhotos(json);
        setJson(json)
      };
      fetchPhotos();
    },[render]);
  
  return (
    <section>
         <div className=' butLinkToHome'>
           <Link to='/User/Home'>Home</Link>
        </div>
            <div className=' butLinkToHome'>
            <Link to='/User/Home/Albums'>Albums</Link>
            </div>
              <h1> photos</h1>
        <div>
        {photos.map((photo) => (
          <div className='PresentationOfInformation' key={photo.id}>
            <ul>
                <li>{photo.title}</li>
                <li><img src= {photo.thumbnailUrl} alt="Girl in a jacket" ></img></li>
            </ul>
            </div>
        ))}
      </div>
    </section>
  )
}
