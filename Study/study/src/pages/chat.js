
import {useEffect, useState} from "react";
import {addDoc,collection,onSnapshot,orderBy,query,serverTimestamp, where}from "firebase/firestore";
import {auth,db} from "../components/firebase";
import {motion } from "framer-motion";
//import "../Chat.css"


export const Chat =(props)=>{
    const{room} =props;
    const[newMessage, setNewMessage]=useState("");
// to keep track of the messages 
    const [messages,setMessages]= useState ([]);
    const messagesRef = collection(db,"messages");
    
    useEffect(()=>{ // displays messages basically.
        const queryMessages = 
        query(messagesRef,where("room","==", room),
        orderBy("createdAt"));

       const unsuscribe= onSnapshot(queryMessages,(snapshot)=>{
            // runs any time there is a change to query.
           let messages=[];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id})
                // sets messages equal to data  ( has firebase data ), we are also gettind id, but id deosent exist in doc.data
            });
            // now we have to update a state to keep track of all messages so we can real time changes
            setMessages(messages);
        })
        return () => unsuscribe; // must do this (clean up useEffect)
    },[])


    
    const handleSubmitForm= async(e)=>{
        e.preventDefault();
        if (newMessage==="")
        { // if new message is blank, dont send it to the database.
            return;
        }
        await addDoc(messagesRef,{
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                room,
                read:false, // shorthand for room= this.room

                // so you can order the messages
                // we need to send message in the right room
            
        });
        setNewMessage("");
        
    }


const handleKeyPress=(e)=>{
    
}


    return (
        <motion.div>
        
            <div className="header">
                <h1> Welcome to {room}</h1>
            </div>
            <div className="messages"> 
                {messages.map((message)=>
                <div key={messages.id}> 
                   
                    <span className="user"> {message.user}
                        </span>
                        {message.text} 
                        *
                </div>)}
            </div>
            <form  onSubmit={handleSubmitForm}className="new-message-form">
                <input onChange ={(e)=>{setNewMessage(e.target.value)}} className = "new-message-input" 
                placeholder=" Type a message" value ={newMessage} /> {/* so we can reset it once it's submitted*/}
                <button  type = "submit" className = "send-button"> Submit </button>
            </form>
        Chat
    </motion.div>

    );
   
}