import './App.css';
import { useState , useEffect ,useContext,createContext } from "react";
import ReactDOM from "react-dom/client";
import Login from './pages/Login';
import Albums from './pages/Albums';
import Todos from './pages/Todos';
import Home from './pages/Home';
import Error from './pages/Error';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Posts from './pages/Posts';


export const UserContext = createContext({
  currentUser: [],
  setCurrentUser: () => [],
});

function App() {

  const [currentUser, setCurrentUser] = useState([]);

  return (
   
  <BrowserRouter>
 <UserContext.Provider value={{ currentUser, setCurrentUser }}>
  <nav>
    <h1>{currentUser[0]}</h1>
  </nav>

  <Routes>
        <Route path='/' element ={<Login/> }></Route>
        <Route  path='User/Home' element ={<Home />} >  </Route>
        <Route path='User/Home/Todos' element ={<Todos />}>  </Route>
        <Route path='User/Home/Albums' element ={<Albums/>}>   </Route>
        <Route path='User/Home/Posts' element={<Posts />}>  </Route>
        <Route path='*' element={<Error />}>  </Route>
       
  </Routes>
  <footer>our footer</footer>
  </UserContext.Provider>
    </BrowserRouter>
   

  );
}


export default App;