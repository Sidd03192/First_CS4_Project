import { useEffect,useState } from 'react';
import './App.css';
import { Auth } from './components/auth'; 
import {db} from "./(config)/firebase"
import {getDocs,collection} from "firebase/firestore";

function App() {

  const[movieList,setMovieList]=useState([]);
  const moviesCollectionRef= collection(db,"movies");// to put in getDocs
  useEffect(()=>{
    const getMoviesList= async()=>{ // displays movies 
      // READ the data  | must have function instead of just useEffect cuz u can make function asynchronoous.
      // set movie list state to be equal to data.
      try{
        const data= await getDocs(moviesCollectionRef);
        console.log(data);

      }catch(err){
        console.error(err);
      }
    };
  },[]);
  
  return (
    <div className="App">
      Firebase Course
      <Auth/>
      

    </div>
  );
}

export default App;
