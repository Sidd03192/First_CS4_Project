import './App.css';
import { Auth } from './pages/Auth';
import {useState, useRef} from 'react'
import Cookies from "universal-cookie";
import { Chat } from './pages/chat';


const cookies= new Cookies();
function App() {


  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom]= useState(""); // to manage what room

const roomInputRef=useRef(null); // for room enter key
  if ( !isAuth)
    return (
      // how do we know if user is authenticated
      <div className="App"> 
      <h1> Hello </h1>     
      <Auth setIsAuth={setIsAuth}/> 
      {/* how to use props*/}      
      </div>
    );
// return room, or if its not in a room, then return the enter room
    return(
     <div > 
     {room? 
      <Chat room={room}></Chat>
    : 
    <div className= "room">
      <label> Enter Room Name: </label>
      <input placeholder='Room Name' ref={roomInputRef} /> 
      {/* cant put on change, since then room will be loaded when they dont finish even typing
      so we need to use useRef */}
      <button 
      onClick ={()=>setRoom(roomInputRef.current.value)}
       onKeyPress={()=> setRoom(roomInputRef.current.value)}> Enter chat </button>
    </div>
       
    }</div>
    );
}


export default App;
