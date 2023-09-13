import { auth ,googleProvider} from "../(config)/firebase"
import { createUserWithEmailAndPassword ,signInWithPopup,signOut} from "firebase/auth"
import {useState} from "react";
export const Auth =()=>{

        const [email,setEmail] =useState("")
        const [password,setPassword]=useState(""); 
    // ? so it doesent error if no current user exists.
        console.log(auth?.currentUser?.email);
        const signIn=async()=>{
            try{
                await createUserWithEmailAndPassword(auth, email,password);
                setEmail("");
            setPassword("");
            }
            catch(err){
                console.log(err);

            }
        };
        const signInWithGoogle = async()=>{
            try{
                await signInWithPopup(auth,googleProvider);
                setEmail("");
            }catch{

            }
        };
        const logout=async()=>{
            try{
                await signOut(auth);
                setEmail("");
            setPassword("");


            }catch(err){
                console.error(err);
            }

        };
    return (
        <div>

        <input placeholder="username" onChange={(e)=>setEmail(e.target.value)}></input>
        <input placeholder="password" type='password' onChange={(e)=>setPassword(e.target.value)}></input>
        <button onClick={signIn}> Sign in </button>
        <button onClick={signInWithGoogle}>
            Sign In with google 
        </button>
        <button onClick ={logout}> Logout </button>
        </div>

    )
}